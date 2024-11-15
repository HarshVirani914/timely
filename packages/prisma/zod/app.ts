import * as z from "zod"
import * as imports from "../zod-utils"
import { AppCategories } from "@prisma/client"
import { CompleteCredential, CredentialModel, CompletePayment, PaymentModel, CompleteWebhook, WebhookModel, CompleteApiKey, ApiKeyModel } from "./index"

// Helper schema for JSON fields
type Literal = boolean | number | string
type Json = Literal | { [key: string]: Json } | Json[]
const literalSchema = z.union([z.string(), z.number(), z.boolean()])
const jsonSchema: z.ZodSchema<Json> = z.lazy(() => z.union([literalSchema, z.array(jsonSchema), z.record(jsonSchema)]))

export const _AppModel = z.object({
  slug: z.string(),
  dirName: z.string(),
  keys: jsonSchema,
  categories: z.nativeEnum(AppCategories).array(),
  createdAt: z.date(),
  updatedAt: z.date(),
  enabled: z.boolean(),
})

export interface CompleteApp extends z.infer<typeof _AppModel> {
  credentials: CompleteCredential[]
  payments: CompletePayment[]
  Webhook: CompleteWebhook[]
  ApiKey: CompleteApiKey[]
}

/**
 * AppModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const AppModel: z.ZodSchema<CompleteApp> = z.lazy(() => _AppModel.extend({
  credentials: CredentialModel.array(),
  payments: PaymentModel.array(),
  Webhook: WebhookModel.array(),
  ApiKey: ApiKeyModel.array(),
}))
