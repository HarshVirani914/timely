import type { TRPCContext } from "@timely/trpc/server/createContext";
import { appRouter } from "@timely/trpc/server/routers/_app";

export const getServerCaller = (ctx: TRPCContext) => appRouter.createCaller(ctx);
