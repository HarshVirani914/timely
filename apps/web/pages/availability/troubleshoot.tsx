import { Troubleshooter } from "@timely/features/troubleshooter/Troubleshooter";
import { getLayout } from "@timely/features/troubleshooter/layout";
import { useLocale } from "@timely/lib/hooks/useLocale";
import { HeadSeo } from "@timely/ui";

import PageWrapper from "@components/PageWrapper";

function TroubleshooterPage() {
  const { t } = useLocale();
  return (
    <>
      <HeadSeo title={t("troubleshoot")} description={t("troubleshoot_availability")} />
      <Troubleshooter month={null} />
    </>
  );
}

TroubleshooterPage.getLayout = getLayout;
TroubleshooterPage.PageWrapper = PageWrapper;
export default TroubleshooterPage;
