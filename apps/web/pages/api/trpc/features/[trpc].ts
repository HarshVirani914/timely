import { featureFlagRouter } from "@timely/features/flags/server/router";
import { createNextApiHandler } from "@timely/trpc/server/createNextApiHandler";

export default createNextApiHandler(featureFlagRouter, true, "features");
