import type { AppMeta } from "@timely/types/App";

import _package from "./package.json";

export const metadata = {
  name: "Jitsi Video",
  description: _package.description,
  installed: true,
  type: "jitsi_video",
  variant: "conferencing",
  categories: ["conferencing"],
  logo: "icon.svg",
  publisher: "Timely",
  url: "https://jitsi.org/",
  slug: "jitsi",
  title: "Jitsi Meet",
  isGlobal: false,
  email: "help@timely",
  appData: {
    location: {
      linkType: "dynamic",
      type: "integrations:jitsi",
      label: "Jitsi Video",
    },
  },
  dirName: "jitsivideo",
  concurrentMeetings: true,
} as AppMeta;

export default metadata;
