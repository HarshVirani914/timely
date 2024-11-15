import { ssoTenantProduct } from "@timely/features/ee/sso/lib/sso";
import type { PrismaClient } from "@timely/prisma";

import type { TSamlTenantProductInputSchema } from "./samlTenantProduct.schema";

type SamlTenantProductOptions = {
  ctx: {
    prisma: PrismaClient;
  };
  input: TSamlTenantProductInputSchema;
};

export const samlTenantProductHandler = ({ ctx, input }: SamlTenantProductOptions) => {
  const { prisma } = ctx;
  const { email } = input;

  return ssoTenantProduct(prisma, email);
};

export default samlTenantProductHandler;
