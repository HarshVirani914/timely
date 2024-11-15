import { sendAttendeeRequestEmail, sendOrganizerRequestEmail } from "@timely/emails";
import { getWebhookPayloadForBooking } from "@timely/features/bookings/lib/getWebhookPayloadForBooking";
import getWebhooks from "@timely/features/webhooks/lib/getWebhooks";
import sendPayload from "@timely/features/webhooks/lib/sendPayload";
import logger from "@timely/lib/logger";
import { safeStringify } from "@timely/lib/safeStringify";
import { WebhookTriggerEvents } from "@timely/prisma/enums";
import type { CalendarEvent } from "@timely/types/Calendar";

const log = logger.getSubLogger({ prefix: ["[handleBookingRequested] book:user"] });

/**
 * Supposed to do whatever is needed when a booking is requested.
 */
export async function handleBookingRequested(args: {
  evt: CalendarEvent;
  booking: {
    eventType: {
      currency: string;
      description: string | null;
      id: number;
      length: number;
      price: number;
      requiresConfirmation: boolean;
      title: string;
      teamId?: number | null;
    } | null;
    eventTypeId: number | null;
    userId: number | null;
    id: number;
  };
}) {
  const { evt, booking } = args;

  log.debug("Emails: Sending booking requested emails");
  await sendOrganizerRequestEmail({ ...evt });
  await sendAttendeeRequestEmail({ ...evt }, evt.attendees[0]);

  try {
    const subscribersBookingRequested = await getWebhooks({
      userId: booking.userId,
      eventTypeId: booking.eventTypeId,
      triggerEvent: WebhookTriggerEvents.BOOKING_REQUESTED,
      teamId: booking.eventType?.teamId,
    });

    const webhookPayload = getWebhookPayloadForBooking({
      booking,
      evt,
    });

    const promises = subscribersBookingRequested.map((sub) =>
      sendPayload(
        sub.secret,
        WebhookTriggerEvents.BOOKING_REQUESTED,
        new Date().toISOString(),
        sub,
        webhookPayload
      ).catch((e) => {
        console.error(
          `Error executing webhook for event: ${WebhookTriggerEvents.BOOKING_REQUESTED}, URL: ${sub.subscriberUrl}`,
          e
        );
      })
    );
    await Promise.all(promises);
  } catch (error) {
    // Silently fail
    log.error("Error in handleBookingRequested", safeStringify(error));
  }
}
