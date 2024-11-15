import type { EventType } from "@prisma/client";
import type { PaymentPageProps } from "@timely/ee/payments/pages/payment";
import type { BookingResponse } from "@timely/features/bookings/types";
import { useCompatSearchParams } from "@timely/lib/hooks/useCompatSearchParams";
import { useRouter } from "next/navigation";

function getNewSeachParams(args: {
  query: Record<string, string | null | undefined | boolean>;
  searchParams?: URLSearchParams;
}) {
  const { query, searchParams } = args;
  const newSearchParams = new URLSearchParams(searchParams);
  Object.entries(query).forEach(([key, value]) => {
    if (value === null || value === undefined) {
      return;
    }
    newSearchParams.append(key, String(value));
  });
  return newSearchParams;
}

type SuccessRedirectBookingType = Pick<
  BookingResponse | PaymentPageProps["booking"],
  "uid" | "title" | "description" | "startTime" | "endTime" | "location"
>;

export const getBookingRedirectExtraParams = (booking: SuccessRedirectBookingType) => {
  type BookingResponseKey = keyof SuccessRedirectBookingType;
  const redirectQueryParamKeys: BookingResponseKey[] = [
    "title",
    "description",
    "startTime",
    "endTime",
    "location",
  ];

  return (Object.keys(booking) as BookingResponseKey[])
    .filter((key) => redirectQueryParamKeys.includes(key))
    .reduce((obj, key) => ({ ...obj, [key]: booking[key] }), {});
};

export const useBookingSuccessRedirect = () => {
  const router = useRouter();
  const searchParams = useCompatSearchParams();
  const bookingSuccessRedirect = ({
    successRedirectUrl,
    query,
    booking,
  }: {
    successRedirectUrl: EventType["successRedirectUrl"];
    query: Record<string, string | null | undefined | boolean>;
    booking: SuccessRedirectBookingType;
  }) => {
    if (successRedirectUrl) {
      const url = new URL(successRedirectUrl);
      // Using parent ensures, Embed iframe would redirect outside of the iframe.
      const bookingExtraParams = getBookingRedirectExtraParams(booking);
      const newSearchParams = getNewSeachParams({
        query: {
          ...query,
          ...bookingExtraParams,
        },
        searchParams: searchParams ?? undefined,
      });
      window.parent.location.href = `${url.toString()}?${newSearchParams.toString()}`;
      return;
    }
    const newSearchParams = getNewSeachParams({ query });
    return router.push(`/booking/${booking.uid}?${newSearchParams.toString()}`);
  };

  return bookingSuccessRedirect;
};
