import { defaultHandler } from "@timely/lib/server";

import { withMiddleware } from "~/lib/helpers/withMiddleware";

export default withMiddleware()(
  defaultHandler({
    GET: import("./_get"),
    PATCH: import("./_patch"),
    DELETE: import("./_delete"),
  })
);
