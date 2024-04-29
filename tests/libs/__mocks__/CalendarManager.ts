import type * as CalendarManager from "@timely/core/CalendarManager";
import { beforeEach, vi } from "vitest";
import { mockReset, mockDeep } from "vitest-mock-extended";

vi.mock("@timely/core/CalendarManager", () => CalendarManagerMock);

beforeEach(() => {
  mockReset(CalendarManagerMock);
});

const CalendarManagerMock = mockDeep<typeof CalendarManager>();
export default CalendarManagerMock;
