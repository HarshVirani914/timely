import appRoutingForms from "@timely/app-store/routing-forms/trpc-router";
import { createNextApiHandler } from "@timely/trpc/server/createNextApiHandler";

export default createNextApiHandler(appRoutingForms);
