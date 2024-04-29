import { createDefaultInstallation } from "@timely/app-store/_utils/installation";
import type { AppDeclarativeHandler } from "@timely/types/AppHandler";

import appConfig from "../config.json";

const handler: AppDeclarativeHandler = {
  appType: appConfig.type,
  variant: appConfig.variant,
  slug: appConfig.slug,
  supportsMultipleInstalls: false,
  handlerType: "add",
  createCredential: ({ appType, user, slug, teamId }) =>
    createDefaultInstallation({ appType, userId: user.id, slug, key: {}, teamId }),
};

export default handler;
