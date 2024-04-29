import type * as i18n from "@timely/lib/server/i18n";
import { beforeEach, vi } from "vitest";
import { mockReset, mockDeep } from "vitest-mock-extended";

vi.mock("@timely/lib/server/i18n", () => i18nMock);

beforeEach(() => {
  mockReset(i18nMock);
});

const i18nMock = mockDeep<typeof i18n>();
export default i18nMock;
