import { queryNumberArray, useTypedQuery } from "@timely/lib/hooks/useTypedQuery";
import z from "zod";

// TODO: Move this to zod utils
export const filterQuerySchema = z.object({
  teamIds: queryNumberArray.optional(),
  userIds: queryNumberArray.optional(),
  status: z.enum(["upcoming", "recurring", "past", "cancelled", "unconfirmed"]).optional(),
  eventTypeIds: queryNumberArray.optional(),
});

export function useFilterQuery() {
  return useTypedQuery(filterQuerySchema);
}
