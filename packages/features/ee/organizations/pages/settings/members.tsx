import LicenseRequired from "@timely/features/ee/common/components/LicenseRequired";
import { getLayout } from "@timely/features/settings/layouts/SettingsLayout";
import { UserListTable } from "@timely/features/users/components/UserTable/UserListTable";
import { useLocale } from "@timely/lib/hooks/useLocale";
import { Meta } from "@timely/ui";

const MembersView = () => {
  const { t } = useLocale();

  return (
    <LicenseRequired>
      <Meta title={t("organization_members")} description={t("organization_description")} />
      <div>
        <UserListTable />
      </div>
    </LicenseRequired>
  );
};
MembersView.getLayout = getLayout;

export default MembersView;
