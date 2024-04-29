import CalendarService from "@timely/lib/CalendarService";
import type { CredentialPayload } from "@timely/types/Credential";

export default class CalDavCalendarService extends CalendarService {
  constructor(credential: CredentialPayload) {
    super(credential, "caldav_calendar");
  }
}
