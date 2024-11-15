import { _EventTypeCustomInputModel as EventTypeCustomInput } from "@timely/prisma/zod";

export const schemaEventTypeCustomInputBaseBodyParams = EventTypeCustomInput.omit({
  id: true,
});

export const schemaEventTypeCustomInputPublic = EventTypeCustomInput.omit({});

export const schemaEventTypeCustomInputBodyParams = schemaEventTypeCustomInputBaseBodyParams.strict();

export const schemaEventTypeCustomInputEditBodyParams = schemaEventTypeCustomInputBaseBodyParams
  .partial()
  .strict();
