import { createNextApiHandler } from "@timely/trpc/server/createNextApiHandler";
import { publicViewerRouter } from "@timely/trpc/server/routers/publicViewer/_router";

export default createNextApiHandler(publicViewerRouter, true);
