"use client";

import { filterQuerySchemaStrict } from "@timely/features/filters/lib/getTeamsFiltersFromQuery";
import { z } from "zod";

export const ZFormsInputSchema = z
  .object({
    filters: filterQuerySchemaStrict.optional(),
  })
  .nullish();

export type TFormSchema = z.infer<typeof ZFormsInputSchema>;
