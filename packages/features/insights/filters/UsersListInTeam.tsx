import {
  FilterCheckboxField,
  FilterCheckboxFieldsContainer,
} from "@timely/features/filters/components/TeamsFilter";
import { useBookerUrl } from "@timely/lib/hooks/useBookerUrl";
import { useLocale } from "@timely/lib/hooks/useLocale";
import type { RouterOutputs } from "@timely/trpc";
import { trpc } from "@timely/trpc";
import { AnimatedPopover, Avatar } from "@timely/ui";

import { useFilterContext } from "../context/provider";

type User = RouterOutputs["viewer"]["insights"]["userList"][number];
type Option = { value: number; label: string; username: string | null };

const mapUserToOption = (user: User): Option => ({
  value: user.id,
  label: user.name ?? user.email, // every user should have at least email
  username: user.username,
});

export const UserListInTeam = () => {
  const { t } = useLocale();
  const bookerUrl = useBookerUrl();
  const { filter, setConfigFilters } = useFilterContext();
  const { selectedFilter, selectedTeamId, selectedMemberUserId, isAll } = filter;
  const { data, isSuccess } = trpc.viewer.insights.userList.useQuery({
    teamId: selectedTeamId ?? -1,
    isAll: !!isAll,
  });

  if (!selectedFilter?.includes("user")) return null;
  if (!selectedTeamId) return null;

  const userListOptions = data?.map(mapUserToOption);
  const selectedTeamUser = data?.find((item) => item.id === selectedMemberUserId);
  const userValue = selectedTeamUser ? mapUserToOption(selectedTeamUser) : null;

  if (!isSuccess || data?.length === 0) return null;

  const getTextForPopover = () => {
    if (userValue?.label) {
      return `${t("people")}: ${userValue.label}`;
    }
    return t("people");
  };

  return (
    <AnimatedPopover text={getTextForPopover()}>
      <FilterCheckboxFieldsContainer>
        {userListOptions?.map((member) => (
          <FilterCheckboxField
            key={member.value}
            id={member?.value?.toString()}
            label={member?.label ?? member.username ?? "No Name"}
            checked={userValue?.value === member?.value}
            onChange={(e) => {
              if (e.target.checked) {
                setConfigFilters({
                  selectedMemberUserId: member.value,
                });
              } else if (!e.target.checked) {
                setConfigFilters({
                  selectedMemberUserId: undefined,
                });
              }
            }}
            icon={
              <Avatar
                alt={`${member?.value} avatar`}
                imageSrc={member.username ? `${bookerUrl}/${member.username}/avatar.png` : undefined}
                size="xs"
              />
            }
          />
        ))}
        {userListOptions?.length === 0 && (
          <h2 className="text-default px-4 py-2 text-sm font-medium">{t("no_options_available")}</h2>
        )}
      </FilterCheckboxFieldsContainer>
    </AnimatedPopover>
  );
};
