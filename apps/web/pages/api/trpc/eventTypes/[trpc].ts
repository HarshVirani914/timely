import { createNextApiHandler } from "@timely/trpc/server/createNextApiHandler";
import { eventTypesRouter } from "@timely/trpc/server/routers/viewer/eventTypes/_router";

export default createNextApiHandler(eventTypesRouter);
