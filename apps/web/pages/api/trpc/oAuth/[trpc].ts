import { createNextApiHandler } from "@timely/trpc/server/createNextApiHandler";
import { oAuthRouter } from "@timely/trpc/server/routers/viewer/oAuth/_router";

export default createNextApiHandler(oAuthRouter);
