import { generateTeamCheckoutSession } from "@timely/features/ee/teams/lib/payments";
import { IS_TEAM_BILLING_ENABLED, WEBAPP_URL } from "@timely/lib/constants";
import { closeComUpsertTeamUser } from "@timely/lib/sync/SyncServiceManager";
import { prisma } from "@timely/prisma";
import { MembershipRole } from "@timely/prisma/enums";

import { TRPCError } from "@trpc/server";

import type { TrpcSessionUser } from "../../../trpc";
import type { TCreateInputSchema } from "./create.schema";

type CreateOptions = {
  ctx: {
    user: NonNullable<TrpcSessionUser>;
  };
  input: TCreateInputSchema;
};

const generateCheckoutSession = async ({
  teamSlug,
  teamName,
  userId,
}: {
  teamSlug: string;
  teamName: string;
  userId: number;
}) => {
  if (!IS_TEAM_BILLING_ENABLED) {
    console.info("Team billing is disabled, not generating a checkout session.");
    return;
  }

  const checkoutSession = await generateTeamCheckoutSession({
    teamSlug,
    teamName,
    userId,
  });

  if (!checkoutSession.url)
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed retrieving a checkout session URL.",
    });
  return { url: checkoutSession.url, message: "Payment required to publish team" };
};

export const createHandler = async ({ ctx, input }: CreateOptions) => {
  const { user } = ctx;
  const { slug, name, logo } = input;
  const isOrgChildTeam = !!user.organizationId;

  // For orgs we want to create teams under the org
  if (user.organizationId && !user.organization.isOrgAdmin) {
    throw new TRPCError({ code: "FORBIDDEN", message: "org_admins_can_create_new_teams" });
  }

  const slugCollisions = await prisma.team.findFirst({
    where: {
      slug: slug,
      // If this is under an org, check that the team doesn't already exist
      parentId: isOrgChildTeam ? user.organizationId : null,
    },
  });

  if (slugCollisions) throw new TRPCError({ code: "BAD_REQUEST", message: "team_url_taken" });

  if (user.organizationId) {
    const nameCollisions = await prisma.user.findFirst({
      where: {
        organizationId: user.organization.id,
        username: slug,
      },
    });

    if (nameCollisions) throw new TRPCError({ code: "BAD_REQUEST", message: "team_slug_exists_as_user" });
  }

  // If the user is not a part of an org, then make them pay before creating the team
  if (!isOrgChildTeam) {
    const checkoutSession = await generateCheckoutSession({
      teamSlug: slug,
      teamName: name,
      userId: user.id,
    });

    // If there is a checkout session, return it. Otherwise, it means it's disabled.
    if (checkoutSession)
      return {
        url: checkoutSession.url,
        message: checkoutSession.message,
        team: null,
      };
  }

  const createdTeam = await prisma.team.create({
    data: {
      slug,
      name,
      logo,
      members: {
        create: {
          userId: ctx.user.id,
          role: MembershipRole.OWNER,
          accepted: true,
        },
      },
      ...(isOrgChildTeam && { parentId: user.organizationId }),
    },
  });

  // Sync Services: Close.com
  closeComUpsertTeamUser(createdTeam, ctx.user, MembershipRole.OWNER);

  return {
    url: `${WEBAPP_URL}/settings/teams/${createdTeam.id}/onboard-members`,
    message: "Team billing is disabled, not generating a checkout session.",
    team: createdTeam,
  };
};

export default createHandler;
