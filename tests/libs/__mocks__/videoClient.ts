import type * as videoClient from "@timely/core/videoClient";
import { beforeEach, vi } from "vitest";
import { mockReset, mockDeep } from "vitest-mock-extended";

vi.mock("@timely/core/videoClient", () => videoClientMock);

beforeEach(() => {
  mockReset(videoClientMock);
});

const videoClientMock = mockDeep<typeof videoClient>();
export default videoClientMock;
