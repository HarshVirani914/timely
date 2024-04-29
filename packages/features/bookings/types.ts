import type { BookingCreateBody } from "@timely/prisma/zod-utils";
import type { RouterOutputs } from "@timely/trpc/react";
import type { AppsStatus } from "@timely/types/Calendar";
import type { ErrorOption, FieldPath } from "react-hook-form";

export type PublicEvent = NonNullable<RouterOutputs["viewer"]["public"]["event"]>;
export type ValidationErrors<T extends object> = { key: FieldPath<T>; error: ErrorOption }[];

export type EventPrice = { currency: string; price: number; displayAlternateSymbol?: boolean };

export enum EventDetailBlocks {
  // Includes duration select when event has multiple durations.
  DURATION,
  LOCATION,
  REQUIRES_CONFIRMATION,
  // Includes input to select # of occurences.
  OCCURENCES,
  PRICE,
}

export type { BookingCreateBody };

export type RecurringBookingCreateBody = BookingCreateBody & {
  noEmail?: boolean;
  recurringCount?: number;
  appsStatus?: AppsStatus[] | undefined;
  allRecurringDates?: string[];
  currentRecurringIndex?: number;
};

export type BookingResponse = Awaited<
  ReturnType<typeof import("@timely/features/bookings/lib/handleNewBooking").default>
>;

export type InstatBookingResponse = Awaited<
  ReturnType<typeof import("@timely/features/instant-meeting/handleInstantMeeting").default>
>;
