import type { AppFlags } from "@timely/features/flags/config";
import { trpc } from "@timely/trpc/react";

export function useFlags() {
  const query = trpc.viewer.features.map.useQuery(undefined, {
    initialData: process.env.NEXT_PUBLIC_IS_E2E
      ? { "managed-event-types": true, organizations: true, teams: true }
      : undefined,
    placeholderData: {},
  });
  return query.data ?? ({} as AppFlags);
}
