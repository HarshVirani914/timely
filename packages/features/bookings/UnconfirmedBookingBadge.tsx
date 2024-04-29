import { useLocale } from "@timely/lib/hooks/useLocale";
import { trpc } from "@timely/trpc/react";
import { Badge } from "@timely/ui";
import Link from "next/link";

export default function UnconfirmedBookingBadge() {
  const { t } = useLocale();
  const { data: unconfirmedBookingCount } = trpc.viewer.bookingUnconfirmedCount.useQuery();
  if (!unconfirmedBookingCount) return null;
  return (
    <Link href="/bookings/unconfirmed">
      <Badge
        rounded
        title={t("unconfirmed_bookings_tooltip")}
        variant="orange"
        className="cursor-pointer hover:bg-orange-800 hover:text-orange-100">
        {unconfirmedBookingCount}
      </Badge>
    </Link>
  );
}
