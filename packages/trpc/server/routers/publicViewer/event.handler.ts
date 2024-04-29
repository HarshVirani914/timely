import { getPublicEvent } from "@timely/features/eventtypes/lib/getPublicEvent";
import type { PrismaClient } from "@timely/prisma";

import type { TEventInputSchema } from "./event.schema";

interface EventHandlerOptions {
  ctx: { prisma: PrismaClient };
  input: TEventInputSchema;
}

export const eventHandler = async ({ ctx, input }: EventHandlerOptions) => {
  const event = await getPublicEvent(
    input.username,
    input.eventSlug,
    input.isTeamEvent,
    input.org,
    ctx.prisma
  );
  return event;
};

export default eventHandler;
