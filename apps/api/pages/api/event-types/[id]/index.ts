import { defaultHandler, defaultResponder } from "@timely/lib/server";
import type { NextApiRequest, NextApiResponse } from "next";

import { withMiddleware } from "~/lib/helpers/withMiddleware";

import authMiddleware from "./_auth-middleware";

export default withMiddleware()(
  defaultResponder(async (req: NextApiRequest, res: NextApiResponse) => {
    await authMiddleware(req);
    return defaultHandler({
      GET: import("./_get"),
      PATCH: import("./_patch"),
      DELETE: import("./_delete"),
    })(req, res);
  })
);
