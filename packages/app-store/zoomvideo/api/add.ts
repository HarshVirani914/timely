import { WEBAPP_URL } from "@timely/lib/constants";
import { defaultHandler, defaultResponder } from "@timely/lib/server";
import prisma from "@timely/prisma";
import type { NextApiRequest } from "next";
import { stringify } from "querystring";

import { encodeOAuthState } from "../../_utils/oauth/encodeOAuthState";
import { getZoomAppKeys } from "../lib";

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

  const { client_id } = await getZoomAppKeys();
  const state = encodeOAuthState(req);

  const params = {
    response_type: "code",
    client_id,
    redirect_uri: `${WEBAPP_URL}/api/integrations/zoomvideo/callback`,
    state,
  };
  const query = stringify(params);
  const url = `https://zoom.us/oauth/authorize?${query}`;
  return { url };
}

export default defaultHandler({
  GET: Promise.resolve({ default: defaultResponder(handler) }),
});
