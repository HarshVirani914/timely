import CloseCom from "@timely/lib/CloseCom";
import { HttpError } from "@timely/lib/http-error";
import { defaultResponder } from "@timely/lib/server";
import type { NextApiRequest, NextApiResponse } from "next";

import checkSession from "../../_utils/auth";

export async function getHandler(req: NextApiRequest, res: NextApiResponse) {
  const { api_key } = req.body;
  if (!api_key) throw new HttpError({ statusCode: 400, message: "No Api Key provoided to check" });

  checkSession(req);

  const closeCom: CloseCom = new CloseCom(api_key);

  try {
    const userInfo = await closeCom.me();
    if (userInfo.first_name) {
      return res.status(200).end();
    } else {
      return res.status(404).end();
    }
  } catch (e) {
    return res.status(500).json({ message: e });
  }
}

export default defaultResponder(getHandler);
