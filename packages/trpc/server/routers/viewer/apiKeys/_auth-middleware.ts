import type { Prisma } from "@prisma/client";
import prisma from "@timely/prisma";

import { TRPCError } from "@trpc/server";

export async function checkPermissions(args: {
  userId: number;
  teamId?: number;
  role: Prisma.MembershipWhereInput["role"];
}) {
  const { teamId, userId, role } = args;
  if (!teamId) return;
  const team = await prisma.team.findFirst({
    where: {
      id: teamId,
      members: {
        some: {
          userId,
          role,
        },
      },
    },
  });
  if (!team) throw new TRPCError({ code: "UNAUTHORIZED" });
}
