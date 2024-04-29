import type { App } from "@timely/types/App";

export function getAppAssetFullPath(assetPath: string, metadata: Pick<App, "dirName" | "isTemplate">) {
  const appDirName = `${metadata.isTemplate ? "templates/" : ""}${metadata.dirName}`;
  let assetFullPath = assetPath;
  if (!assetPath.startsWith("/app-store/") && !/^https?/.test(assetPath)) {
    assetFullPath = `/app-store/${appDirName}/${assetPath}`;
  }
  return assetFullPath;
}
