import { checkRateLimitAndThrowError } from "@timely/lib/checkRateLimitAndThrowError";
import { prisma } from "@timely/prisma";

import type { TrpcSessionUser } from "../../../trpc";

type ListOptions = {
  ctx: {
    user: NonNullable<TrpcSessionUser>;
  };
};

export const listHandler = async ({ ctx }: ListOptions) => {
  await checkRateLimitAndThrowError({
    identifier: `eventTypes:list:${ctx.user.id}`,
    rateLimitingType: "common",
  });
  return await prisma.eventType.findMany({
    where: {
      userId: ctx.user.id,
      team: null,
    },
    select: {
      id: true,
      title: true,
      description: true,
      length: true,
      schedulingType: true,
      slug: true,
      hidden: true,
      metadata: true,
    },
  });
};
