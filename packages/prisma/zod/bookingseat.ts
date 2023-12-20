import * as z from "zod"
import * as imports from "../zod-utils"
import { CompleteBooking, BookingModel, CompleteAttendee, AttendeeModel } from "./index"

// Helper schema for JSON fields
type Literal = boolean | number | string
type Json = Literal | { [key: string]: Json } | Json[]
const literalSchema = z.union([z.string(), z.number(), z.boolean()])
const jsonSchema: z.ZodSchema<Json> = z.lazy(() => z.union([literalSchema, z.array(jsonSchema), z.record(jsonSchema)]))

export const _BookingSeatModel = z.object({
  id: z.number().int(),
  referenceUid: z.string(),
  bookingId: z.number().int(),
  attendeeId: z.number().int(),
  data: jsonSchema,
})

export interface CompleteBookingSeat extends z.infer<typeof _BookingSeatModel> {
  booking: CompleteBooking
  attendee: CompleteAttendee
}

/**
 * BookingSeatModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const BookingSeatModel: z.ZodSchema<CompleteBookingSeat> = z.lazy(() => _BookingSeatModel.extend({
  booking: BookingModel,
  attendee: AttendeeModel,
}))
