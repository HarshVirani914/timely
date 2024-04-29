import { APP_NAME } from "@timely/lib/constants";
import { useLocale } from "@timely/lib/hooks/useLocale";
import { trpc } from "@timely/trpc";
import { TopBanner, showToast } from "@timely/ui";
import { Mail } from "@timely/ui/components/icon";

import { useFlagMap } from "../../flags/context/provider";

export type VerifyEmailBannerProps = {
  data: boolean;
};

function VerifyEmailBanner({ data }: VerifyEmailBannerProps) {
  const flags = useFlagMap();
  const { t } = useLocale();
  const mutation = trpc.viewer.auth.resendVerifyEmail.useMutation();

  if (!data || !flags["email-verification"]) return null;

  return (
    <>
      <TopBanner
        Icon={Mail}
        text={t("verify_email_banner_body", { appName: APP_NAME })}
        variant="warning"
        actions={
          <a
            className="underline hover:cursor-pointer"
            onClick={() => {
              mutation.mutate();
              showToast(t("email_sent"), "success");
            }}>
            {t("resend_email")}
          </a>
        }
      />
    </>
  );
}

export default VerifyEmailBanner;
