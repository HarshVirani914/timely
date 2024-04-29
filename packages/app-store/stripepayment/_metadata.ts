import type { AppMeta } from "@timely/types/App";

import _package from "./package.json";

export const metadata = {
  name: "Stripe",
  description: _package.description,
  installed: !!(
    process.env.STRIPE_CLIENT_ID &&
    process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY &&
    process.env.STRIPE_PRIVATE_KEY
  ),
  slug: "stripe",
  category: "payment",
  categories: ["payment"],
  logo: "icon.svg",
  publisher: "Timely",
  title: "Stripe",
  type: "stripe_payment",
  url: "https://timely/",
  docsUrl: "https://stripe.com/docs",
  variant: "payment",
  extendsFeature: "EventType",
  email: "help@timely",
  dirName: "stripepayment",
} as AppMeta;

export default metadata;
