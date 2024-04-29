import { createNextApiHandler } from "@timely/trpc/server/createNextApiHandler";
import { appsRouter } from "@timely/trpc/server/routers/viewer/apps/_router";

export default createNextApiHandler(appsRouter);
