import { useAppContextWithSchema } from "@timely/app-store/EventTypeAppContext";
import AppCard from "@timely/app-store/_components/AppCard";
import useIsAppEnabled from "@timely/app-store/_utils/useIsAppEnabled";
import type { EventTypeAppCardComponent } from "@timely/app-store/types";
import { TextField } from "@timely/ui";

import type { appDataSchema } from "../zod";

const EventTypeAppCard: EventTypeAppCardComponent = function EventTypeAppCard({ app, eventType }) {
  const { getAppData, setAppData, disabled } = useAppContextWithSchema<typeof appDataSchema>();
  const trackingId = getAppData("trackingId");
  const { enabled, updateEnabled } = useIsAppEnabled(app);

  return (
    <AppCard
      app={app}
      switchOnClick={updateEnabled}
      switchChecked={enabled}
      teamId={eventType.team?.id || undefined}>
      <TextField
        name="Pixel ID"
        value={trackingId}
        disabled={disabled}
        onChange={(e) => {
          setAppData("trackingId", e.target.value);
        }}
      />
    </AppCard>
  );
};

export default EventTypeAppCard;
