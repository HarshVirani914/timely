import * as z from "zod"
import * as imports from "../zod-utils"
import { BookingStatus } from "@prisma/client"

export const _BookingTimeStatusModel = z.object({
  id: z.number().int(),
  uid: z.string().nullish(),
  eventTypeId: z.number().int().nullish(),
  title: z.string().nullish(),
  description: z.string().nullish(),
  startTime: z.date().nullish(),
  endTime: z.date().nullish(),
  createdAt: z.date().nullish(),
  location: z.string().nullish(),
  paid: z.boolean().nullish(),
  status: z.nativeEnum(BookingStatus).nullish(),
  rescheduled: z.boolean().nullish(),
  userId: z.number().int().nullish(),
  teamId: z.number().int().nullish(),
  eventLength: z.number().int().nullish(),
  timeStatus: z.string().nullish(),
  eventParentId: z.number().int().nullish(),
  userEmail: z.string().nullish(),
  username: z.string().nullish(),
})
