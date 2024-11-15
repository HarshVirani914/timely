import { useLocale } from "@timely/lib/hooks/useLocale";
import { trpc } from "@timely/trpc";
import { Title } from "@tremor/react";

import { useFilterContext } from "../context/provider";
import { CardInsights } from "./Card";
import { LoadingInsight } from "./LoadingInsights";
import { TotalBookingUsersTable } from "./TotalBookingUsersTable";

export const MostBookedTeamMembersTable = () => {
  const { t } = useLocale();
  const { filter } = useFilterContext();
  const { dateRange, selectedEventTypeId, isAll, initialConfig } = filter;
  const [startDate, endDate] = dateRange;
  const { selectedTeamId: teamId } = filter;

  const { data, isSuccess, isLoading } = trpc.viewer.insights.membersWithMostBookings.useQuery(
    {
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      teamId,
      eventTypeId: selectedEventTypeId ?? undefined,
      isAll,
    },
    {
      staleTime: 30000,
      trpc: {
        context: { skipBatch: true },
      },
      enabled: !!(initialConfig?.teamId || initialConfig?.userId || initialConfig?.isAll),
    }
  );

  if (isLoading) return <LoadingInsight />;

  if (!isSuccess || !startDate || !endDate || !teamId) return null;

  return (
    <CardInsights className="shadow-none">
      <Title className="text-emphasis">{t("most_booked_members")}</Title>
      <TotalBookingUsersTable data={data} />
    </CardInsights>
  );
};
