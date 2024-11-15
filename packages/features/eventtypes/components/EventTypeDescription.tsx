import type { Prisma } from "@prisma/client";
import { Price } from "@timely/features/bookings/components/event-meta/Price";
import { getPriceIcon } from "@timely/features/bookings/components/event-meta/getPriceIcon";
import { classNames, parseRecurringEvent } from "@timely/lib";
import getPaymentAppData from "@timely/lib/getPaymentAppData";
import { useLocale } from "@timely/lib/hooks/useLocale";
import type { baseEventTypeSelect } from "@timely/prisma";
import { SchedulingType } from "@timely/prisma/enums";
import type { EventTypeModel } from "@timely/prisma/zod";
import { Badge } from "@timely/ui";
import { Clock, Users, RefreshCw, Clipboard, Plus, User, Lock } from "@timely/ui/components/icon";
import { useMemo } from "react";
import type { z } from "zod";

export type EventTypeDescriptionProps = {
  eventType: Pick<
    z.infer<typeof EventTypeModel>,
    Exclude<keyof typeof baseEventTypeSelect, "recurringEvent"> | "metadata"
  > & {
    descriptionAsSafeHTML?: string | null;
    recurringEvent: Prisma.JsonValue;
    seatsPerTimeSlot?: number;
  };
  className?: string;
  shortenDescription?: boolean;
  isPublic?: boolean;
};

export const EventTypeDescription = ({
  eventType,
  className,
  shortenDescription,
  isPublic,
}: EventTypeDescriptionProps) => {
  const { t, i18n } = useLocale();

  const recurringEvent = useMemo(
    () => parseRecurringEvent(eventType.recurringEvent),
    [eventType.recurringEvent]
  );

  const paymentAppData = getPaymentAppData(eventType);

  return (
    <>
      <div className={classNames("text-subtle", className)}>
        {eventType.description && (
          <div
            className={classNames(
              "text-subtle line-clamp-3 break-words py-1 text-sm sm:max-w-[650px] [&_a]:text-blue-500 [&_a]:underline [&_a]:hover:text-blue-600",
              shortenDescription ? "line-clamp-4 [&>*:not(:first-child)]:hidden" : ""
            )}
            dangerouslySetInnerHTML={{
              __html: eventType.descriptionAsSafeHTML || "",
            }}
          />
        )}
        <ul className="mt-2 flex flex-wrap gap-x-2 gap-y-1">
          {eventType.metadata?.multipleDuration ? (
            eventType.metadata.multipleDuration.map((dur, idx) => (
              <li key={idx}>
                <Badge variant="gray" startIcon={Clock}>
                  {dur}m
                </Badge>
              </li>
            ))
          ) : (
            <li>
              <Badge variant="gray" startIcon={Clock}>
                {eventType.length}m
              </Badge>
            </li>
          )}
          {eventType.schedulingType && eventType.schedulingType !== SchedulingType.MANAGED && (
            <li>
              <Badge variant="gray" startIcon={Users}>
                {eventType.schedulingType === SchedulingType.ROUND_ROBIN && t("round_robin")}
                {eventType.schedulingType === SchedulingType.COLLECTIVE && t("collective")}
              </Badge>
            </li>
          )}
          {eventType.metadata?.managedEventConfig && !isPublic && (
            <Badge variant="gray" startIcon={Lock}>
              {t("managed")}
            </Badge>
          )}
          {recurringEvent?.count && recurringEvent.count > 0 && (
            <li className="hidden xl:block">
              <Badge variant="gray" startIcon={RefreshCw}>
                {t("repeats_up_to", {
                  count: recurringEvent.count,
                })}
              </Badge>
            </li>
          )}
          {paymentAppData.enabled && (
            <li>
              <Badge variant="gray" startIcon={getPriceIcon(paymentAppData.currency)}>
                <Price
                  currency={paymentAppData.currency}
                  price={paymentAppData.price}
                  displayAlternateSymbol={false}
                />
              </Badge>
            </li>
          )}
          {eventType.requiresConfirmation && (
            <li className="hidden xl:block">
              <Badge variant="gray" startIcon={Clipboard}>
                {eventType.metadata?.requiresConfirmationThreshold
                  ? t("may_require_confirmation")
                  : t("requires_confirmation")}
              </Badge>
            </li>
          )}
          {/* TODO: Maybe add a tool tip to this? */}
          {eventType.requiresConfirmation || (recurringEvent?.count && recurringEvent.count) ? (
            <li className="block xl:hidden">
              <Badge variant="gray" startIcon={Plus}>
                <p>{[eventType.requiresConfirmation, recurringEvent?.count].filter(Boolean).length}</p>
              </Badge>
            </li>
          ) : (
            <></>
          )}
          {eventType?.seatsPerTimeSlot ? (
            <li>
              <Badge variant="gray" startIcon={User}>
                <p>{t("event_type_seats", { numberOfSeats: eventType.seatsPerTimeSlot })} </p>
              </Badge>
            </li>
          ) : null}
        </ul>
      </div>
    </>
  );
};

export default EventTypeDescription;
