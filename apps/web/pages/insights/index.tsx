import { getLayout } from "@timely/features/MainLayout";
import { getFeatureFlagMap } from "@timely/features/flags/server/utils";
import {
  AverageEventDurationChart,
  BookingKPICards,
  BookingStatusLineChart,
  LeastBookedTeamMembersTable,
  MostBookedTeamMembersTable,
  PopularEventsTable,
} from "@timely/features/insights/components";
import { FiltersProvider } from "@timely/features/insights/context/FiltersProvider";
import { Filters } from "@timely/features/insights/filters";
import { ShellMain } from "@timely/features/shell/Shell";
import { UpgradeTip } from "@timely/features/tips";
import { WEBAPP_URL } from "@timely/lib/constants";
import { useLocale } from "@timely/lib/hooks/useLocale";
import { trpc } from "@timely/trpc";
import { Button, ButtonGroup } from "@timely/ui";
import { RefreshCcw, UserPlus, Users } from "@timely/ui/components/icon";

import PageWrapper from "@components/PageWrapper";

export default function InsightsPage() {
  const { t } = useLocale();
  const { data: user } = trpc.viewer.me.useQuery();

  const features = [
    {
      icon: <Users className="h-5 w-5" />,
      title: t("view_bookings_across"),
      description: t("view_bookings_across_description"),
    },
    {
      icon: <RefreshCcw className="h-5 w-5" />,
      title: t("identify_booking_trends"),
      description: t("identify_booking_trends_description"),
    },
    {
      icon: <UserPlus className="h-5 w-5" />,
      title: t("spot_popular_event_types"),
      description: t("spot_popular_event_types_description"),
    },
  ];

  return (
    <div>
      <ShellMain heading="Insights" subtitle={t("insights_subtitle")}>
          {!user ? (
            <></>
          ) : (
            <FiltersProvider>
              <Filters />

              <div className="mb-4 space-y-4">
                <BookingKPICards />

                <BookingStatusLineChart />

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <PopularEventsTable />

                  <AverageEventDurationChart />
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <MostBookedTeamMembersTable />
                  <LeastBookedTeamMembersTable />
                </div>
              </div>
            </FiltersProvider>
          )}
      </ShellMain>
    </div>
  );
}

InsightsPage.PageWrapper = PageWrapper;
InsightsPage.getLayout = getLayout;

// If feature flag is disabled, return not found on getServerSideProps
export const getServerSideProps = async () => {
  const prisma = await import("@timely/prisma").then((mod) => mod.default);
  const flags = await getFeatureFlagMap(prisma);

  if (flags.insights === false) {
    return {
      notFound: true,
    };
  }

  return {
    props: {},
  };
};
