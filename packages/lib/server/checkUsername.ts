import { IS_PREMIUM_USERNAME_ENABLED } from "@timely/lib/constants";

import { checkRegularUsername } from "./checkRegularUsername";
import { usernameCheck as checkPremiumUsername } from "./username";

export const checkUsername = !IS_PREMIUM_USERNAME_ENABLED ? checkRegularUsername : checkPremiumUsername;
