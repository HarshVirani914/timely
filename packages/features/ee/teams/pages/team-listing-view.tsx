import { useLocale } from "@timely/lib/hooks/useLocale";
import { Meta } from "@timely/ui";

import { getLayout } from "../../../settings/layouts/SettingsLayout";
import { TeamsListing } from "../components";

const TeamListingView = () => {
  const { t } = useLocale();
  return (
    <>
      <Meta title={t("teams")} description={t("create_manage_teams_collaborative")} />
      <TeamsListing />
    </>
  );
};

TeamListingView.getLayout = getLayout;

export default TeamListingView;
