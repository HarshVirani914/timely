import { prisma } from "@timely/prisma";
import type { TrpcSessionUser } from "@timely/trpc/server/trpc";

import type { TGetVerifiedNumbersInputSchema } from "./getVerifiedNumbers.schema";

type GetVerifiedNumbersOptions = {
  ctx: {
    user: NonNullable<TrpcSessionUser>;
  };
  input: TGetVerifiedNumbersInputSchema;
};

export const getVerifiedNumbersHandler = async ({ ctx, input }: GetVerifiedNumbersOptions) => {
  const { user } = ctx;
  const verifiedNumbers = await prisma.verifiedNumber.findMany({
    where: {
      OR: [{ userId: user.id }, { teamId: input.teamId }],
    },
  });

  return verifiedNumbers;
};
