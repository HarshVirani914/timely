import * as z from "zod"
import * as imports from "../zod-utils"
import { CompleteCredential, CredentialModel } from "./index"

// Helper schema for JSON fields
type Literal = boolean | number | string
type Json = Literal | { [key: string]: Json } | Json[]
const literalSchema = z.union([z.string(), z.number(), z.boolean()])
const jsonSchema: z.ZodSchema<Json> = z.lazy(() => z.union([literalSchema, z.array(jsonSchema), z.record(jsonSchema)]))

export const _CalendarCacheModel = z.object({
  key: z.string(),
  value: jsonSchema,
  expiresAt: z.date(),
  credentialId: z.number().int(),
})

export interface CompleteCalendarCache extends z.infer<typeof _CalendarCacheModel> {
  credential?: CompleteCredential | null
}

/**
 * CalendarCacheModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const CalendarCacheModel: z.ZodSchema<CompleteCalendarCache> = z.lazy(() => _CalendarCacheModel.extend({
  credential: CredentialModel.nullish(),
}))
