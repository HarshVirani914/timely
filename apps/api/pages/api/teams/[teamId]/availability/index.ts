import { defaultHandler } from "@timely/lib/server";

import { withMiddleware } from "~/lib/helpers/withMiddleware";

export default withMiddleware()(
  defaultHandler({
    GET: import("~/pages/api/availability/_get"),
  })
);
