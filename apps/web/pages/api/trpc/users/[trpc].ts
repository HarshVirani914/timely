import { userAdminRouter } from "@timely/features/ee/users/server/trpc-router";
import { createNextApiHandler } from "@timely/trpc/server/createNextApiHandler";

export default createNextApiHandler(userAdminRouter);
