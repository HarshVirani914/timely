import type { MembershipRole } from "@timely/prisma/enums";

export interface NewTeamFormValues {
  name: string;
  slug: string;
  temporarySlug: string;
  logo: string;
}

export interface PendingMember {
  name: string | null;
  email: string;
  id?: number;
  username: string | null;
  role: MembershipRole;
  avatar: string | null;
  sendInviteEmail?: boolean;
}
