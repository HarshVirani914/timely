import dayjs from "@timely/dayjs";
import { classNames } from "@timely/lib";
import { useLocale } from "@timely/lib/hooks/useLocale";
import type { RouterOutputs } from "@timely/trpc/react";
import { trpc } from "@timely/trpc/react";
import {
  Badge,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  showToast,
} from "@timely/ui";
import { MoreHorizontal, Edit2, Trash } from "@timely/ui/components/icon";

export type TApiKeys = RouterOutputs["viewer"]["apiKeys"]["list"][number];

const ApiKeyListItem = ({
  apiKey,
  lastItem,
  onEditClick,
}: {
  apiKey: TApiKeys;
  lastItem: boolean;
  onEditClick: () => void;
}) => {
  const { t } = useLocale();
  const utils = trpc.useContext();

  const isExpired = apiKey?.expiresAt ? apiKey.expiresAt < new Date() : null;
  const neverExpires = apiKey?.expiresAt === null;

  const deleteApiKey = trpc.viewer.apiKeys.delete.useMutation({
    async onSuccess() {
      await utils.viewer.apiKeys.list.invalidate();
      showToast(t("api_key_deleted"), "success");
    },
    onError(err) {
      console.log(err);
      showToast(t("something_went_wrong"), "error");
    },
  });

  return (
    <div
      key={apiKey.id}
      className={classNames(
        "flex w-full justify-between px-4 py-4 sm:px-6",
        lastItem ? "" : "border-subtle border-b"
      )}>
      <div>
        <div className="flex gap-1">
          <p className="text-sm font-semibold"> {apiKey?.note ? apiKey.note : t("api_key_no_note")}</p>
          {!neverExpires && isExpired && <Badge variant="red">{t("expired")}</Badge>}
          {!isExpired && <Badge variant="green">{t("active")}</Badge>}
        </div>
        <div className="mt-1 flex items-center space-x-3.5">
          <p className="text-default text-sm">
            {neverExpires ? (
              <div className="flex flex-row space-x-3">{t("api_key_never_expires")}</div>
            ) : (
              `${isExpired ? t("expired") : t("expires")} ${dayjs(apiKey?.expiresAt?.toString()).fromNow()}`
            )}
          </p>
        </div>
      </div>
      <div>
        <Dropdown>
          <DropdownMenuTrigger asChild>
            <Button type="button" variant="icon" color="secondary" StartIcon={MoreHorizontal} />
          </DropdownMenuTrigger>

          <DropdownMenuContent>
            <DropdownMenuItem>
              <DropdownItem type="button" onClick={onEditClick} StartIcon={Edit2}>
                {t("edit") as string}
              </DropdownItem>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <DropdownItem
                type="button"
                color="destructive"
                disabled={deleteApiKey.isLoading}
                onClick={() =>
                  deleteApiKey.mutate({
                    id: apiKey.id,
                  })
                }
                StartIcon={Trash}>
                {t("delete") as string}
              </DropdownItem>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </Dropdown>
      </div>
    </div>
  );
};

export default ApiKeyListItem;
