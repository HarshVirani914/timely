import * as z from "zod"
import * as imports from "../zod-utils"
import { CompleteMembership, MembershipModel, CompleteEventType, EventTypeModel, CompleteWorkflow, WorkflowModel, CompleteVerifiedNumber, VerifiedNumberModel, CompleteUser, UserModel, CompleteVerificationToken, VerificationTokenModel, CompleteWebhook, WebhookModel, CompleteApp_RoutingForms_Form, App_RoutingForms_FormModel, CompleteApiKey, ApiKeyModel, CompleteCredential, CredentialModel, CompleteAccessCode, AccessCodeModel } from "./index"

// Helper schema for JSON fields
type Literal = boolean | number | string
type Json = Literal | { [key: string]: Json } | Json[]
const literalSchema = z.union([z.string(), z.number(), z.boolean()])
const jsonSchema: z.ZodSchema<Json> = z.lazy(() => z.union([literalSchema, z.array(jsonSchema), z.record(jsonSchema)]))

export const _TeamModel = z.object({
  id: z.number().int(),
  name: z.string().min(1),
  slug: z.string().min(1).nullish(),
  logo: z.string().nullish(),
  logoUrl: z.string().nullish(),
  appLogo: z.string().nullish(),
  appIconLogo: z.string().nullish(),
  bio: z.string().nullish(),
  hideBranding: z.boolean(),
  isPrivate: z.boolean(),
  hideBookATeamMember: z.boolean(),
  createdAt: z.date(),
  metadata: imports.teamMetadataSchema,
  theme: z.string().nullish(),
  brandColor: z.string(),
  darkBrandColor: z.string(),
  parentId: z.number().int().nullish(),
  timeFormat: z.number().int().nullish(),
  timeZone: z.string(),
  weekStart: z.string(),
})

export interface CompleteTeam extends z.infer<typeof _TeamModel> {
  members: CompleteMembership[]
  eventTypes: CompleteEventType[]
  workflows: CompleteWorkflow[]
  verifiedNumbers: CompleteVerifiedNumber[]
  parent?: CompleteTeam | null
  children: CompleteTeam[]
  orgUsers: CompleteUser[]
  inviteTokens: CompleteVerificationToken[]
  webhooks: CompleteWebhook[]
  routingForms: CompleteApp_RoutingForms_Form[]
  apiKeys: CompleteApiKey[]
  credentials: CompleteCredential[]
  accessCodes: CompleteAccessCode[]
}

/**
 * TeamModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const TeamModel: z.ZodSchema<CompleteTeam> = z.lazy(() => _TeamModel.extend({
  members: MembershipModel.array(),
  eventTypes: EventTypeModel.array(),
  workflows: WorkflowModel.array(),
  verifiedNumbers: VerifiedNumberModel.array(),
  parent: TeamModel.nullish(),
  children: TeamModel.array(),
  orgUsers: UserModel.array(),
  inviteTokens: VerificationTokenModel.array(),
  webhooks: WebhookModel.array(),
  routingForms: App_RoutingForms_FormModel.array(),
  apiKeys: ApiKeyModel.array(),
  credentials: CredentialModel.array(),
  accessCodes: AccessCodeModel.array(),
}))
