import LicenseRequired from "@timely/features/ee/common/components/LicenseRequired";
import Shell from "@timely/features/shell/Shell";
import { useLocale } from "@timely/lib/hooks/useLocale";
import { HeadSeo } from "@timely/ui";

import type { AppPageProps } from "./AppPage";
import { AppPage } from "./AppPage";

const ShellHeading = () => {
  const { t } = useLocale();
  return <span className="block py-2">{t("app_store")}</span>;
};

export default function WrappedApp(props: AppPageProps) {
  return (
    <Shell smallHeading isPublic hideHeadingOnMobile heading={<ShellHeading />} backPath="/apps" withoutSeo>
      <HeadSeo
        title={props.name}
        description={props.description}
        app={{ slug: props.logo, name: props.name, description: props.description }}
      />
      {props.licenseRequired ? (
        <LicenseRequired>
          <AppPage {...props} />
        </LicenseRequired>
      ) : (
        <AppPage {...props} />
      )}
    </Shell>
  );
}
