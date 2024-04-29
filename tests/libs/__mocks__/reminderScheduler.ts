import type * as reminderScheduler from "@timely/features/ee/workflows/lib/reminders/reminderScheduler";
import { beforeEach, vi } from "vitest";
import { mockReset, mockDeep } from "vitest-mock-extended";

vi.mock("@timely/features/ee/workflows/lib/reminders/reminderScheduler", () => reminderSchedulerMock);

beforeEach(() => {
  mockReset(reminderSchedulerMock);
});

const reminderSchedulerMock = mockDeep<typeof reminderScheduler>();
export default reminderSchedulerMock;
