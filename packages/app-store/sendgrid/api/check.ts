import Sendgrid from "@timely/lib/Sendgrid";
import { HttpError } from "@timely/lib/http-error";
import { defaultHandler, defaultResponder } from "@timely/lib/server";
import type { NextApiRequest } from "next";

import checkSession from "../../_utils/auth";

export async function getHandler(req: NextApiRequest) {
  const { api_key } = req.body;
  if (!api_key) throw new HttpError({ statusCode: 400, message: "No Api Key provoided to check" });

  checkSession(req);

  const sendgrid: Sendgrid = new Sendgrid(api_key);

  try {
    const usernameInfo = await sendgrid.username();
    if (usernameInfo.username) {
      return {};
    } else {
      throw new HttpError({ statusCode: 404 });
    }
  } catch (e) {
    throw new HttpError({ statusCode: 500, message: e as string });
  }
}

export default defaultHandler({
  POST: Promise.resolve({ default: defaultResponder(getHandler) }),
});
