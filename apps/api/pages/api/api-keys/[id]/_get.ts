import { defaultResponder } from "@timely/lib/server";
import type { NextApiRequest } from "next";

import { apiKeyPublicSchema } from "~/lib/validations/api-key";
import { schemaQueryIdAsString } from "~/lib/validations/shared/queryIdString";

async function getHandler(req: NextApiRequest) {
  const { prisma, query } = req;
  const { id } = schemaQueryIdAsString.parse(query);
  const api_key = await prisma.apiKey.findUniqueOrThrow({ where: { id } });
  return { api_key: apiKeyPublicSchema.parse(api_key) };
}

export default defaultResponder(getHandler);
