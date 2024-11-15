import { useLocale } from "@timely/lib/hooks/useLocale";
import { TimeFormat } from "@timely/lib/timeFormat";
import { ToggleGroup } from "@timely/ui";

import { useTimePreferences } from "../lib";

export const TimeFormatToggle = () => {
  const timeFormat = useTimePreferences((state) => state.timeFormat);
  const setTimeFormat = useTimePreferences((state) => state.setTimeFormat);
  const { t } = useLocale();

  return (
    <ToggleGroup
      onValueChange={(newFormat) => {
        if (newFormat && newFormat !== timeFormat) setTimeFormat(newFormat as TimeFormat);
      }}
      defaultValue={timeFormat}
      value={timeFormat}
      options={[
        { value: TimeFormat.TWELVE_HOUR, label: t("12_hour_short") },
        { value: TimeFormat.TWENTY_FOUR_HOUR, label: t("24_hour_short") },
      ]}
    />
  );
};
