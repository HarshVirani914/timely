import { prisma } from "@timely/prisma";
import type { TrpcSessionUser } from "@timely/trpc/server/trpc";

type ListInvitesOptions = {
  ctx: {
    user: NonNullable<TrpcSessionUser>;
  };
};

export const listInvitesHandler = async ({ ctx }: ListInvitesOptions) => {
  const userId = ctx.user.id;
  return await prisma.membership.findMany({
    where: {
      user: {
        id: userId,
      },
      accepted: false,
    },
  });
};

export default listInvitesHandler;
