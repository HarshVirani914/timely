import { cancelTeamSubscriptionFromStripe } from "@timely/features/ee/teams/lib/payments";
import { IS_TEAM_BILLING_ENABLED } from "@timely/lib/constants";
import { deleteDomain } from "@timely/lib/domainManager/organization";
import { isTeamOwner } from "@timely/lib/server/queries/teams";
import { closeComDeleteTeam } from "@timely/lib/sync/SyncServiceManager";
import { prisma } from "@timely/prisma";
import { teamMetadataSchema } from "@timely/prisma/zod-utils";

import { TRPCError } from "@trpc/server";

import type { TrpcSessionUser } from "../../../trpc";
import type { TDeleteInputSchema } from "./delete.schema";

type DeleteOptions = {
  ctx: {
    user: NonNullable<TrpcSessionUser>;
  };
  input: TDeleteInputSchema;
};

export const deleteHandler = async ({ ctx, input }: DeleteOptions) => {
  if (!(await isTeamOwner(ctx.user?.id, input.teamId))) throw new TRPCError({ code: "UNAUTHORIZED" });

  if (IS_TEAM_BILLING_ENABLED) await cancelTeamSubscriptionFromStripe(input.teamId);

  // delete all memberships
  await prisma.membership.deleteMany({
    where: {
      teamId: input.teamId,
    },
  });

  const deletedTeam = await prisma.team.delete({
    where: {
      id: input.teamId,
    },
  });

  const deletedTeamMetadata = teamMetadataSchema.parse(deletedTeam.metadata);

  if (deletedTeamMetadata?.isOrganization && deletedTeam.slug) deleteDomain(deletedTeam.slug);

  // Sync Services: Close.cm
  closeComDeleteTeam(deletedTeam);
};

export default deleteHandler;
