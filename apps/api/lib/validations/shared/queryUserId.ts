import { stringOrNumber } from "@timely/prisma/zod-utils";
import { withValidation } from "next-validations";
import { z } from "zod";

import { baseApiParams } from "./baseApiParams";

// Extracted out as utility function so can be reused
// at different endpoints that require this validation.
export const schemaQueryUserId = baseApiParams.extend({
  userId: stringOrNumber,
});

export const schemaQuerySingleOrMultipleUserIds = z.object({
  userId: z.union([stringOrNumber, z.array(stringOrNumber)]),
});

export const schemaQuerySingleOrMultipleTeamIds = z.object({
  teamId: z.union([stringOrNumber, z.array(stringOrNumber)]),
});

export const withValidQueryUserId = withValidation({
  schema: schemaQueryUserId,
  type: "Zod",
  mode: "query",
});
