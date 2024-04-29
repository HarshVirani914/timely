import Shell from "@timely/features/shell/Shell";
import { ErrorBoundary } from "@timely/ui";
import { Loader } from "@timely/ui/components/icon";
import type { ComponentProps } from "react";
import React, { Suspense } from "react";

export default function TroubleshooterLayout({
  children,
  ...rest
}: { children: React.ReactNode } & ComponentProps<typeof Shell>) {
  return (
    <Shell withoutSeo={true} flexChildrenContainer hideHeadingOnMobile {...rest} SidebarContainer={<></>}>
      <div className="flex flex-1 [&>*]:flex-1">
        <ErrorBoundary>
          <Suspense fallback={<Loader />}>{children}</Suspense>
        </ErrorBoundary>
      </div>
    </Shell>
  );
}

export const getLayout = (page: React.ReactElement) => <TroubleshooterLayout>{page}</TroubleshooterLayout>;
