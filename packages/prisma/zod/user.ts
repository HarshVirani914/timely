import * as z from "zod"
import * as imports from "../zod-utils"
import { IdentityProvider, UserPermissionRole } from "@prisma/client"
import { CompleteEventType, EventTypeModel, CompleteCredential, CredentialModel, CompleteMembership, MembershipModel, CompleteBooking, BookingModel, CompleteSchedule, ScheduleModel, CompleteSelectedCalendar, SelectedCalendarModel, CompleteAvailability, AvailabilityModel, CompleteWebhook, WebhookModel, CompleteDestinationCalendar, DestinationCalendarModel, CompleteImpersonations, ImpersonationsModel, CompleteApiKey, ApiKeyModel, CompleteAccount, AccountModel, CompleteSession, SessionModel, CompleteFeedback, FeedbackModel, CompleteWorkflow, WorkflowModel, CompleteApp_RoutingForms_Form, App_RoutingForms_FormModel, CompleteVerifiedNumber, VerifiedNumberModel, CompleteHost, HostModel, CompleteTeam, TeamModel, CompleteAccessCode, AccessCodeModel } from "./index"

// Helper schema for JSON fields
type Literal = boolean | number | string
type Json = Literal | { [key: string]: Json } | Json[]
const literalSchema = z.union([z.string(), z.number(), z.boolean()])
const jsonSchema: z.ZodSchema<Json> = z.lazy(() => z.union([literalSchema, z.array(jsonSchema), z.record(jsonSchema)]))

export const _UserModel = z.object({
  id: z.number().int(),
  username: z.string().nullish(),
  name: z.string().nullish(),
  email: z.string().email(),
  emailVerified: z.date().nullish(),
  password: z.string().nullish(),
  bio: z.string().nullish(),
  avatar: z.string().nullish(),
  avatarUrl: z.string().nullish(),
  timeZone: z.string(),
  weekStart: z.string(),
  startTime: z.number().int(),
  endTime: z.number().int(),
  bufferTime: z.number().int(),
  hideBranding: z.boolean(),
  theme: z.string().nullish(),
  createdDate: z.date(),
  trialEndsAt: z.date().nullish(),
  defaultScheduleId: z.number().int().nullish(),
  completedOnboarding: z.boolean(),
  locale: z.string().nullish(),
  timeFormat: z.number().int().nullish(),
  twoFactorSecret: z.string().nullish(),
  twoFactorEnabled: z.boolean(),
  backupCodes: z.string().nullish(),
  identityProvider: z.nativeEnum(IdentityProvider),
  identityProviderId: z.string().nullish(),
  invitedTo: z.number().int().nullish(),
  brandColor: z.string(),
  darkBrandColor: z.string(),
  away: z.boolean(),
  allowDynamicBooking: z.boolean().nullish(),
  allowSEOIndexing: z.boolean().nullish(),
  receiveMonthlyDigestEmail: z.boolean().nullish(),
  metadata: imports.userMetadata,
  verified: z.boolean().nullish(),
  role: z.nativeEnum(UserPermissionRole),
  disableImpersonation: z.boolean(),
  organizationId: z.number().int().nullish(),
  locked: z.boolean(),
})

export interface CompleteUser extends z.infer<typeof _UserModel> {
  eventTypes: CompleteEventType[]
  credentials: CompleteCredential[]
  teams: CompleteMembership[]
  bookings: CompleteBooking[]
  schedules: CompleteSchedule[]
  selectedCalendars: CompleteSelectedCalendar[]
  availability: CompleteAvailability[]
  webhooks: CompleteWebhook[]
  destinationCalendar?: CompleteDestinationCalendar | null
  impersonatedUsers: CompleteImpersonations[]
  impersonatedBy: CompleteImpersonations[]
  apiKeys: CompleteApiKey[]
  accounts: CompleteAccount[]
  sessions: CompleteSession[]
  Feedback: CompleteFeedback[]
  ownedEventTypes: CompleteEventType[]
  workflows: CompleteWorkflow[]
  routingForms: CompleteApp_RoutingForms_Form[]
  verifiedNumbers: CompleteVerifiedNumber[]
  hosts: CompleteHost[]
  organization?: CompleteTeam | null
  accessCodes: CompleteAccessCode[]
}

/**
 * UserModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const UserModel: z.ZodSchema<CompleteUser> = z.lazy(() => _UserModel.extend({
  eventTypes: EventTypeModel.array(),
  credentials: CredentialModel.array(),
  teams: MembershipModel.array(),
  bookings: BookingModel.array(),
  schedules: ScheduleModel.array(),
  selectedCalendars: SelectedCalendarModel.array(),
  availability: AvailabilityModel.array(),
  webhooks: WebhookModel.array(),
  destinationCalendar: DestinationCalendarModel.nullish(),
  impersonatedUsers: ImpersonationsModel.array(),
  impersonatedBy: ImpersonationsModel.array(),
  apiKeys: ApiKeyModel.array(),
  accounts: AccountModel.array(),
  sessions: SessionModel.array(),
  Feedback: FeedbackModel.array(),
  ownedEventTypes: EventTypeModel.array(),
  workflows: WorkflowModel.array(),
  routingForms: App_RoutingForms_FormModel.array(),
  verifiedNumbers: VerifiedNumberModel.array(),
  hosts: HostModel.array(),
  organization: TeamModel.nullish(),
  accessCodes: AccessCodeModel.array(),
}))
