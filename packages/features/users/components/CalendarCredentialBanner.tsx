import { useLocale } from "@timely/lib/hooks/useLocale";
import { type RouterOutputs } from "@timely/trpc";
import { TopBanner } from "@timely/ui";
import Link from "next/link";

export type CalendarCredentialBannerProps = {
  data: RouterOutputs["viewer"]["getUserTopBanners"]["calendarCredentialBanner"];
};

function CalendarCredentialBanner({ data }: CalendarCredentialBannerProps) {
  const { t } = useLocale();

  if (!data) return null;

  return (
    <>
      <TopBanner
        text={`${t("something_went_wrong")} ${t("calendar_error")}`}
        variant="error"
        actions={
          <Link href="/apps/installed/calendar" className="border-b border-b-black">
            {t("check_here")}
          </Link>
        }
      />
    </>
  );
}

export default CalendarCredentialBanner;
