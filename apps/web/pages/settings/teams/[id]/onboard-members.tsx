import Head from "next/head";

import AddNewTeamMembers from "@timely/features/ee/teams/components/AddNewTeamMembers";
import { useLocale } from "@timely/lib/hooks/useLocale";
import { WizardLayout } from "@timely/ui";

import PageWrapper from "@components/PageWrapper";

const OnboardTeamMembersPage = () => {
  const { t } = useLocale();
  return (
    <>
      <Head>
        <title>{t("add_team_members")}</title>
        <meta name="description" content={t("add_team_members_description")} />
      </Head>
      <AddNewTeamMembers />
    </>
  );
};

OnboardTeamMembersPage.getLayout = (page: React.ReactElement) => (
  <WizardLayout currentStep={2} maxSteps={2}>
    {page}
  </WizardLayout>
);

OnboardTeamMembersPage.PageWrapper = PageWrapper;

export default OnboardTeamMembersPage;
