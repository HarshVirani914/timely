import type { GetAppData, SetAppData } from "@timely/app-store/EventTypeAppContext";
import EventTypeAppContext from "@timely/app-store/EventTypeAppContext";
import { EventTypeAddonMap } from "@timely/app-store/apps.browser.generated";
import type { RouterOutputs } from "@timely/trpc/react";
import { ErrorBoundary } from "@timely/ui";

import type { EventTypeAppCardComponentProps, CredentialOwner } from "../types";
import { DynamicComponent } from "./DynamicComponent";

export const EventTypeAppCard = (props: {
  app: RouterOutputs["viewer"]["integrations"]["items"][number] & { credentialOwner?: CredentialOwner };
  eventType: EventTypeAppCardComponentProps["eventType"];
  getAppData: GetAppData;
  setAppData: SetAppData;
  // For event type apps, get these props from shouldLockDisableProps
  LockedIcon?: JSX.Element | false;
  disabled?: boolean;
}) => {
  const { app, getAppData, setAppData, LockedIcon, disabled } = props;
  return (
    <ErrorBoundary message={`There is some problem with ${app.name} App`}>
      <EventTypeAppContext.Provider value={{ getAppData, setAppData, LockedIcon, disabled }}>
        <DynamicComponent
          slug={app.slug === "stripe" ? "stripepayment" : app.slug}
          componentMap={EventTypeAddonMap}
          {...props}
        />
      </EventTypeAppContext.Provider>
    </ErrorBoundary>
  );
};
