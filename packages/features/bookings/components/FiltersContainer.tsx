import { useAutoAnimate } from "@formkit/auto-animate/react";
import { PeopleFilter } from "@timely/features/bookings/components/PeopleFilter";
import { useFilterQuery } from "@timely/features/bookings/lib/useFilterQuery";
import { TeamsFilter } from "@timely/features/filters/components/TeamsFilter";
import { useLocale } from "@timely/lib/hooks/useLocale";
import { Tooltip, Button } from "@timely/ui";

import { EventTypeFilter } from "./EventTypeFilter";

export interface FiltersContainerProps {
  isFiltersVisible: boolean;
}

export function FiltersContainer({ isFiltersVisible }: FiltersContainerProps) {
  const [animationParentRef] = useAutoAnimate<HTMLDivElement>();
  const { removeAllQueryParams } = useFilterQuery();
  const { t } = useLocale();

  return (
    <div ref={animationParentRef}>
      {isFiltersVisible ? (
        <div className="no-scrollbar flex w-full space-x-2 overflow-x-scroll rtl:space-x-reverse">
          <PeopleFilter />
          <EventTypeFilter />
          <TeamsFilter />
          <Tooltip content={t("remove_filters")}>
            <Button
              color="secondary"
              type="button"
              onClick={() => {
                removeAllQueryParams();
              }}>
              {t("remove_filters")}
            </Button>
          </Tooltip>
        </div>
      ) : null}
    </div>
  );
}
