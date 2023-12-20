import * as z from "zod"
import * as imports from "../zod-utils"
import { CompleteUser, UserModel, CompleteTeam, TeamModel } from "./index"

export const _VerifiedNumberModel = z.object({
  id: z.number().int(),
  userId: z.number().int().nullish(),
  teamId: z.number().int().nullish(),
  phoneNumber: z.string(),
})

export interface CompleteVerifiedNumber extends z.infer<typeof _VerifiedNumberModel> {
  user?: CompleteUser | null
  team?: CompleteTeam | null
}

/**
 * VerifiedNumberModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const VerifiedNumberModel: z.ZodSchema<CompleteVerifiedNumber> = z.lazy(() => _VerifiedNumberModel.extend({
  user: UserModel.nullish(),
  team: TeamModel.nullish(),
}))
