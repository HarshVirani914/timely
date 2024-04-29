import type { AppMeta } from "@timely/types/App";

import _package from "./package.json";

export const metadata = {
  name: "Apple Calendar",
  description: _package.description,
  installed: true,
  type: "apple_calendar",
  title: "Apple Calendar",
  variant: "calendar",
  categories: ["calendar"],
  category: "calendar",
  logo: "icon.svg",
  publisher: "Timely",
  slug: "apple-calendar",
  url: "https://timely/",
  email: "help@timely",
  dirName: "applecalendar",
} as AppMeta;

export default metadata;
