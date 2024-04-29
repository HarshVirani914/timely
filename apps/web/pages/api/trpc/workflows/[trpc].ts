import { createNextApiHandler } from "@timely/trpc/server/createNextApiHandler";
import { workflowsRouter } from "@timely/trpc/server/routers/viewer/workflows/_router";

export default createNextApiHandler(workflowsRouter);
