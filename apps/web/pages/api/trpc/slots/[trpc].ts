import { createNextApiHandler } from "@timely/trpc/server/createNextApiHandler";
import { slotsRouter } from "@timely/trpc/server/routers/viewer/slots/_router";

export default createNextApiHandler(slotsRouter);
