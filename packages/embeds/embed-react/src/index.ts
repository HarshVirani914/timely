"use client";

import type { GlobalCal } from "@timely/embed-core";
import EmbedSnippet from "@timely/embed-snippet";

import Cal from "./Cal";

export const getCalApi = (embedJsUrl?: string): Promise<GlobalCal> =>
  new Promise(function tryReadingFromWindow(resolve) {
    EmbedSnippet(embedJsUrl);
    const api = window.Cal;
    if (!api) {
      setTimeout(() => {
        tryReadingFromWindow(resolve);
      }, 50);
      return;
    }
    resolve(api);
  });

export default Cal;
