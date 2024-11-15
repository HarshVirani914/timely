import { WEBAPP_URL } from "@timely/lib/constants";
import { defaultHandler, defaultResponder } from "@timely/lib/server";
import prisma from "@timely/prisma";
import type { NextApiRequest } from "next";
import { stringify } from "querystring";

import config from "../config.json";
import { getWebexAppKeys } from "../lib/getWebexAppKeys";

async function handler(req: NextApiRequest) {
  // Get user
  await prisma.user.findFirstOrThrow({
    where: {
      id: req.session?.user?.id,
    },
    select: {
      id: true,
    },
  });

  const { client_id } = await getWebexAppKeys();

  /** @link https://developer.webex.com/docs/integrations#requesting-permission */
  const params = {
    response_type: "code",
    client_id,
    redirect_uri: `${WEBAPP_URL}/api/integrations/${config.slug}/callback`,
    scope: "spark:kms meeting:schedules_read meeting:schedules_write", //should be "A space-separated list of scopes being requested by your integration"
    state: "",
  };
  const query = stringify(params).replaceAll("+", "%20");
  const url = `https://webexapis.com/v1/authorize?${query}`;
  return { url };
}

export default defaultHandler({
  GET: Promise.resolve({ default: defaultResponder(handler) }),
});
