import { useOrgBranding } from "@timely/features/ee/organizations/context/provider";
import { CAL_URL, WEBAPP_URL } from "@timely/lib/constants";

export const useBookerUrl = () => {
  const orgBranding = useOrgBranding();
  return orgBranding?.fullDomain ?? CAL_URL ?? WEBAPP_URL;
};
