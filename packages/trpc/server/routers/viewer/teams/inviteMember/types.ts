import type { Team } from "@timely/prisma/client";
import type { TrpcSessionUser } from "@timely/trpc/server/trpc";

import type { TInviteMemberInputSchema } from "./inviteMember.schema";

export type InviteMemberOptions = {
  ctx: {
    user: NonNullable<TrpcSessionUser>;
  };
  input: TInviteMemberInputSchema;
};

export type TeamWithParent = Team & {
  parent: Team | null;
};
