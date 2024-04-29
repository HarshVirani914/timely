import type * as appStore from "@timely/app-store";
import { beforeEach, vi } from "vitest";
import { mockReset, mockDeep } from "vitest-mock-extended";

vi.mock("@timely/app-store", () => appStoreMock);

beforeEach(() => {
  mockReset(appStoreMock);
});

const appStoreMock = mockDeep<typeof appStore>({
  fallbackMockImplementation: () => {
    throw new Error("Unimplemented");
  },
});
export default appStoreMock;
