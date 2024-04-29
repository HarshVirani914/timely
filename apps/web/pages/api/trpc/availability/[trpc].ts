import { createNextApiHandler } from "@timely/trpc/server/createNextApiHandler";
import { availabilityRouter } from "@timely/trpc/server/routers/viewer/availability/_router";

export default createNextApiHandler(availabilityRouter);
