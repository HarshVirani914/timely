import { useOrgBranding } from "@timely/features/ee/organizations/context/provider";
import { CAL_URL, WEBAPP_URL } from "@timely/lib/constants";
import { getUserAvatarUrl } from "@timely/lib/getAvatarUrl";
import type { Team, User } from "@timely/prisma/client";
import { AvatarGroup } from "@timely/ui";

type UserAvatarProps = Omit<React.ComponentProps<typeof AvatarGroup>, "items"> & {
  users: Pick<User, "organizationId" | "name" | "username">[];
  organization: Pick<Team, "slug" | "name">;
};

export function UserAvatarGroupWithOrg(props: UserAvatarProps) {
  const { users, organization, ...rest } = props;
  const orgBranding = useOrgBranding();
  const baseUrl = `${orgBranding?.fullDomain ?? CAL_URL}`;
  const items = [
    {
      href: baseUrl,
      image: `${WEBAPP_URL}/team/${organization.slug}/avatar.png`,
      alt: organization.name || undefined,
      title: organization.name,
    },
  ].concat(
    users.map((user) => {
      return {
        href: `${baseUrl}/${user.username}/?redirect=false`,
        image: getUserAvatarUrl(user),
        alt: user.name || undefined,
        title: user.name || user.username || "",
      };
    })
  );
  users.unshift();
  return <AvatarGroup {...rest} items={items} />;
}
