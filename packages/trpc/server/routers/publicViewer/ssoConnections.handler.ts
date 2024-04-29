import jackson from "@timely/features/ee/sso/lib/jackson";
import { samlProductID, samlTenantID } from "@timely/features/ee/sso/lib/saml";
import { HOSTED_CAL_FEATURES } from "@timely/lib/constants";

import { TRPCError } from "@trpc/server";

export const handler = async () => {
  try {
    if (HOSTED_CAL_FEATURES) {
      return {
        connectionExists: null,
      };
    }

    const { connectionController } = await jackson();

    const connections = await connectionController.getConnections({
      tenant: samlTenantID,
      product: samlProductID,
    });

    return {
      connectionExists: connections.length > 0,
    };
  } catch (err) {
    console.error("Error getting SSO connections", err);
    throw new TRPCError({ code: "BAD_REQUEST", message: "Fetching SSO connections failed." });
  }
};

export default handler;
