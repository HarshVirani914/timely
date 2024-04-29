import { createNextApiHandler } from "@timely/trpc/server/createNextApiHandler";
import { viewerTeamsRouter } from "@timely/trpc/server/routers/viewer/teams/_router";

export default createNextApiHandler(viewerTeamsRouter);
