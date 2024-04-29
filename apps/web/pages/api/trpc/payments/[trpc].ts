import { createNextApiHandler } from "@timely/trpc/server/createNextApiHandler";
import { paymentsRouter } from "@timely/trpc/server/routers/viewer/payments/_router";

export default createNextApiHandler(paymentsRouter);
