import { useAppContextWithSchema } from "@timely/app-store/EventTypeAppContext";
import AppCard from "@timely/app-store/_components/AppCard";
import useIsAppEnabled from "@timely/app-store/_utils/useIsAppEnabled";
import { SelectGifInput } from "@timely/app-store/giphy/components";
import type { EventTypeAppCardComponent } from "@timely/app-store/types";
import { useLocale } from "@timely/lib/hooks/useLocale";

import type { appDataSchema } from "../zod";

const EventTypeAppCard: EventTypeAppCardComponent = function EventTypeAppCard({ app, eventType }) {
  const { getAppData, setAppData, disabled } = useAppContextWithSchema<typeof appDataSchema>();
  const thankYouPage = getAppData("thankYouPage");
  const { enabled: showGifSelection, updateEnabled: setShowGifSelection } = useIsAppEnabled(app);

  const { t } = useLocale();

  return (
    <AppCard
      app={app}
      description={t("confirmation_page_gif")}
      switchOnClick={(e) => {
        setShowGifSelection(e);
      }}
      switchChecked={showGifSelection}
      teamId={eventType.team?.id || undefined}>
      {showGifSelection && (
        <SelectGifInput
          defaultValue={thankYouPage}
          disabled={disabled}
          onChange={(url: string) => {
            setAppData("thankYouPage", url);
          }}
        />
      )}
    </AppCard>
  );
};

export default EventTypeAppCard;
