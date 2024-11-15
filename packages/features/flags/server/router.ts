import publicProcedure from "@timely/trpc/server/procedures/publicProcedure";
import { router } from "@timely/trpc/server/trpc";

import { getFeatureFlagMap } from "./utils";

export const featureFlagRouter = router({
  list: publicProcedure.query(async ({ ctx }) => {
    const { prisma } = ctx;
    return prisma.feature.findMany({
      orderBy: { slug: "asc" },
      cacheStrategy: { swr: 300, ttl: 300 },
    });
  }),
  map: publicProcedure.query(async ({ ctx }) => {
    const { prisma } = ctx;
    return getFeatureFlagMap(prisma);
  }),
});
