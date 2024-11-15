import { useLocale } from "@timely/lib/hooks/useLocale";
import { trpc } from "@timely/trpc/react";
import type { RouterOutputs } from "@timely/trpc/react";
import { showToast, TopBanner } from "@timely/ui";
import { useRouter } from "next/navigation";

export type TeamsUpgradeBannerProps = {
  data: RouterOutputs["viewer"]["getUserTopBanners"]["teamUpgradeBanner"];
};

export function TeamsUpgradeBanner({ data }: TeamsUpgradeBannerProps) {
  const { t } = useLocale();
  const router = useRouter();

  const publishTeamMutation = trpc.viewer.teams.publish.useMutation({
    onSuccess(data) {
      router.push(data.url);
    },
    onError: (error) => {
      showToast(error.message, "error");
    },
  });

  if (!data) return null;
  const [membership] = data;
  if (!membership) return null;

  return (
    <TopBanner
      text={t("team_upgrade_banner_description", { teamName: membership.team.name })}
      variant="warning"
      actions={
        <button
          className="border-b border-b-black"
          onClick={() => {
            publishTeamMutation.mutate({ teamId: membership.team.id });
          }}>
          {t("upgrade_banner_action")}
        </button>
      }
    />
  );
}
