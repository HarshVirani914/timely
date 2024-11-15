import Head from "next/head";

import { CreateANewTeamForm } from "@timely/features/ee/teams/components";
import { useLocale } from "@timely/lib/hooks/useLocale";
import { WizardLayout } from "@timely/ui";

import PageWrapper from "@components/PageWrapper";

const CreateNewTeamPage = () => {
  const { t } = useLocale();
  return (
    <>
      <Head>
        <title>{t("create_new_team")}</title>
        <meta name="description" content={t("create_new_team_description")} />
      </Head>
      <CreateANewTeamForm />
    </>
  );
};
const LayoutWrapper = (page: React.ReactElement) => {
  return (
    <WizardLayout currentStep={1} maxSteps={2}>
      {page}
    </WizardLayout>
  );
};

CreateNewTeamPage.getLayout = LayoutWrapper;
CreateNewTeamPage.PageWrapper = PageWrapper;

export default CreateNewTeamPage;
