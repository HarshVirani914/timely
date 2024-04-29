import getLabelValueMapFromResponses from "@timely/lib/getLabelValueMapFromResponses";
import type { CalendarEvent } from "@timely/types/Calendar";
import type { TFunction } from "next-i18next";

import { Info } from "./Info";

export function UserFieldsResponses(props: { calEvent: CalendarEvent; t: TFunction }) {
  const { t } = props;
  const labelValueMap = getLabelValueMapFromResponses(props.calEvent);

  if (!labelValueMap) return null;
  return (
    <>
      {Object.keys(labelValueMap).map((key) =>
        labelValueMap[key] !== "" ? (
          <Info
            key={key}
            label={key}
            description={
              typeof labelValueMap[key] === "boolean"
                ? labelValueMap[key]
                  ? t("yes")
                  : t("no")
                : `${labelValueMap[key] ? labelValueMap[key] : ""}`
            }
            withSpacer
          />
        ) : null
      )}
    </>
  );
}
