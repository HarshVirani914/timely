import { useMutation } from "@tanstack/react-query";
import { classNames } from "@timely/lib";
import { useLocale } from "@timely/lib/hooks/useLocale";
import { trpc } from "@timely/trpc/react";
import { showToast, Switch } from "@timely/ui";
import { ArrowLeft, RotateCw } from "@timely/ui/components/icon";
import { useState } from "react";

interface ICalendarSwitchProps {
  title: string;
  externalId: string;
  type: string;
  isChecked: boolean;
  name: string;
  isLastItemInList?: boolean;
  destination?: boolean;
  credentialId: number;
}
const CalendarSwitch = (props: ICalendarSwitchProps) => {
  const { title, externalId, type, isChecked, name, isLastItemInList = false, credentialId } = props;
  const [checkedInternal, setCheckedInternal] = useState(isChecked);
  const utils = trpc.useContext();
  const { t } = useLocale();
  const mutation = useMutation<
    unknown,
    unknown,
    {
      isOn: boolean;
    }
  >(
    async ({ isOn }: { isOn: boolean }) => {
      const body = {
        integration: type,
        externalId: externalId,
      };

      if (isOn) {
        const res = await fetch("/api/availability/calendar", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...body, credentialId }),
        });

        if (!res.ok) {
          throw new Error("Something went wrong");
        }
      } else {
        const res = await fetch(`/api/availability/calendar?${new URLSearchParams(body)}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          throw new Error("Something went wrong");
        }
      }
    },
    {
      async onSettled() {
        await utils.viewer.integrations.invalidate();
        await utils.viewer.connectedCalendars.invalidate();
      },
      onError() {
        setCheckedInternal(false);
        showToast(`Something went wrong when toggling "${title}"`, "error");
      },
    }
  );
  return (
    <div className={classNames("my-2 flex flex-row items-center")}>
      <div className="flex pl-2">
        <Switch
          id={externalId}
          checked={checkedInternal}
          disabled={mutation.isLoading}
          onCheckedChange={async (isOn: boolean) => {
            setCheckedInternal(isOn);
            await mutation.mutate({ isOn });
          }}
        />
      </div>
      <label className="ml-3 text-sm font-medium leading-5" htmlFor={externalId}>
        {name}
      </label>
      {!!props.destination && (
        <span className="bg-subtle text-default ml-8 inline-flex items-center gap-1 rounded-md px-2 py-1 text-sm font-normal sm:ml-4">
          <ArrowLeft className="h-4 w-4" />
          {t("adding_events_to")}
        </span>
      )}
      {mutation.isLoading && <RotateCw className="text-muted h-4 w-4 animate-spin ltr:ml-1 rtl:mr-1" />}
    </div>
  );
};

export { CalendarSwitch };
