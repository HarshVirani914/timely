import { prisma } from "@timely/prisma";
import type { TrpcSessionUser } from "@timely/trpc/server/trpc";

import type { TAwayInputSchema } from "./away.schema";

type AwayOptions = {
  ctx: {
    user: NonNullable<TrpcSessionUser>;
  };
  input: TAwayInputSchema;
};

export const awayHandler = async ({ ctx, input }: AwayOptions) => {
  await prisma.user.update({
    where: {
      email: ctx.user.email,
    },
    data: {
      away: input.away,
    },
  });
};
