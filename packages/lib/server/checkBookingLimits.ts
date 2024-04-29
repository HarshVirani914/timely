import dayjs from "@timely/dayjs";
import prisma from "@timely/prisma";
import { BookingStatus } from "@timely/prisma/enums";
import type { IntervalLimit } from "@timely/types/Calendar";

import { getErrorFromUnknown } from "../errors";
import { HttpError } from "../http-error";
import { ascendingLimitKeys, intervalLimitKeyToUnit } from "../intervalLimit";
import { parseBookingLimit } from "../isBookingLimits";

export async function checkBookingLimits(
  bookingLimits: IntervalLimit,
  eventStartDate: Date,
  eventId: number,
  timeZone?: string | null
) {
  const parsedBookingLimits = parseBookingLimit(bookingLimits);
  if (!parsedBookingLimits) return false;

  // not iterating entries to preserve types
  const limitCalculations = ascendingLimitKeys.map((key) =>
    checkBookingLimit({ key, limitingNumber: parsedBookingLimits[key], eventStartDate, eventId, timeZone })
  );

  try {
    return !!(await Promise.all(limitCalculations));
  } catch (error) {
    throw new HttpError({ message: getErrorFromUnknown(error).message, statusCode: 401 });
  }
}

export async function checkBookingLimit({
  eventStartDate,
  eventId,
  key,
  limitingNumber,
  timeZone,
}: {
  eventStartDate: Date;
  eventId: number;
  key: keyof IntervalLimit;
  limitingNumber: number | undefined;
  timeZone?: string | null;
}) {
  {
    const eventDateInOrganizerTz = timeZone ? dayjs(eventStartDate).tz(timeZone) : dayjs(eventStartDate);

    if (!limitingNumber) return;

    const unit = intervalLimitKeyToUnit(key);

    const startDate = dayjs(eventDateInOrganizerTz).startOf(unit).toDate();
    const endDate = dayjs(eventDateInOrganizerTz).endOf(unit).toDate();

    const bookingsInPeriod = await prisma.booking.count({
      where: {
        status: BookingStatus.ACCEPTED,
        eventTypeId: eventId,
        // FIXME: bookings that overlap on one side will never be counted
        startTime: {
          gte: startDate,
        },
        endTime: {
          lte: endDate,
        },
      },
    });

    if (bookingsInPeriod < limitingNumber) return;

    throw new HttpError({
      message: `booking_limit_reached`,
      statusCode: 403,
    });
  }
}
