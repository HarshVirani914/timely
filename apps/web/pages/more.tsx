import Shell, { MobileNavigationMoreItems } from "@timely/features/shell/Shell";
import { useLocale } from "@timely/lib/hooks/useLocale";

import PageWrapper from "@components/PageWrapper";

export default function MorePage() {
  const { t } = useLocale();
  return (
    <Shell hideHeadingOnMobile>
      <div className="max-w-screen-lg">
        <MobileNavigationMoreItems />
        <p className="text-subtle mt-6 text-xs leading-tight md:hidden">{t("more_page_footer")}</p>
      </div>
    </Shell>
  );
}
MorePage.PageWrapper = PageWrapper;
