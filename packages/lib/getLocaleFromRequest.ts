/* eslint-disable @typescript-eslint/no-var-requires */
import { getServerSession } from "@timely/features/auth/lib/getServerSession";
import type { Maybe } from "@timely/trpc/server";
import parser from "accept-language-parser";
import type { GetServerSidePropsContext, NextApiRequest } from "next";

const { i18n } = require("@timely/config/next-i18next.config");

export async function getLocaleFromRequest(
  req: NextApiRequest | GetServerSidePropsContext["req"]
): Promise<string> {
  const session = await getServerSession({ req });
  if (session?.user?.locale) return session.user.locale;
  let preferredLocale: string | null | undefined;
  if (req.headers["accept-language"]) {
    preferredLocale = parser.pick(i18n.locales, req.headers["accept-language"], {
      loose: true,
    }) as Maybe<string>;
  }
  return preferredLocale ?? i18n.defaultLocale;
}
