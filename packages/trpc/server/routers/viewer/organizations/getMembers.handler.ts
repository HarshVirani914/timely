import { prisma } from "@timely/prisma";

import type { TrpcSessionUser } from "../../../trpc";
import type { TGetMembersInputSchema } from "./getMembers.schema";

type CreateOptions = {
  ctx: {
    user: NonNullable<TrpcSessionUser>;
  };
  input: TGetMembersInputSchema;
};

export const getMembersHandler = async ({ input, ctx }: CreateOptions) => {
  const { teamIdToExclude, accepted, distinctUser } = input;

  if (!ctx.user.organizationId) return [];

  const teamQuery = await prisma.team.findUnique({
    where: {
      id: ctx.user.organizationId,
    },
    select: {
      members: {
        where: {
          teamId: {
            not: teamIdToExclude,
          },
          accepted,
        },
        select: {
          accepted: true,
          disableImpersonation: true,
          id: true,
          teamId: true,
          role: true,
          userId: true,
          user: {
            select: {
              id: true,
              username: true,
              email: true,
              completedOnboarding: true,
              name: true,
            },
          },
        },
        ...(distinctUser && {
          distinct: ["userId"],
        }),
      },
    },
  });

  if (teamIdToExclude && teamQuery?.members) {
    const excludedteamUsers = await prisma.team.findUnique({
      where: {
        id: teamIdToExclude,
      },
      select: {
        members: {
          select: {
            userId: true,
          },
        },
      },
    });
    const excludedUserIds = excludedteamUsers?.members.map((item) => item.userId) ?? [];
    teamQuery.members = teamQuery?.members.filter((member) => !excludedUserIds.includes(member.userId));
  }

  return teamQuery?.members || [];
};

export default getMembersHandler;
