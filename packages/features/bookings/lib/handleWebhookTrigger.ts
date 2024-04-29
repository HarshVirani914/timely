import getWebhooks from "@timely/features/webhooks/lib/getWebhooks";
import type { GetSubscriberOptions } from "@timely/features/webhooks/lib/getWebhooks";
import type { WebhookDataType } from "@timely/features/webhooks/lib/sendPayload";
import sendPayload from "@timely/features/webhooks/lib/sendPayload";
import logger from "@timely/lib/logger";

export async function handleWebhookTrigger(args: {
  subscriberOptions: GetSubscriberOptions;
  eventTrigger: string;
  webhookData: Omit<WebhookDataType, "createdAt" | "triggerEvent">;
}) {
  try {
    const subscribers = await getWebhooks(args.subscriberOptions);

    const promises = subscribers.map((sub) =>
      sendPayload(sub.secret, args.eventTrigger, new Date().toISOString(), sub, args.webhookData).catch(
        (e) => {
          console.error(
            `Error executing webhook for event: ${args.eventTrigger}, URL: ${sub.subscriberUrl}`,
            e
          );
        }
      )
    );
    await Promise.all(promises);
  } catch (error) {
    logger.error("Error while sending webhook", error);
  }
}
