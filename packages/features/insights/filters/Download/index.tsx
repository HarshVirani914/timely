import { useFilterContext } from "@timely/features/insights/context/provider";
import { useLocale } from "@timely/lib/hooks/useLocale";
import type { RouterOutputs } from "@timely/trpc";
import { trpc } from "@timely/trpc";
import { Dropdown, DropdownItem, DropdownMenuContent, DropdownMenuTrigger, Button } from "@timely/ui";
import { FileDownIcon } from "lucide-react";

const Download = () => {
  const { filter } = useFilterContext();

  const { t } = useLocale();

  const { data, isLoading } = trpc.viewer.insights.rawData.useQuery(
    {
      startDate: filter.dateRange[0].toISOString(),
      endDate: filter.dateRange[1].toISOString(),
      teamId: filter.selectedTeamId,
      userId: filter.selectedUserId,
      eventTypeId: filter.selectedEventTypeId,
      memberUserId: filter.selectedMemberUserId,
    },
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: false,
      staleTime: Infinity,
      trpc: {
        context: { skipBatch: true },
      },
    }
  );

  type RawData = RouterOutputs["viewer"]["insights"]["rawData"] | undefined;
  const handleDownloadClick = async (data: RawData) => {
    if (!data) return;
    const { data: csvRaw, filename } = data;

    // Create a Blob from the text data
    const blob = new Blob([csvRaw], { type: "text/plain" });

    // Create an Object URL for the Blob
    const url = window.URL.createObjectURL(blob);

    // Create a download link
    const a = document.createElement("a");
    a.href = url;
    a.download = filename; // Specify the filename

    // Simulate a click event to trigger the download
    a.click();

    // Release the Object URL to free up memory
    window.URL.revokeObjectURL(url);
  };

  return (
    <Dropdown modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          EndIcon={FileDownIcon}
          color="secondary"
          {...(isLoading && { loading: isLoading })}
          className="self-end sm:self-baseline">
          {t("download")}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownItem onClick={() => handleDownloadClick(data)}>{t("as_csv")}</DropdownItem>
      </DropdownMenuContent>
    </Dropdown>
  );
};

export { Download };
