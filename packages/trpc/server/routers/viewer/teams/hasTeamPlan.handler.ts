import { prisma } from "@timely/prisma";
import type { TrpcSessionUser } from "@timely/trpc/server/trpc";

type HasTeamPlanOptions = {
  ctx: {
    user: NonNullable<TrpcSessionUser>;
  };
};

export const hasTeamPlanHandler = async ({ ctx }: HasTeamPlanOptions) => {
  const userId = ctx.user.id;

  const hasTeamPlan = await prisma.membership.findFirst({
    where: {
      accepted: true,
      userId,
      team: {
        slug: {
          not: null,
        },
      },
    },
  });
  return { hasTeamPlan: !!hasTeamPlan };
};

export default hasTeamPlanHandler;
