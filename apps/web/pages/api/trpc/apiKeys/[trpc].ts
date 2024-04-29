import { createNextApiHandler } from "@timely/trpc/server/createNextApiHandler";
import { apiKeysRouter } from "@timely/trpc/server/routers/viewer/apiKeys/_router";

export default createNextApiHandler(apiKeysRouter);
