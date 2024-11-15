import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@timely/trpc";
import type { AppRouter } from "@timely/trpc/server/routers/_app";
import { useState, type PropsWithChildren } from "react";

import { createTRPCReact } from "@trpc/react-query";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const mockedTrpc: any = createTRPCReact<AppRouter>();
export const StorybookTrpcProvider = ({ children }: PropsWithChildren) => {
  const [queryClient] = useState(new QueryClient({ defaultOptions: { queries: { staleTime: Infinity } } }));

  const [trpcClient] = useState(() =>
    mockedTrpc.createClient({
      links: [httpBatchLink({ url: "" })],
    })
  );

  return (
    <mockedTrpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </mockedTrpc.Provider>
  );
};
