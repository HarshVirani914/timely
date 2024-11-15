import type { Page } from "@playwright/test";
import { test, expect } from "@playwright/test";

test.describe("Org", () => {
  // Because these pages involve next.config.js rewrites, it's better to test them on production
  test.describe("Embeds - i.timely", () => {
    test("Org Profile Page should be embeddable", async ({ page }) => {
      const response = await page.goto("https://i.timely/embed");
      expect(response?.status()).toBe(200);
      await page.screenshot({ path: "screenshot.jpg" });
      await expectPageToBeServerSideRendered(page);
    });

    test("Org User(Peer) Page should be embeddable", async ({ page }) => {
      const response = await page.goto("https://i.timely/peer/embed");
      expect(response?.status()).toBe(200);
      await expect(page.locator("text=Peer Richelsen")).toBeVisible();
      await expectPageToBeServerSideRendered(page);
    });

    test("Org User Event(peer/meet) Page should be embeddable", async ({ page }) => {
      const response = await page.goto("https://i.timely/peer/meet/embed");
      expect(response?.status()).toBe(200);
      await expect(page.locator('[data-testid="decrementMonth"]')).toBeVisible();
      await expect(page.locator('[data-testid="incrementMonth"]')).toBeVisible();
      await expectPageToBeServerSideRendered(page);
    });

    test("Org Team Profile(/sales) page should be embeddable", async ({ page }) => {
      const response = await page.goto("https://i.timely/sales/embed");
      expect(response?.status()).toBe(200);
      await expect(page.locator("text=Timely Sales")).toBeVisible();
      await expectPageToBeServerSideRendered(page);
    });

    test("Org Team Event page(/sales/hippa) should be embeddable", async ({ page }) => {
      const response = await page.goto("https://i.timely/sales/hipaa/embed");
      expect(response?.status()).toBe(200);
      await expect(page.locator('[data-testid="decrementMonth"]')).toBeVisible();
      await expect(page.locator('[data-testid="incrementMonth"]')).toBeVisible();
      await expectPageToBeServerSideRendered(page);
    });
  });
  test.describe("Dynamic Group Booking", () => {
    test("Dynamic Group booking link should load", async ({ page }) => {
      const users = [
        {
          username: "peer",
          name: "Peer Richelsen",
        },
        {
          username: "bailey",
          name: "Bailey Pumfleet",
        },
      ];
      const response = await page.goto(`http://i.timely/${users[0].username}+${users[1].username}`);
      expect(response?.status()).toBe(200);
      expect(await page.locator('[data-testid="event-title"]').textContent()).toBe("Dynamic");

      expect(await page.locator('[data-testid="event-meta"]').textContent()).toContain(users[0].name);
      expect(await page.locator('[data-testid="event-meta"]').textContent()).toContain(users[1].name);
      // 2 users and 1 for the organization(2+1)
      expect((await page.locator('[data-testid="event-meta"] [data-testid="avatar"]').all()).length).toBe(3);
    });
  });
});

// This ensures that the route is actually mapped to a page that is using withEmbedSsr
async function expectPageToBeServerSideRendered(page: Page) {
  expect(
    await page.evaluate(() => {
      return window.__NEXT_DATA__.props.pageProps.isEmbed;
    })
  ).toBe(true);
}
