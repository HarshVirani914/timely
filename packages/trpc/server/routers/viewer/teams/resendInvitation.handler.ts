import { sendTeamInviteEmail } from "@timely/emails";
import { WEBAPP_URL } from "@timely/lib/constants";
import { getTranslation } from "@timely/lib/server/i18n";
import { prisma } from "@timely/prisma";
import type { TrpcSessionUser } from "@timely/trpc/server/trpc";

import { checkPermissions, getTeamOrThrow } from "./inviteMember/utils";
import type { TResendInvitationInputSchema } from "./resendInvitation.schema";

type InviteMemberOptions = {
  ctx: {
    user: NonNullable<TrpcSessionUser>;
  };
  input: TResendInvitationInputSchema;
};

export const resendInvitationHandler = async ({ ctx, input }: InviteMemberOptions) => {
  const team = await getTeamOrThrow(input.teamId, input.isOrg);

  await checkPermissions({
    userId: ctx.user.id,
    teamId:
      ctx.user.organization.id && ctx.user.organization.isOrgAdmin ? ctx.user.organization.id : input.teamId,
    isOrg: input.isOrg,
  });

  const verificationToken = await prisma.verificationToken.findFirst({
    where: {
      identifier: input.email,
      teamId: input.teamId,
    },
    select: {
      token: true,
    },
  });

  const inviteTeamOptions = {
    joinLink: `${WEBAPP_URL}/auth/login?callbackUrl=/settings/teams`,
    isTimelyMember: true,
  };

  if (verificationToken) {
    // Token only exists if user is CAL user but hasn't completed onboarding.
    inviteTeamOptions.joinLink = `${WEBAPP_URL}/signup?token=${verificationToken.token}&callbackUrl=/getting-started`;
    inviteTeamOptions.isTimelyMember = false;
  }

  const translation = await getTranslation(input.language ?? "en", "common");

  await sendTeamInviteEmail({
    language: translation,
    from: ctx.user.name || `${team.name}'s admin`,
    to: input.email,
    teamName: team?.parent?.name || team.name,
    ...inviteTeamOptions,
    isOrg: input.isOrg,
  });

  return input;
};

export default resendInvitationHandler;
