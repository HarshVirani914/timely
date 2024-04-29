import type { DateRange } from "@timely/lib/date-ranges";
import { intersect } from "@timely/lib/date-ranges";
import { SchedulingType } from "@timely/prisma/enums";

import { mergeOverlappingDateRanges } from "./date-range-utils/mergeOverlappingDateRanges";

export const getAggregatedAvailability = (
  userAvailability: { dateRanges: DateRange[]; user?: { isFixed?: boolean } }[],
  schedulingType: SchedulingType | null
): DateRange[] => {
  const fixedHosts = userAvailability.filter(
    ({ user }) => !schedulingType || schedulingType === SchedulingType.COLLECTIVE || user?.isFixed
  );

  const dateRangesToIntersect = fixedHosts.map((s) => s.dateRanges);

  const unfixedHosts = userAvailability.filter(({ user }) => user?.isFixed !== true);
  if (unfixedHosts.length) {
    dateRangesToIntersect.push(unfixedHosts.flatMap((s) => s.dateRanges));
  }

  const availability = intersect(dateRangesToIntersect);

  return mergeOverlappingDateRanges(availability);
};
