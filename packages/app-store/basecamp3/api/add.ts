import { WEBAPP_URL } from "@timely/lib/constants";
import { defaultHandler, defaultResponder } from "@timely/lib/server";
import prisma from "@timely/prisma";
import type { NextApiRequest } from "next";
import { stringify } from "querystring";

import { getBasecampKeys } from "../lib/getBasecampKeys";

async function handler(req: NextApiRequest) {
  await prisma.user.findFirstOrThrow({
    where: {
      id: req.session?.user?.id,
    },
    select: {
      id: true,
    },
  });

  const { client_id } = await getBasecampKeys();

  const params = {
    type: "web_server",
    client_id,
  };
  const query = stringify(params);
  const url = `https://launchpad.37signals.com/authorization/new?${query}&redirect_uri=${WEBAPP_URL}/api/integrations/basecamp3/callback`;
  return { url };
}

export default defaultHandler({
  GET: Promise.resolve({ default: defaultResponder(handler) }),
});
