import type { AppDeclarativeHandler } from "@timely/types/AppHandler";

import { createDefaultInstallation } from "../../_utils/installation";
import appConfig from "../config.json";

const handler: AppDeclarativeHandler = {
  appType: appConfig.type,
  slug: appConfig.slug,
  variant: appConfig.variant,
  supportsMultipleInstalls: false,
  handlerType: "add",
  redirect: {
    url: "raycast://extensions/eluce2/cal-com-share-meeting-links?source=webstore",
  },
  createCredential: ({ appType, user, slug, teamId }) =>
    createDefaultInstallation({ appType, userId: user.id, slug, key: {}, teamId }),
};

export default handler;
