import { guessEventLocationType } from "@timely/app-store/locations";
import type { Prisma } from "@timely/prisma/client";
import type { TFunction } from "next-i18next";

export type EventNameObjectType = {
  attendeeName: string;
  eventType: string;
  eventName?: string | null;
  teamName?: string | null;
  host: string;
  location?: string;
  bookingFields?: Prisma.JsonObject;
  t: TFunction;
};

export function getEventName(eventNameObj: EventNameObjectType, forAttendeeView = false) {
  if (!eventNameObj.eventName)
    return eventNameObj.t("event_between_users", {
      eventName: eventNameObj.eventType,
      host: eventNameObj.teamName || eventNameObj.host,
      attendeeName: eventNameObj.attendeeName,
      interpolation: {
        escapeValue: false,
      },
    });

  let eventName = eventNameObj.eventName;
  let locationString = eventNameObj.location || "";

  if (eventNameObj.eventName.includes("{Location}") || eventNameObj.eventName.includes("{LOCATION}")) {
    const eventLocationType = guessEventLocationType(eventNameObj.location);
    if (eventLocationType) {
      locationString = eventLocationType.label;
    }
    eventName = eventName.replace("{Location}", locationString);
    eventName = eventName.replace("{LOCATION}", locationString);
  }

  let dynamicEventName = eventName
    // Need this for compatibility with older event names
    .replaceAll("{Event type title}", eventNameObj.eventType)
    .replaceAll("{Scheduler}", eventNameObj.attendeeName)
    .replaceAll("{Organiser}", eventNameObj.host)
    .replaceAll("{USER}", eventNameObj.attendeeName)
    .replaceAll("{ATTENDEE}", eventNameObj.attendeeName)
    .replaceAll("{HOST}", eventNameObj.host)
    .replaceAll("{HOST/ATTENDEE}", forAttendeeView ? eventNameObj.host : eventNameObj.attendeeName);

  const customInputvariables = dynamicEventName.match(/\{(.+?)}/g)?.map((variable) => {
    return variable.replace("{", "").replace("}", "");
  });

  customInputvariables?.forEach((variable) => {
    if (eventNameObj.bookingFields) {
      Object.keys(eventNameObj.bookingFields).forEach((bookingField) => {
        if (variable === bookingField) {
          let fieldValue;
          if (eventNameObj.bookingFields) {
            const field = eventNameObj.bookingFields[bookingField as keyof typeof eventNameObj.bookingFields];
            if (field && typeof field === "object" && "value" in field) {
              fieldValue = field?.value?.toString();
            } else {
              fieldValue = field?.toString();
            }
          }
          dynamicEventName = dynamicEventName.replace(`{${variable}}`, fieldValue || "");
        }
      });
    }
  });

  return dynamicEventName;
}

export const validateCustomEventName = (
  value: string,
  message: string,
  bookingFields?: Prisma.JsonObject
) => {
  let customInputVariables: string[] = [];
  if (bookingFields) {
    customInputVariables = Object.keys(bookingFields).map((customInput) => {
      return `{${customInput}}`;
    });
  }

  const validVariables = customInputVariables.concat([
    "{Event type title}",
    "{Organiser}",
    "{Scheduler}",
    "{Location}",
    //allowed for fallback reasons
    "{LOCATION}",
    "{HOST/ATTENDEE}",
    "{HOST}",
    "{ATTENDEE}",
    "{USER}",
  ]);
  const matches = value.match(/\{([^}]+)\}/g);
  if (matches?.length) {
    for (const item of matches) {
      if (!validVariables.includes(item)) {
        return message;
      }
    }
  }

  return true;
};
