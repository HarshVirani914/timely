import { createNextApiHandler } from "@timely/trpc/server/createNextApiHandler";
import { adminRouter } from "@timely/trpc/server/routers/viewer/admin/_router";

export default createNextApiHandler(adminRouter);
