"use client";

import type { GetServerSidePropsContext } from "next";

import { getLayout } from "@timely/features/MainLayout";
import { getServerSession } from "@timely/features/auth/lib/getServerSession";
import { TeamsListing } from "@timely/features/ee/teams/components";
import { ShellMain } from "@timely/features/shell/Shell";
import { WEBAPP_URL } from "@timely/lib/constants";
import { useLocale } from "@timely/lib/hooks/useLocale";
import { trpc } from "@timely/trpc/react";
import { Button } from "@timely/ui";
import { Plus } from "@timely/ui/components/icon";

import PageWrapper from "@components/PageWrapper";

import { ssrInit } from "@server/lib/ssr";

function Teams() {
  const { t } = useLocale();
  const [user] = trpc.viewer.me.useSuspenseQuery();

  return (
    <ShellMain
      heading={t("teams")}
      hideHeadingOnMobile
      subtitle={t("create_manage_teams_collaborative")}
      CTA={
        (!user.organizationId || user.organization.isOrgAdmin) && (
          <Button
            data-testid="new-team-btn"
            variant="fab"
            StartIcon={Plus}
            type="button"
            href={`${WEBAPP_URL}/settings/teams/new?returnTo=${WEBAPP_URL}/teams`}>
            {t("new")}
          </Button>
        )
      }>
      <TeamsListing />
    </ShellMain>
  );
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const ssr = await ssrInit(context);
  await ssr.viewer.me.prefetch();
  const session = await getServerSession({ req: context.req, res: context.res });
  const token = Array.isArray(context.query?.token) ? context.query.token[0] : context.query?.token;

  const callbackUrl = token ? `/teams?token=${encodeURIComponent(token)}` : null;

  if (!session) {
    return {
      redirect: {
        destination: callbackUrl ? `/auth/login?callbackUrl=${callbackUrl}` : "/auth/login",
        permanent: false,
      },
      props: {},
    };
  }

  return { props: { trpcState: ssr.dehydrate() } };
};

Teams.requiresLicense = false;
Teams.PageWrapper = PageWrapper;
Teams.getLayout = getLayout;
export default Teams;
