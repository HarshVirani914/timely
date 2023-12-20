import * as z from "zod"
import * as imports from "../zod-utils"

export const _AvatarModel = z.object({
  teamId: z.number().int(),
  userId: z.number().int(),
  data: z.string(),
  objectKey: z.string(),
})
