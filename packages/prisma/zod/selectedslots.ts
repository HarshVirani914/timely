import * as z from "zod"
import * as imports from "../zod-utils"

export const _SelectedSlotsModel = z.object({
  id: z.number().int(),
  eventTypeId: z.number().int(),
  userId: z.number().int(),
  slotUtcStartDate: z.date(),
  slotUtcEndDate: z.date(),
  uid: z.string(),
  releaseAt: z.date(),
  isSeat: z.boolean(),
})
