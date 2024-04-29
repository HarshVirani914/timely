import { createNextApiHandler } from "@timely/trpc/server/createNextApiHandler";
import { deploymentSetupRouter } from "@timely/trpc/server/routers/viewer/deploymentSetup/_router";

export default createNextApiHandler(deploymentSetupRouter);
