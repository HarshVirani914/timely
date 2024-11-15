import { getServerSession } from "@timely/features/auth/lib/getServerSession";
import { getFeatureFlagMap } from "@timely/features/flags/server/utils";
import { MembershipRole } from "@timely/prisma/client";
import type { GetServerSidePropsContext } from "next";

export const getServerSideProps = async ({ req, res }: GetServerSidePropsContext) => {
  const prisma = await import("@timely/prisma").then((mod) => mod.default);
  const flags = await getFeatureFlagMap(prisma);
  // Check if organizations are enabled
  if (flags["organizations"] !== true) {
    return {
      notFound: true,
    };
  }

  // Check if logged in user has an organization assigned
  const session = await getServerSession({ req, res });
  if (!session?.user.org?.id) {
    return {
      notFound: true,
    };
  }

  // Check if logged in user has OWNER/ADMIN role in organization
  const membership = await prisma.membership.findFirst({
    where: {
      userId: session?.user.id,
      teamId: session?.user.org.id,
    },
    select: {
      role: true,
    },
  });
  if (!membership?.role || membership?.role === MembershipRole.MEMBER) {
    return {
      notFound: true,
    };
  }

  // Otherwise, all good
  return {
    props: {},
  };
};
