import type { App } from "@timely/types/App";

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
  email: "help@timely",
  dirName: "caldavcalendar",
} as App;

export * as api from "./api";
export * as lib from "./lib";
