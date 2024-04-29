import { IdentityProvider } from "@timely/prisma/enums";

export const identityProviderNameMap: { [key in IdentityProvider]: string } = {
  [IdentityProvider.CAL]: "Cal",
  [IdentityProvider.GOOGLE]: "Google",
  [IdentityProvider.SAML]: "SAML",
};
