import * as z from "zod"
import * as imports from "../zod-utils"
import { CompleteUser, UserModel, CompleteTeam, TeamModel, CompleteApp, AppModel, CompleteDestinationCalendar, DestinationCalendarModel, CompleteSelectedCalendar, SelectedCalendarModel, CompleteCalendarCache, CalendarCacheModel } from "./index"

// Helper schema for JSON fields
type Literal = boolean | number | string
type Json = Literal | { [key: string]: Json } | Json[]
const literalSchema = z.union([z.string(), z.number(), z.boolean()])
const jsonSchema: z.ZodSchema<Json> = z.lazy(() => z.union([literalSchema, z.array(jsonSchema), z.record(jsonSchema)]))

export const _CredentialModel = z.object({
  id: z.number().int(),
  type: z.string(),
  key: jsonSchema,
  userId: z.number().int().nullish(),
  teamId: z.number().int().nullish(),
  appId: z.string().nullish(),
  subscriptionId: z.string().nullish(),
  paymentStatus: z.string().nullish(),
  billingCycleStart: z.number().int().nullish(),
  invalid: z.boolean().nullish(),
})

export interface CompleteCredential extends z.infer<typeof _CredentialModel> {
  user?: CompleteUser | null
  team?: CompleteTeam | null
  app?: CompleteApp | null
  destinationCalendars: CompleteDestinationCalendar[]
  selectedCalendars: CompleteSelectedCalendar[]
  CalendarCache: CompleteCalendarCache[]
}

/**
 * CredentialModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const CredentialModel: z.ZodSchema<CompleteCredential> = z.lazy(() => _CredentialModel.extend({
  user: UserModel.nullish(),
  team: TeamModel.nullish(),
  app: AppModel.nullish(),
  destinationCalendars: DestinationCalendarModel.array(),
  selectedCalendars: SelectedCalendarModel.array(),
  CalendarCache: CalendarCacheModel.array(),
}))
