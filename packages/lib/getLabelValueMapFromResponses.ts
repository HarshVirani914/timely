import type { bookingResponse } from "@timely/features/bookings/lib/getBookingResponsesSchema";
import type { CalendarEvent } from "@timely/types/Calendar";
import type z from "zod";

export default function getLabelValueMapFromResponses(calEvent: CalendarEvent) {
  const { customInputs, userFieldsResponses } = calEvent;

  let labelValueMap: Record<string, z.infer<typeof bookingResponse>> = {};
  if (userFieldsResponses) {
    for (const [, value] of Object.entries(userFieldsResponses)) {
      if (!value.label) {
        continue;
      }
      labelValueMap[value.label] = value.value;
    }
  } else {
    labelValueMap = customInputs as Record<string, string | string[]>;
  }
  return labelValueMap;
}
