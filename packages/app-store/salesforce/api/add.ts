import { WEBAPP_URL } from "@timely/lib/constants";
import jsforce from "jsforce";
import type { NextApiRequest, NextApiResponse } from "next";

import getAppKeysFromSlug from "../../_utils/getAppKeysFromSlug";
import { encodeOAuthState } from "../../_utils/oauth/encodeOAuthState";

let consumer_key = "";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") return res.status(405).json({ message: "Method not allowed" });

  const appKeys = await getAppKeysFromSlug("salesforce");
  if (typeof appKeys.consumer_key === "string") consumer_key = appKeys.consumer_key;
  if (!consumer_key) return res.status(400).json({ message: "Salesforce client id missing." });

  const salesforceClient = new jsforce.Connection({
    clientId: consumer_key,
    redirectUri: `${WEBAPP_URL}/api/integrations/salesforce/callback`,
  });

  const url = salesforceClient.oauth2.getAuthorizationUrl({
    scope: "refresh_token full",
    state: encodeOAuthState(req),
  });
  res.status(200).json({ url });
}
