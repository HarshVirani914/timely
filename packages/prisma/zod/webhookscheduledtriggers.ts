import * as z from "zod"
import * as imports from "../zod-utils"

export const _WebhookScheduledTriggersModel = z.object({
  id: z.number().int(),
  jobName: z.string(),
  subscriberUrl: z.string(),
  payload: z.string(),
  startAfter: z.date(),
  retryCount: z.number().int(),
  createdAt: z.date().nullish(),
})
