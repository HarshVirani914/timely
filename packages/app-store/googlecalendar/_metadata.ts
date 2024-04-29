import { validJson } from "@timely/lib/jsonUtils";
import type { AppMeta } from "@timely/types/App";

import _package from "./package.json";

export const metadata = {
  name: "Google Calendar",
  description: _package.description,
  installed: !!(process.env.GOOGLE_API_CREDENTIALS && validJson(process.env.GOOGLE_API_CREDENTIALS)),
  type: "google_calendar",
  title: "Google Calendar",
  variant: "calendar",
  category: "calendar",
  categories: ["calendar"],
  logo: "icon.svg",
  publisher: "Timely",
  slug: "google-calendar",
  url: "https://timely/",
  email: "help@timely",
  dirName: "googlecalendar",
} as AppMeta;

export default metadata;
