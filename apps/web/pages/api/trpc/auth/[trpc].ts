import { createNextApiHandler } from "@timely/trpc/server/createNextApiHandler";
import { authRouter } from "@timely/trpc/server/routers/viewer/auth/_router";

export default createNextApiHandler(authRouter);
