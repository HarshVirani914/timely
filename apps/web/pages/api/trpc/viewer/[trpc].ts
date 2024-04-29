import { createNextApiHandler } from "@timely/trpc/server/createNextApiHandler";
import { loggedInViewerRouter } from "@timely/trpc/server/routers/loggedInViewer/_router";

export default createNextApiHandler(loggedInViewerRouter);
