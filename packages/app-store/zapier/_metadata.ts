import type { AppMeta } from "@timely/types/App";

import _package from "./package.json";

export const metadata = {
  name: "Zapier",
  description: _package.description,
  installed: true,
  category: "automation",
  categories: ["automation"],
  logo: "icon.svg",
  publisher: "Timely",
  slug: "zapier",
  title: "Zapier",
  type: "zapier_automation",
  url: "https://timely/apps/zapier",
  variant: "automation",
  email: "help@timely",
  dirName: "zapier",
} as AppMeta;

export default metadata;
