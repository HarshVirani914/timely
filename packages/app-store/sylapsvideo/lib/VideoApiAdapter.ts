import type { PartialReference } from "@timely/types/EventManager";
import type { VideoApiAdapter, VideoCallData } from "@timely/types/VideoApiAdapter";
import { v4 as uuidv4 } from "uuid";

const SylapsApiAdapter = (): VideoApiAdapter => {
  return {
    getAvailability: () => {
      return Promise.resolve([]);
    },
    createMeeting: async (): Promise<VideoCallData> => {
      const meetingID = uuidv4();
      return Promise.resolve({
        type: "sylaps_video",
        id: meetingID,
        password: "",
        url: `https://sylaps.com/r/${meetingID}`,
      });
    },
    deleteMeeting: async (): Promise<void> => {
      Promise.resolve();
    },
    updateMeeting: (bookingRef: PartialReference): Promise<VideoCallData> => {
      return Promise.resolve({
        type: "sylaps_video",
        id: bookingRef.meetingId as string,
        password: bookingRef.meetingPassword as string,
        url: bookingRef.meetingUrl as string,
      });
    },
  };
};

export default SylapsApiAdapter;
