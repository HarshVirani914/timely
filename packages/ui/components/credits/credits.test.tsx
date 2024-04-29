/* eslint-disable playwright/missing-playwright-await */
import { render, screen } from "@testing-library/react";
import { vi } from "vitest";

import Credits from "./Credits";

vi.mock("@timely/lib/constants", async () => {
  const actual = (await vi.importActual("@timely/lib/constants")) as typeof import("@timely/lib/constants");
  return {
    ...actual,
    CALCOM_VERSION: "mockedVersion",
  };
});

describe("Tests for Credits component", () => {
  test("Should render credits section with links", () => {
    render(<Credits />);

    const creditsLinkElement = screen.getByRole("link", { name: /Cal\.com, Inc\./i });
    expect(creditsLinkElement).toBeInTheDocument();
    expect(creditsLinkElement).toHaveAttribute("href", "https://go.timely/credits");

    const versionLinkElement = screen.getByRole("link", { name: /mockedVersion/i });
    expect(versionLinkElement).toBeInTheDocument();
    expect(versionLinkElement).toHaveAttribute("href", "https://go.timely/releases");
  });

  test("Should render credits section with correct text", () => {
    render(<Credits />);

    const currentYear = new Date().getFullYear();
    const copyrightElement = screen.getByText(`© ${currentYear}`);
    expect(copyrightElement).toHaveTextContent(`${currentYear}`);
  });
});
