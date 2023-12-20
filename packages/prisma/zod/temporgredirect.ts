import * as z from "zod"
import * as imports from "../zod-utils"
import { RedirectType } from "@prisma/client"

export const _TempOrgRedirectModel = z.object({
  id: z.number().int(),
  from: z.string(),
  fromOrgId: z.number().int(),
  type: z.nativeEnum(RedirectType),
  toUrl: z.string(),
  enabled: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
})
