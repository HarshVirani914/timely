import type { AppMeta } from "@timely/types/App";

import _package from "./package.json";

export const metadata = {
  name: "Giphy",
  description: _package.description,
  installed: true,
  categories: ["other"],
  logo: "icon.svg",
  publisher: "Timely",
  slug: "giphy",
  title: "Giphy",
  type: "giphy_other",
  url: "https://timely/apps/giphy",
  variant: "other",
  extendsFeature: "EventType",
  email: "help@timely",
  dirName: "giphy",
} as AppMeta;

export default metadata;
