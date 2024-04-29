import prisma from "@timely/prisma";
import type { TrpcSessionUser } from "@timely/trpc/server/trpc";

type AvatarOptions = {
  ctx: {
    user: NonNullable<TrpcSessionUser>;
  };
};

export const avatarHandler = async ({ ctx }: AvatarOptions) => {
  const data = await prisma.user.findUnique({
    where: {
      id: ctx.user.id,
    },
    select: {
      avatar: true,
    },
  });
  return {
    avatar: data?.avatar,
  };
};
