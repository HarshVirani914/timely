import { subdomainSuffix, getOrgFullOrigin } from "@timely/features/ee/organizations/lib/orgDomains";
import { prisma } from "@timely/prisma";
import { teamMetadataSchema } from "@timely/prisma/zod-utils";

export const getBrand = async (orgId: number | null) => {
  if (!orgId) {
    return null;
  }
  const org = await prisma.team.findFirst({
    where: {
      id: orgId,
    },
    select: {
      logo: true,
      name: true,
      slug: true,
      metadata: true,
    },
  });
  if (!org) {
    return null;
  }
  const metadata = teamMetadataSchema.parse(org.metadata);
  const slug = (org.slug || metadata?.requestedSlug) as string;
  const fullDomain = getOrgFullOrigin(slug);
  const domainSuffix = subdomainSuffix();

  return {
    ...org,
    metadata,
    slug,
    fullDomain,
    domainSuffix,
  };
};
