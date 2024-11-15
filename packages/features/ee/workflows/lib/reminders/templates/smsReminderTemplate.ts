import dayjs from "@timely/dayjs";
import { TimeFormat } from "@timely/lib/timeFormat";
import { WorkflowActions } from "@timely/prisma/enums";

const smsReminderTemplate = (
  isEditingMode: boolean,
  action?: WorkflowActions,
  timeFormat?: TimeFormat,
  startTime?: string,
  eventName?: string,
  timeZone?: string,
  attendee?: string,
  name?: string
) => {
  const currentTimeFormat = timeFormat || TimeFormat.TWELVE_HOUR;

  let eventDate;
  if (isEditingMode) {
    eventName = "{EVENT_NAME}";
    timeZone = "{TIMEZONE}";
    startTime = `{EVENT_TIME_${currentTimeFormat}}`;

    eventDate = "{EVENT_DATE_YYYY MMM D}";
    attendee = action === WorkflowActions.SMS_ATTENDEE ? "{ORGANIZER}" : "{ATTENDEE}";
    name = action === WorkflowActions.SMS_ATTENDEE ? "{ATTENDEE}" : "{ORGANIZER}";
  } else {
    eventDate = dayjs(startTime).tz(timeZone).format("YYYY MMM D");
    startTime = dayjs(startTime).tz(timeZone).format(currentTimeFormat);
  }

  const templateOne = `Hi${
    name ? ` ${name}` : ``
  }, this is a reminder that your meeting (${eventName}) with ${attendee} is on ${eventDate} at ${startTime} ${timeZone}.`;

  //Twilio recomments message to be no longer than 320 characters
  if (templateOne.length <= 320) return templateOne;

  const templateTwo = `Hi, this is a reminder that your meeting with ${attendee} is on ${eventDate} at ${startTime} ${timeZone}`;

  //Twilio supports up to 1600 characters
  if (templateTwo.length <= 1600) return templateTwo;

  return null;
};

export default smsReminderTemplate;
