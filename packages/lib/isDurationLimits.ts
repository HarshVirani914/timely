import { intervalLimitsType } from "@timely/prisma/zod-utils";
import type { IntervalLimit } from "@timely/types/Calendar";

export function isDurationLimit(obj: unknown): obj is IntervalLimit {
  return intervalLimitsType.safeParse(obj).success;
}

export function parseDurationLimit(obj: unknown): IntervalLimit | null {
  let durationLimit: IntervalLimit | null = null;
  if (isDurationLimit(obj)) durationLimit = obj;
  return durationLimit;
}
