import { hasEditPermissionForUserID as $hasEditPermissionForUser } from "@timely/lib/hasEditPermissionForUser";
import type { TrpcSessionUser } from "@timely/trpc/server/trpc";

import type { THasEditPermissionForUserSchema } from "./hasEditPermissionForUser.schema";

type HasEditPermissionForUserOptions = {
  ctx: {
    user: NonNullable<TrpcSessionUser>;
  };
  input: THasEditPermissionForUserSchema;
};

export const hasEditPermissionForUser = async ({ ctx, input }: HasEditPermissionForUserOptions) => {
  // Calculate if the logged in User has edit permission for the given User.
  return $hasEditPermissionForUser({
    ctx,
    input,
  });
};

export default hasEditPermissionForUser;
