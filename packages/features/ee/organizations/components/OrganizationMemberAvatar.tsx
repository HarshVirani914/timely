import classNames from "@timely/lib/classNames";
import { getOrgAvatarUrl } from "@timely/lib/getAvatarUrl";
// import { Avatar } from "@timely/ui";
import { UserAvatar } from "@timely/web/components/ui/avatar/UserAvatar";

type OrganizationMemberAvatarProps = React.ComponentProps<typeof UserAvatar> & {
  organization: {
    id: number;
    slug: string | null;
    requestedSlug: string | null;
  } | null;
};

/**
 * Shows the user's avatar along with a small organization's avatar
 */
const OrganizationMemberAvatar = ({
  size,
  user,
  organization,
  previewSrc,
  ...rest
}: OrganizationMemberAvatarProps) => {
  return (
    <UserAvatar
      data-testid="organization-avatar"
      size={size}
      user={user}
      previewSrc={previewSrc}
      indicator={
        organization ? (
          <div
            className={classNames("absolute bottom-0 right-0 z-10", size === "lg" ? "h-6 w-6" : "h-10 w-10")}>
            <img
              src={getOrgAvatarUrl(organization)}
              alt={user.username || ""}
              className="flex h-full items-center justify-center rounded-full"
            />
          </div>
        ) : null
      }
      {...rest}
    />
  );
};

export default OrganizationMemberAvatar;
