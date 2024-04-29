export type BookingResponse = Awaited<
  ReturnType<typeof import("@timely/features/bookings/lib/handleNewBooking").default>
>;
