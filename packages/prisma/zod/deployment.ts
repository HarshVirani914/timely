import * as z from "zod"
import * as imports from "../zod-utils"

// Helper schema for JSON fields
type Literal = boolean | number | string
type Json = Literal | { [key: string]: Json } | Json[]
const literalSchema = z.union([z.string(), z.number(), z.boolean()])
const jsonSchema: z.ZodSchema<Json> = z.lazy(() => z.union([literalSchema, z.array(jsonSchema), z.record(jsonSchema)]))

export const _DeploymentModel = z.object({
  /**
   * This is a single row table, so we use a fixed id
   */
  id: z.number().int(),
  logo: z.string().nullish(),
  theme: imports.DeploymentTheme,
  licenseKey: z.string().nullish(),
  agreedLicenseAt: z.date().nullish(),
})
