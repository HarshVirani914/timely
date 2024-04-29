import { addSubscription } from "@timely/features/webhooks/lib/scheduleTrigger";
import { defaultHandler, defaultResponder } from "@timely/lib/server";
import type { NextApiRequest, NextApiResponse } from "next";

import { validateAccountOrApiKey } from "../../lib/validateAccountOrApiKey";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { subscriberUrl, triggerEvent } = req.body;
  const { account, appApiKey } = await validateAccountOrApiKey(req, ["READ_BOOKING", "READ_PROFILE"]);
  const createAppSubscription = await addSubscription({
    appApiKey,
    account,
    triggerEvent: triggerEvent,
    subscriberUrl: subscriberUrl,
    appId: "zapier",
  });

  if (!createAppSubscription) {
    return res.status(500).json({ message: "Could not create subscription." });
  }

  res.status(200).json(createAppSubscription);
}

export default defaultHandler({
  POST: Promise.resolve({ default: defaultResponder(handler) }),
});
