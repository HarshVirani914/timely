"use client";

import { filterQuerySchemaStrict } from "@timely/features/filters/lib/getTeamsFiltersFromQuery";
import { z } from "zod";

export const ZFilteredListInputSchema = z
  .object({
    filters: filterQuerySchemaStrict.optional(),
  })
  .nullish();

export type TFilteredListInputSchema = z.infer<typeof ZFilteredListInputSchema>;
