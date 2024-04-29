import { AboutOrganizationForm } from "@timely/features/ee/organizations/components";
import { useLocale } from "@timely/lib/hooks/useLocale";
import { Meta, WizardLayout } from "@timely/ui";

import PageWrapper from "@components/PageWrapper";

export { getServerSideProps } from "@timely/features/ee/organizations/pages/organization";

const AboutOrganizationPage = () => {
  const { t } = useLocale();
  return (
    <>
      <Meta title={t("about_your_organization")} description={t("about_your_organization_description")} />
      <AboutOrganizationForm />
    </>
  );
};
const LayoutWrapper = (page: React.ReactElement) => {
  return (
    <WizardLayout currentStep={3} maxSteps={5}>
      {page}
    </WizardLayout>
  );
};

AboutOrganizationPage.getLayout = LayoutWrapper;
AboutOrganizationPage.PageWrapper = PageWrapper;

export default AboutOrganizationPage;
