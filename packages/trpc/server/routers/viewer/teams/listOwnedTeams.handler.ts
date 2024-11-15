import { prisma } from "@timely/prisma";
import { MembershipRole } from "@timely/prisma/enums";
import { teamMetadataSchema } from "@timely/prisma/zod-utils";

import type { TrpcSessionUser } from "../../../trpc";

type ListOptions = {
  ctx: {
    user: NonNullable<TrpcSessionUser>;
  };
};

export const listOwnedTeamsHandler = async ({ ctx }: ListOptions) => {
  const user = await prisma.user.findFirst({
    where: {
      id: ctx.user.id,
    },
    select: {
      id: true,
      teams: {
        where: {
          accepted: true,
          role: {
            in: [MembershipRole.OWNER, MembershipRole.ADMIN],
          },
        },
        select: {
          team: true,
        },
      },
    },
  });

  return user?.teams
    ?.filter((m) => {
      const metadata = teamMetadataSchema.parse(m.team.metadata);
      return !metadata?.isOrganization;
    })
    ?.map(({ team }) => team);
};
