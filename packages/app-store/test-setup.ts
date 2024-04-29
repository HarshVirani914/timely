import matchers from "@testing-library/jest-dom/matchers";
import { cleanup } from "@testing-library/react";
import { afterEach, expect, vi } from "vitest";

vi.mock("@timely/lib/OgImages", async () => {
  return {};
});

vi.mock("@timely/lib/hooks/useLocale", () => ({
  useLocale: () => {
    return {
      t: (str: string) => str,
    };
  },
}));

global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

expect.extend(matchers);

afterEach(() => {
  cleanup();
});
