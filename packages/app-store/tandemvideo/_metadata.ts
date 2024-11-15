import type { AppMeta } from "@timely/types/App";

import _package from "./package.json";

export const metadata = {
  name: "Tandem Video",
  description: _package.description,
  type: "tandem_video",
  title: "Tandem Video",
  variant: "conferencing",
  categories: ["conferencing"],
  slug: "tandem",
  category: "conferencing",
  logo: "icon.svg",
  publisher: "",
  url: "",
  isGlobal: false,
  email: "help@timely",
  appData: {
    location: {
      linkType: "dynamic",
      type: "integrations:tandem",
      label: "Tandem Video",
    },
  },
  dirName: "tandemvideo",
} as AppMeta;

export default metadata;
