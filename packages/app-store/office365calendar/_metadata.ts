import type { AppMeta } from "@timely/types/App";

import _package from "./package.json";

export const metadata = {
  name: "Outlook Calendar",
  description: _package.description,
  type: "office365_calendar",
  title: "Outlook Calendar",
  variant: "calendar",
  category: "calendar",
  categories: ["calendar"],
  logo: "icon.svg",
  publisher: "Timely",
  slug: "office365-calendar",
  dirName: "office365calendar",
  url: "https://timely/",
  email: "help@timely",
} as AppMeta;

export default metadata;
