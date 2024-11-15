import type { IntervalLimit } from "@timely/types/Calendar";

import { ascendingLimitKeys } from "./intervalLimit";

export const validateIntervalLimitOrder = (input: IntervalLimit) => {
  // Sort limits by validationOrder
  const sorted = Object.entries(input)
    .sort(([, value], [, valuetwo]) => {
      return value - valuetwo;
    })
    .map(([key]) => key);

  const validationOrderWithoutMissing = ascendingLimitKeys.filter((key) => sorted.includes(key));

  return sorted.every((key, index) => validationOrderWithoutMissing[index] === key);
};
