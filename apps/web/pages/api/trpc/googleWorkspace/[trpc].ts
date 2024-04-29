import { createNextApiHandler } from "@timely/trpc/server/createNextApiHandler";
import { googleWorkspaceRouter } from "@timely/trpc/server/routers/viewer/googleWorkspace/_router";

export default createNextApiHandler(googleWorkspaceRouter);
