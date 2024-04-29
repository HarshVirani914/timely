import { insightsRouter } from "@timely/features/insights/server/trpc-router";
import { createNextApiHandler } from "@timely/trpc/server/createNextApiHandler";

export default createNextApiHandler(insightsRouter);
