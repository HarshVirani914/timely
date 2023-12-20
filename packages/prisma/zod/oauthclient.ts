import * as z from "zod"
import * as imports from "../zod-utils"
import { CompleteAccessCode, AccessCodeModel } from "./index"

export const _OAuthClientModel = z.object({
  clientId: z.string(),
  redirectUri: z.string(),
  clientSecret: z.string(),
  name: z.string(),
  logo: z.string().nullish(),
})

export interface CompleteOAuthClient extends z.infer<typeof _OAuthClientModel> {
  accessCodes: CompleteAccessCode[]
}

/**
 * OAuthClientModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const OAuthClientModel: z.ZodSchema<CompleteOAuthClient> = z.lazy(() => _OAuthClientModel.extend({
  accessCodes: AccessCodeModel.array(),
}))
