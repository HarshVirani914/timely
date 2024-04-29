import { eventTypeAppCardZod } from "@timely/app-store/eventTypeAppCardZod";
import { z } from "zod";

export const appDataSchema = eventTypeAppCardZod.merge(
  z.object({
    isSunrise: z.boolean(),
  })
);
export const appKeysSchema = z.object({});
