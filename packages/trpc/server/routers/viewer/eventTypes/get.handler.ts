import getEventTypeById from "@timely/lib/getEventTypeById";
import type { PrismaClient } from "@timely/prisma";

import type { TrpcSessionUser } from "../../../trpc";
import type { TGetInputSchema } from "./get.schema";

type GetOptions = {
  ctx: {
    user: NonNullable<TrpcSessionUser>;
    prisma: PrismaClient;
  };
  input: TGetInputSchema;
};

export const getHandler = ({ ctx, input }: GetOptions) => {
  return getEventTypeById({
    eventTypeId: input.id,
    userId: ctx.user.id,
    prisma: ctx.prisma,
    isTrpcCall: true,
    isUserOrganizationAdmin: !!ctx.user?.organization?.isOrgAdmin,
  });
};
