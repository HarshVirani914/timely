import type { FunctionComponent, SVGProps } from "react";

import { InstallAppButton } from "@timely/app-store/components";
import { useLocale } from "@timely/lib/hooks/useLocale";
import { trpc } from "@timely/trpc/react";
import {
  Button,
  Dropdown,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownItem,
} from "@timely/ui";
import { Plus } from "@timely/ui/components/icon";

import { QueryCell } from "@lib/QueryCell";

interface AdditionalCalendarSelectorProps {
  isLoading?: boolean;
}

const AdditionalCalendarSelector = ({ isLoading }: AdditionalCalendarSelectorProps): JSX.Element | null => {
  const { t } = useLocale();
  const query = trpc.viewer.integrations.useQuery({ variant: "calendar", onlyInstalled: true });

  return (
    <QueryCell
      query={query}
      success={({ data }) => {
        const options = data.items.map((item) => ({
          label: item.name,
          slug: item.slug,
          image: item.logo,
          type: item.type,
        }));
        options.push({
          label: "Add new calendars",
          slug: "add-new",
          image: "",
          type: "new_other",
        });
        return (
          <Dropdown modal={false}>
            <DropdownMenuTrigger asChild>
              <Button StartIcon={Plus} color="secondary" {...(isLoading && { loading: isLoading })}>
                {t("add")}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {options.map((data) => (
                <DropdownMenuItem key={data.slug} className="focus:outline-none">
                  {data.slug === "add-new" ? (
                    <DropdownItem StartIcon={Plus} color="minimal" href="/apps/categories/calendar">
                      {t("install_new_calendar_app")}
                    </DropdownItem>
                  ) : (
                    <InstallAppButton
                      type={data.type}
                      render={(installProps) => {
                        const props = { ...installProps } as FunctionComponent<SVGProps<SVGSVGElement>>;
                        return (
                          <DropdownItem {...props} color="minimal" type="button">
                            <span className="flex items-center gap-x-2">
                              {data.image && <img className="h-5 w-5" src={data.image} alt={data.label} />}
                              {`${t("add")} ${data.label}`}
                            </span>
                          </DropdownItem>
                        );
                      }}
                    />
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </Dropdown>
        );
      }}
    />
  );
};

export default AdditionalCalendarSelector;
