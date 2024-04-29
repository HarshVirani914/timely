import type { PrismaClient } from "@timely/prisma";
import { BookingStatus } from "@timely/prisma/enums";

import type { TInstantBookingInputSchema } from "./getInstantBookingLocation.schema";

type GetOptions = {
  ctx: {
    prisma: PrismaClient;
  };
  input: TInstantBookingInputSchema;
};

export const getHandler = async ({ ctx, input }: GetOptions) => {
  const { prisma } = ctx;
  const { bookingId } = input;

  const booking = await prisma.booking.findUnique({
    where: {
      id: bookingId,
      status: BookingStatus.ACCEPTED,
    },
    select: {
      id: true,
      uid: true,
      location: true,
      metadata: true,
      startTime: true,
      status: true,
      endTime: true,
      description: true,
      eventTypeId: true,
    },
  });

  // Don't leak anything private from the booking
  return {
    booking,
  };
};
