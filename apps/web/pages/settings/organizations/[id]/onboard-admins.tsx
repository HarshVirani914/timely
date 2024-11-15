import type { AppProps as NextAppProps } from "next/app";

import { AddNewOrgAdminsForm } from "@timely/features/ee/organizations/components";
import { useLocale } from "@timely/lib/hooks/useLocale";
import { Meta, WizardLayout } from "@timely/ui";

import PageWrapper from "@components/PageWrapper";

export { getServerSideProps } from "@timely/features/ee/organizations/pages/organization";

const OnboardTeamMembersPage = () => {
  const { t } = useLocale();

  return (
    <>
      <Meta
        title={t("invite_organization_admins")}
        description={t("invite_organization_admins_description")}
      />
      <AddNewOrgAdminsForm />
    </>
  );
};

OnboardTeamMembersPage.getLayout = (page: React.ReactElement, router: NextAppProps["router"]) => (
  <WizardLayout
    currentStep={4}
    maxSteps={5}
    isOptionalCallback={() => {
      router.push(`/settings/organizations/${router.query.id}/add-teams`);
    }}>
    {page}
  </WizardLayout>
);

OnboardTeamMembersPage.PageWrapper = PageWrapper;

export default OnboardTeamMembersPage;
