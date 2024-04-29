import { prisma } from "@timely/prisma";
import type { Team, User } from "@timely/prisma/client";
import { MembershipRole } from "@timely/prisma/enums";
import type { teamMetadataSchema } from "@timely/prisma/zod-utils";
import type z from "zod";

export const createOrUpdateMemberships = async ({
  teamMetadata,
  user,
  team,
}: {
  user: Pick<User, "id">;
  team: Pick<Team, "id" | "parentId">;
  teamMetadata: z.infer<typeof teamMetadataSchema>;
}) => {
  return await prisma.$transaction(async (tx) => {
    if (teamMetadata?.isOrganization) {
      await tx.user.update({
        where: {
          id: user.id,
        },
        data: {
          organizationId: team.id,
        },
      });
    }
    const membership = await tx.membership.upsert({
      where: {
        userId_teamId: { userId: user.id, teamId: team.id },
      },
      update: {
        accepted: true,
      },
      create: {
        userId: user.id,
        teamId: team.id,
        role: MembershipRole.MEMBER,
        accepted: true,
      },
    });
    const orgMembership = null;
    if (team.parentId) {
      await tx.membership.upsert({
        where: {
          userId_teamId: { userId: user.id, teamId: team.parentId },
        },
        update: {
          accepted: true,
        },
        create: {
          userId: user.id,
          teamId: team.parentId,
          role: MembershipRole.MEMBER,
          accepted: true,
        },
      });
    }
    return { membership, orgMembership };
  });
};
