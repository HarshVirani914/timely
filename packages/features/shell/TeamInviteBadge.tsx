import { useTeamInvites } from "@timely/lib/hooks/useHasPaidPlan";
import { useLocale } from "@timely/lib/hooks/useLocale";
import { Badge } from "@timely/ui";

export function TeamInviteBadge() {
  const { isLoading, listInvites } = useTeamInvites();
  const { t } = useLocale();

  if (isLoading || !listInvites || listInvites.length === 0) return null;

  return <Badge variant="default">{t("invite_team_notifcation_badge")}</Badge>;
}
