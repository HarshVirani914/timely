import { createNextApiHandler } from "@timely/trpc/server/createNextApiHandler";
import { viewerOrganizationsRouter } from "@timely/trpc/server/routers/viewer/organizations/_router";

export default createNextApiHandler(viewerOrganizationsRouter);
