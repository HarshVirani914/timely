import type { AppRouter } from "@timely/trpc/server/routers/_app";

import { createTRPCReact } from "@trpc/react-query";

export const trpc = createTRPCReact<AppRouter>({});
