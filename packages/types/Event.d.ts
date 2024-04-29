import type { NewCalendarEventType, AdditionalInformation } from "@timely/types/Calendar";

import type { VideoCallData } from "./VideoApiAdapter";

export type Event = AdditionalInformation | NewCalendarEventType | VideoCallData;
