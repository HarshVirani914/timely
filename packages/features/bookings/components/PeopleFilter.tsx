import { useFilterQuery } from "@timely/features/bookings/lib/useFilterQuery";
import { useOrgBranding } from "@timely/features/ee/organizations/context/provider";
import {
  FilterCheckboxFieldsContainer,
  FilterCheckboxField,
} from "@timely/features/filters/components/TeamsFilter";
import { WEBAPP_URL } from "@timely/lib/constants";
import { useLocale } from "@timely/lib/hooks/useLocale";
import { trpc } from "@timely/trpc/react";
import { AnimatedPopover, Avatar, Divider, FilterSearchField } from "@timely/ui";
import { User } from "@timely/ui/components/icon";
import { useState } from "react";

export const PeopleFilter = () => {
  const { t } = useLocale();
  const orgBranding = useOrgBranding();

  const { data: query, pushItemToKey, removeItemByKeyAndValue, removeAllQueryParams } = useFilterQuery();
  const [searchText, setSearchText] = useState("");

  const members = trpc.viewer.teams.listMembers.useQuery({});

  const filteredMembers = members?.data
    ?.filter((member) => member.accepted)
    ?.filter((member) =>
      searchText.trim() !== ""
        ? member?.name?.toLowerCase()?.includes(searchText.toLowerCase()) ||
          member?.username?.toLowerCase()?.includes(searchText.toLowerCase())
        : true
    );

  const getTextForPopover = () => {
    const userIds = query.userIds;
    if (userIds) {
      return `${t("number_selected", { count: userIds.length })}`;
    }
    return `${t("all")}`;
  };

  return (
    <AnimatedPopover text={getTextForPopover()} prefix={`${t("people")}: `}>
      <FilterCheckboxFieldsContainer>
        <FilterCheckboxField
          id="all"
          icon={<User className="h-4 w-4" />}
          checked={!query.userIds?.length}
          onChange={removeAllQueryParams}
          label={t("all_users_filter_label")}
        />
        <Divider />
        <FilterSearchField onChange={(e) => setSearchText(e.target.value)} placeholder={t("search")} />
        {filteredMembers?.map((member) => (
          <FilterCheckboxField
            key={member.id}
            id={member.id.toString()}
            label={member?.name ?? member.username ?? t("no_name")}
            checked={!!query.userIds?.includes(member.id)}
            onChange={(e) => {
              if (e.target.checked) {
                pushItemToKey("userIds", member.id);
              } else if (!e.target.checked) {
                removeItemByKeyAndValue("userIds", member.id);
              }
            }}
            icon={
              <Avatar
                alt={`${member?.id} avatar`}
                imageSrc={
                  member.username
                    ? `${orgBranding?.fullDomain ?? WEBAPP_URL}/${member.username}/avatar.png`
                    : undefined
                }
                size="xs"
              />
            }
          />
        ))}
        {filteredMembers?.length === 0 && (
          <h2 className="text-default px-4 py-2 text-sm font-medium">{t("no_options_available")}</h2>
        )}
      </FilterCheckboxFieldsContainer>
    </AnimatedPopover>
  );
};
