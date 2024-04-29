import { createNextApiHandler } from "@timely/trpc/server/createNextApiHandler";
import { bookingsRouter } from "@timely/trpc/server/routers/viewer/bookings/_router";

export default createNextApiHandler(bookingsRouter);
