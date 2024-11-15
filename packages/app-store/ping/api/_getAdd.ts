import { defaultResponder } from "@timely/lib/server";
import type { NextApiRequest } from "next";

import checkSession from "../../_utils/auth";
import getInstalledAppPath from "../../_utils/getInstalledAppPath";
import { checkInstalled, createDefaultInstallation } from "../../_utils/installation";
import appConfig from "../config.json";

export async function getHandler(req: NextApiRequest) {
  const session = checkSession(req);
  const slug = appConfig.slug;
  const appType = appConfig.type;

  await checkInstalled(slug, session.user.id);
  await createDefaultInstallation({
    appType,
    userId: session.user.id,
    slug,
    key: {},
  });

  return { url: getInstalledAppPath({ variant: appConfig.variant, slug: "ping" }) };
}

export default defaultResponder(getHandler);
