import { useAppContextWithSchema } from "@timely/app-store/EventTypeAppContext";
import AppCard from "@timely/app-store/_components/AppCard";
import type { EventTypeAppCardComponent } from "@timely/app-store/types";
import { TextField } from "@timely/ui";
import { useState } from "react";

import type { appDataSchema } from "../zod";

const EventTypeAppCard: EventTypeAppCardComponent = function EventTypeAppCard({ app, eventType }) {
  const { getAppData, setAppData } = useAppContextWithSchema<typeof appDataSchema>();
  const trackingId = getAppData("trackingId");
  const [enabled, setEnabled] = useState(getAppData("enabled"));

  return (
    <AppCard
      app={app}
      switchOnClick={(e) => {
        if (!e) {
          setEnabled(false);
        } else {
          setEnabled(true);
        }
      }}
      switchChecked={enabled}
      teamId={eventType.team?.id || undefined}>
      <TextField
        name="Tracking ID"
        value={trackingId}
        onChange={(e) => {
          setAppData("trackingId", e.target.value);
        }}
      />
    </AppCard>
  );
};

export default EventTypeAppCard;
