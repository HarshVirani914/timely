import { type TFunction } from "i18next";
import { headers } from "next/headers";

import { constructGenericImage } from "@timely/lib/OgImages";
import { IS_CALCOM, WEBAPP_URL, APP_NAME, SEO_IMG_OGIMG } from "@timely/lib/constants";
import { getFixedT } from "@timely/lib/server/getFixedT";

import { preparePageMetadata } from "@lib/metadata";

export const _generateMetadata = async (
  getTitle: (t: TFunction<string, undefined>) => string,
  getDescription: (t: TFunction<string, undefined>) => string
) => {
  const h = headers();
  const canonical = h.get("x-pathname") ?? "";
  const locale = h.get("x-locale") ?? "en";

  const t = await getFixedT(locale, "common");

  const title = getTitle(t);
  const description = getDescription(t);

  const metadataBase = new URL(IS_CALCOM ? "https://timely" : WEBAPP_URL);

  const image =
    SEO_IMG_OGIMG +
    constructGenericImage({
      title,
      description,
    });

  return preparePageMetadata({
    title,
    canonical,
    image,
    description,
    siteName: APP_NAME,
    metadataBase,
  });
};
