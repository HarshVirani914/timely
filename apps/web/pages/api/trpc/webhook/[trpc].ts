import { createNextApiHandler } from "@timely/trpc/server/createNextApiHandler";
import { webhookRouter } from "@timely/trpc/server/routers/viewer/webhook/_router";

export default createNextApiHandler(webhookRouter);
