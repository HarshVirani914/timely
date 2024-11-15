import type { NextApiRequest } from "next";
import z from "zod";

import jackson from "@timely/features/ee/sso/lib/jackson";
import { HttpError } from "@timely/lib/http-error";
import { defaultHandler, defaultResponder } from "@timely/lib/server";

const extractAuthToken = (req: NextApiRequest) => {
  const authHeader = req.headers["authorization"];
  const parts = (authHeader || "").split(" ");
  if (parts.length > 1) return parts[1];

  // check for query param
  let arr: string[] = [];
  const { access_token } = requestQuery.parse(req.query);
  arr = arr.concat(access_token);
  if (arr[0].length > 0) return arr[0];

  throw new HttpError({ statusCode: 401, message: "Unauthorized" });
};

const requestQuery = z.object({
  access_token: z.string(),
});

async function getHandler(req: NextApiRequest) {
  const { oauthController } = await jackson();
  const token = extractAuthToken(req);
  return await oauthController.userInfo(token);
}

export default defaultHandler({
  GET: Promise.resolve({ default: defaultResponder(getHandler) }),
});
