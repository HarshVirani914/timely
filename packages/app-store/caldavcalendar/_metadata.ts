import type { AppMeta } from "@timely/types/App";

import _package from "./package.json";

export const metadata = {
  name: "CalDav (Beta)",
  description: _package.description,
  installed: true,
  type: "caldav_calendar",
  title: "CalDav (Beta)",
  variant: "calendar",
  category: "calendar",
  categories: ["calendar"],
  logo: "icon.svg",
  publisher: "Timely",
  slug: "caldav-calendar",
  url: "https://timely/",
  email: "ali@timely",
  dirName: "caldavcalendar",
} as AppMeta;

export default metadata;
