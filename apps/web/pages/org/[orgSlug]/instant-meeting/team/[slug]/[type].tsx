import type { GetServerSidePropsContext } from "next";
import { z } from "zod";

import { Booker } from "@timely/atoms";
import { getBookerWrapperClasses } from "@timely/features/bookings/Booker/utils/getBookerWrapperClasses";
import { BookerSeo } from "@timely/features/bookings/components/BookerSeo";
import { getMultipleDurationValue } from "@timely/features/bookings/lib/get-booking";
import { getSlugOrRequestedSlug } from "@timely/features/ee/organizations/lib/orgDomains";
import { orgDomainConfig } from "@timely/features/ee/organizations/lib/orgDomains";
import slugify from "@timely/lib/slugify";
import prisma from "@timely/prisma";

import type { inferSSRProps } from "@lib/types/inferSSRProps";
import type { EmbedProps } from "@lib/withEmbedSsr";

import PageWrapper from "@components/PageWrapper";

export type PageProps = inferSSRProps<typeof getServerSideProps> & EmbedProps;

export default function Type({
  slug,
  user,
  booking,
  away,
  isEmbed,
  isBrandingHidden,
  entity,
  duration,
}: PageProps) {
  return (
    <main className={getBookerWrapperClasses({ isEmbed: !!isEmbed })}>
      <BookerSeo
        username={user}
        eventSlug={slug}
        rescheduleUid={undefined}
        hideBranding={isBrandingHidden}
        isTeamEvent
        entity={entity}
        bookingData={booking}
      />
      <Booker
        username={user}
        eventSlug={slug}
        bookingData={booking}
        isAway={away}
        hideBranding={isBrandingHidden}
        isTeamEvent
        isInstantMeeting
        entity={entity}
        duration={duration}
      />
    </main>
  );
}

const paramsSchema = z.object({
  type: z.string().transform((s) => slugify(s)),
  slug: z.string().transform((s) => slugify(s)),
});

Type.PageWrapper = PageWrapper;
Type.isBookingPage = true;

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const { slug: teamSlug, type: meetingSlug } = paramsSchema.parse(context.params);
  const { duration: queryDuration } = context.query;
  const { ssrInit } = await import("@server/lib/ssr");
  const ssr = await ssrInit(context);
  const { currentOrgDomain, isValidOrgDomain } = orgDomainConfig(context.req, context.params?.orgSlug);

  const team = await prisma.team.findFirst({
    where: {
      ...getSlugOrRequestedSlug(teamSlug),
      parent: isValidOrgDomain && currentOrgDomain ? getSlugOrRequestedSlug(currentOrgDomain) : null,
    },
    select: {
      id: true,
      hideBranding: true,
    },
  });

  if (!team) {
    return {
      notFound: true,
    } as const;
  }

  const org = isValidOrgDomain ? currentOrgDomain : null;

  const eventData = await ssr.viewer.public.event.fetch({
    username: teamSlug,
    eventSlug: meetingSlug,
    isTeamEvent: true,
    org,
  });

  if (!eventData || !org) {
    return {
      notFound: true,
    } as const;
  }

  return {
    props: {
      entity: eventData.entity,
      duration: getMultipleDurationValue(
        eventData.metadata?.multipleDuration,
        queryDuration,
        eventData.length
      ),
      booking: null,
      away: false,
      user: teamSlug,
      teamId: team.id,
      slug: meetingSlug,
      trpcState: ssr.dehydrate(),
      isBrandingHidden: team?.hideBranding,
      themeBasis: null,
    },
  };
};
