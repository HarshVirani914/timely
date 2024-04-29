import { collectApiHandler } from "next-collect/server";

import { extendEventData, nextCollectBasicSettings } from "@timely/lib/telemetry";

export default collectApiHandler({
  ...nextCollectBasicSettings,
  cookieName: "__clnds",
  extend: extendEventData,
});
