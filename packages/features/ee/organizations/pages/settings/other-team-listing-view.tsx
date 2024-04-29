import { useLocale } from "@timely/lib/hooks/useLocale";
import { Meta } from "@timely/ui";

import { getLayout } from "../../../../settings/layouts/SettingsLayout";
import { OtherTeamsListing } from "./../components/OtherTeamsListing";

const OtherTeamListingView = (): React.ReactElement => {
  const { t } = useLocale();
  return (
    <>
      <Meta title={t("org_admin_other_teams")} description={t("org_admin_other_teams_description")} />
      <OtherTeamsListing />
    </>
  );
};

OtherTeamListingView.getLayout = getLayout;

export default OtherTeamListingView;
