import type { teamMetadataSchema } from "@timely/prisma/zod-utils";
import { createContext, useContext, createElement } from "react";
import type z from "zod";

/**
 * Organization branding
 *
 * Entries consist of the different properties that constitues a brand for an organization.
 */
export type OrganizationBranding =
  | ({
      /** 1 */
      id: number;
      /** Acme */
      name?: string;
      /** acme */
      slug: string;
      /** https://acme.timely */
      fullDomain: string;
      /** timely */
      domainSuffix: string;
    } & z.infer<typeof teamMetadataSchema>)
  | null
  | undefined;

/**
 * Allows you to access the flags from context
 */
const OrganizationBrandingContext = createContext<{ orgBrand: OrganizationBranding } | null>(null);

/**
 * Accesses the branding for an organization from context.
 * You need to render a <OrgBrandingProvider /> further up to be able to use
 * this component.
 *
 * @returns `undefined` when data isn't available yet, `null` when there's an error, and the data(which can be `null`) when it's available
 */
export function useOrgBranding() {
  const orgBrandingContext = useContext(OrganizationBrandingContext);
  if (!orgBrandingContext) throw new Error("Error: useOrgBranding was used outside of OrgBrandingProvider.");
  return orgBrandingContext.orgBrand;
}

/**
 * If you want to be able to access the flags from context using `useOrganizationBranding()`,
 * you can render the OrgBrandingProvider at the top of your Next.js pages, like so:
 *
 * ```ts
 * import { useOrgBrandingValues } from "@timely/features/flags/hooks/useFlag"
 * import { OrgBrandingProvider, useOrgBranding } from @timely/features/flags/context/provider"
 *
 * export default function YourPage () {
 *   const orgBrand = useOrgBrandingValues()
 *
 *   return (
 *     <OrgBrandingProvider value={orgBrand}>
 *       <YourOwnComponent />
 *     </OrgBrandingProvider>
 *   )
 * }
 * ```
 *
 * You can then call `useOrgBrandingValues()` to access your `OrgBranding` from within
 * `YourOwnComponent` or further down.
 *
 */
export function OrgBrandingProvider<F extends { orgBrand: OrganizationBranding }>(props: {
  value: F;
  children: React.ReactNode;
}) {
  return createElement(OrganizationBrandingContext.Provider, { value: props.value }, props.children);
}
