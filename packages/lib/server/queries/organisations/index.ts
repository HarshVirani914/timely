import prisma from "@timely/prisma";
import { MembershipRole } from "@timely/prisma/enums";

// export type OrganisationWithMembers = Awaited<ReturnType<typeof getOrganizationMembers>>;

// also returns team
export async function isOrganisationAdmin(userId: number, orgId: number) {
  return (
    (await prisma.membership.findFirst({
      where: {
        userId,
        teamId: orgId,
        OR: [{ role: MembershipRole.ADMIN }, { role: MembershipRole.OWNER }],
      },
    })) || false
  );
}
export async function isOrganisationOwner(userId: number, orgId: number) {
  return !!(await prisma.membership.findFirst({
    where: {
      userId,
      teamId: orgId,
      role: MembershipRole.OWNER,
    },
  }));
}

export async function isOrganisationMember(userId: number, orgId: number) {
  return !!(await prisma.membership.findFirst({
    where: {
      userId,
      teamId: orgId,
    },
  }));
}
