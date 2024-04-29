import type { AppProps as NextAppProps } from "next/app";

import { AddNewTeamsForm } from "@timely/features/ee/organizations/components";
import { useLocale } from "@timely/lib/hooks/useLocale";
import { Meta, WizardLayout } from "@timely/ui";

import PageWrapper from "@components/PageWrapper";

export { getServerSideProps } from "@timely/features/ee/organizations/pages/organization";

const AddNewTeamsPage = () => {
  const { t } = useLocale();
  return (
    <>
      <Meta title={t("create_your_teams")} description={t("create_your_teams_description")} />
      <AddNewTeamsForm />
    </>
  );
};

AddNewTeamsPage.getLayout = (page: React.ReactElement, router: NextAppProps["router"]) => (
  <>
    <WizardLayout
      currentStep={5}
      maxSteps={5}
      isOptionalCallback={() => {
        router.push(`/event-types`);
      }}>
      {page}
    </WizardLayout>
  </>
);

AddNewTeamsPage.PageWrapper = PageWrapper;

export default AddNewTeamsPage;
