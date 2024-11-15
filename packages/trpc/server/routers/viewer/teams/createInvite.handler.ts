import { WEBAPP_URL } from "@timely/lib/constants";
import { isTeamAdmin } from "@timely/lib/server/queries/teams";
import { prisma } from "@timely/prisma";
import { teamMetadataSchema } from "@timely/prisma/zod-utils";
import { TRPCError } from "@timely/trpc/server";
import type { TrpcSessionUser } from "@timely/trpc/server/trpc";
import { randomBytes } from "crypto";

import type { TCreateInviteInputSchema } from "./createInvite.schema";

type CreateInviteOptions = {
  ctx: {
    user: NonNullable<TrpcSessionUser>;
  };
  input: TCreateInviteInputSchema;
};

export const createInviteHandler = async ({ ctx, input }: CreateInviteOptions) => {
  const { teamId } = input;
  const membership = await isTeamAdmin(ctx.user.id, teamId);

  if (!membership || !membership?.team) throw new TRPCError({ code: "UNAUTHORIZED" });
  const teamMetadata = teamMetadataSchema.parse(membership.team.metadata);
  const isOrganizationOrATeamInOrganization = !!(membership.team?.parentId || teamMetadata?.isOrganization);

  if (input.token) {
    const existingToken = await prisma.verificationToken.findFirst({
      where: { token: input.token, identifier: `invite-link-for-teamId-${teamId}`, teamId },
    });
    if (!existingToken) throw new TRPCError({ code: "NOT_FOUND" });
    return {
      token: existingToken.token,
      inviteLink: await getInviteLink(existingToken.token, isOrganizationOrATeamInOrganization),
    };
  }

  const token = randomBytes(32).toString("hex");
  await prisma.verificationToken.create({
    data: {
      identifier: `invite-link-for-teamId-${teamId}`,
      token,
      expires: new Date(new Date().setHours(168)), // +1 week,
      teamId,
    },
  });

  return { token, inviteLink: await getInviteLink(token, isOrganizationOrATeamInOrganization) };
};

async function getInviteLink(token = "", isOrgContext = false) {
  const teamInviteLink = `${WEBAPP_URL}/teams?token=${token}`;
  const orgInviteLink = `${WEBAPP_URL}/signup?token=${token}&callbackUrl=/getting-started`;
  if (isOrgContext) return orgInviteLink;
  return teamInviteLink;
}

export default createInviteHandler;
