import { createNextApiHandler } from "@timely/trpc/server/createNextApiHandler";
import { ssoRouter } from "@timely/trpc/server/routers/viewer/sso/_router";

export default createNextApiHandler(ssoRouter);
