import CalendarService from "@timely/lib/CalendarService";
import type { CredentialPayload } from "@timely/types/Credential";

export default class AppleCalendarService extends CalendarService {
  constructor(credential: CredentialPayload) {
    super(credential, "apple_calendar", "https://caldav.icloud.com");
  }
}
