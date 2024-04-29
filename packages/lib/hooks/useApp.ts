import { trpc } from "@timely/trpc/react";
import { useSession } from "next-auth/react";

export default function useApp(appId: string) {
  const { status } = useSession();

  return trpc.viewer.appById.useQuery(
    { appId },
    {
      enabled: status === "authenticated",
    }
  );
}
