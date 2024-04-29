import { handleErrorsJson } from "@timely/lib/errors";
import { randomString } from "@timely/lib/random";
import type { PartialReference } from "@timely/types/EventManager";
import type { VideoApiAdapter, VideoCallData } from "@timely/types/VideoApiAdapter";
import z from "zod";

const huddle01Schema = z.object({ url: z.string().url(), roomId: z.string() });

const Huddle01VideoApiAdapter = (): VideoApiAdapter => {
  return {
    getAvailability: () => {
      return Promise.resolve([]);
    },
    createMeeting: async (): Promise<VideoCallData> => {
      const res = await fetch(
        "https://wpss2zlpb9.execute-api.us-east-1.amazonaws.com/new-meeting?utmCampaign=timely&utmSource=partner&utmMedium=calendar"
      );

      const json = await handleErrorsJson<{ url: string }>(res);
      const { url } = huddle01Schema.parse(json);
      if (url) {
        return Promise.resolve({
          type: "huddle01_video",
          id: randomString(21),
          password: "",
          url,
        });
      }
      return Promise.reject("Url was not received in response body.");
    },
    deleteMeeting: async (): Promise<void> => {
      Promise.resolve();
    },
    updateMeeting: (bookingRef: PartialReference): Promise<VideoCallData> => {
      return Promise.resolve({
        type: "huddle01_video",
        id: bookingRef.meetingId as string,
        password: bookingRef.meetingPassword as string,
        url: bookingRef.meetingUrl as string,
      });
    },
  };
};

export default Huddle01VideoApiAdapter;
