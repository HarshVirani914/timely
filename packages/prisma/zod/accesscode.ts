import * as z from "zod"
import * as imports from "../zod-utils"
import { AccessScope } from "@prisma/client"
import { CompleteOAuthClient, OAuthClientModel, CompleteUser, UserModel, CompleteTeam, TeamModel } from "./index"

export const _AccessCodeModel = z.object({
  id: z.number().int(),
  code: z.string(),
  clientId: z.string().nullish(),
  expiresAt: z.date(),
  scopes: z.nativeEnum(AccessScope).array(),
  userId: z.number().int().nullish(),
  teamId: z.number().int().nullish(),
})

export interface CompleteAccessCode extends z.infer<typeof _AccessCodeModel> {
  client?: CompleteOAuthClient | null
  user?: CompleteUser | null
  team?: CompleteTeam | null
}

/**
 * AccessCodeModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const AccessCodeModel: z.ZodSchema<CompleteAccessCode> = z.lazy(() => _AccessCodeModel.extend({
  client: OAuthClientModel.nullish(),
  user: UserModel.nullish(),
  team: TeamModel.nullish(),
}))
