import { _DestinationCalendarModel, _EventTypeModel } from "@timely/prisma/zod";
import { customInputSchema, EventTypeMetaDataSchema, stringOrNumber } from "@timely/prisma/zod-utils";
import { eventTypeBookingFields } from "@timely/prisma/zod-utils";
import { z } from "zod";

export const EventTypeUpdateInput = _EventTypeModel
  /** Optional fields */
  .extend({
    isInstantEvent: z.boolean().optional(),
    customInputs: z.array(customInputSchema).optional(),
    destinationCalendar: _DestinationCalendarModel.pick({
      integration: true,
      externalId: true,
    }),
    users: z.array(stringOrNumber).optional(),
    children: z
      .array(
        z.object({
          owner: z.object({
            id: z.number(),
            name: z.string(),
            email: z.string(),
            eventTypeSlugs: z.array(z.string()),
          }),
          hidden: z.boolean(),
        })
      )
      .optional(),
    hosts: z
      .array(
        z.object({
          userId: z.number(),
          isFixed: z.boolean().optional(),
        })
      )
      .optional(),
    schedule: z.number().nullable().optional(),
    hashedLink: z.string(),
  })
  .partial()
  .extend({
    metadata: EventTypeMetaDataSchema.optional(),
    bookingFields: eventTypeBookingFields.optional(),
  })
  .merge(
    _EventTypeModel
      /** Required fields */
      .pick({
        id: true,
      })
  );

export const EventTypeDuplicateInput = z.object({
  id: z.number(),
  slug: z.string(),
  title: z.string(),
  description: z.string(),
  length: z.number(),
});
