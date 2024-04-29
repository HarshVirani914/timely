import { zodResolver } from "@hookform/resolvers/zod";
import type { EventLocationType } from "@timely/app-store/locations";
import { getEventLocationType } from "@timely/app-store/locations";
import { useLocale } from "@timely/lib/hooks/useLocale";
import { trpc } from "@timely/trpc/react";
import {
  showToast,
  Dialog,
  DialogContent,
  Form,
  TextField,
  DialogFooter,
  Button,
  DialogClose,
} from "@timely/ui";
import { AlertCircle } from "@timely/ui/components/icon";
import type { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type LocationTypeSetLinkDialogFormProps = {
  link?: string;
  type: EventLocationType["type"];
};

export function AppSetDefaultLinkDialog({
  locationType,
  setLocationType,
  onSuccess,
}: {
  locationType: EventLocationType & { slug: string };
  setLocationType: Dispatch<SetStateAction<(EventLocationType & { slug: string }) | undefined>>;
  onSuccess: () => void;
}) {
  const { t } = useLocale();
  const eventLocationTypeOptions = getEventLocationType(locationType.type);

  const form = useForm<LocationTypeSetLinkDialogFormProps>({
    resolver: zodResolver(
      z.object({ link: z.string().regex(new RegExp(eventLocationTypeOptions?.urlRegExp ?? "")) })
    ),
  });

  const updateDefaultAppMutation = trpc.viewer.updateUserDefaultConferencingApp.useMutation({
    onSuccess: () => {
      onSuccess();
    },
    onError: () => {
      showToast(`Invalid App Link Format`, "error");
    },
  });

  return (
    <Dialog open={!!locationType} onOpenChange={() => setLocationType(undefined)}>
      <DialogContent
        title={t("default_app_link_title")}
        description={t("default_app_link_description")}
        type="creation"
        Icon={AlertCircle}>
        <Form
          form={form}
          handleSubmit={(values) => {
            updateDefaultAppMutation.mutate({
              appSlug: locationType.slug,
              appLink: values.link,
            });
            setLocationType(undefined);
          }}>
          <>
            <TextField
              type="text"
              required
              {...form.register("link")}
              placeholder={locationType.organizerInputPlaceholder ?? ""}
              label={locationType.label ?? ""}
            />

            <DialogFooter showDivider className="mt-8">
              <DialogClose />
              <Button color="primary" type="submit">
                {t("save")}
              </Button>
            </DialogFooter>
          </>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
