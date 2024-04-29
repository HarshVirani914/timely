import type { AppMeta } from "@timely/types/App";

import _package from "./package.json";

export const metadata = {
  name: "Cal Video",
  description: _package.description,
  installed: !!process.env.DAILY_API_KEY,
  type: "daily_video",
  variant: "conferencing",
  url: "https://daily.co",
  categories: ["conferencing"],
  logo: "icon.svg",
  publisher: "Timely",
  category: "conferencing",
  slug: "daily-video",
  title: "Cal Video",
  isGlobal: true,
  email: "help@timely",
  appData: {
    location: {
      linkType: "dynamic",
      type: "integrations:daily",
      label: "Cal Video",
    },
  },
  key: { apikey: process.env.DAILY_API_KEY },
  dirName: "dailyvideo",
} as AppMeta;

export default metadata;
