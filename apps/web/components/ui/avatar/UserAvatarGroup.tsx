import { CAL_URL } from "@timely/lib/constants";
import { getUserAvatarUrl } from "@timely/lib/getAvatarUrl";
import type { User } from "@timely/prisma/client";
import { AvatarGroup } from "@timely/ui";

type UserAvatarProps = Omit<React.ComponentProps<typeof AvatarGroup>, "items"> & {
  users: Pick<User, "organizationId" | "name" | "username">[];
};
export function UserAvatarGroup(props: UserAvatarProps) {
  const { users, ...rest } = props;
  return (
    <AvatarGroup
      {...rest}
      items={users.map((user) => ({
        href: `${CAL_URL}/${user.username}?redirect=false`,
        alt: user.name || "",
        title: user.name || "",
        image: getUserAvatarUrl(user),
      }))}
    />
  );
}
