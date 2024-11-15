import { expect } from "@playwright/test";

import { MembershipRole } from "@timely/prisma/client";

import { test } from "./lib/fixtures";
import {
  bookTimeSlot,
  doOnOrgDomain,
  selectFirstAvailableTimeSlotNextMonth,
  selectSecondAvailableTimeSlotNextMonth,
} from "./lib/testUtils";

test.afterEach(({ users }) => users.deleteAll());

test("dynamic booking", async ({ page, users }) => {
  const pro = await users.create();
  await pro.apiLogin();

  const free = await users.create({ username: "free.example" });
  await page.goto(`/${pro.username}+${free.username}`);

  await test.step("book an event first day in next month", async () => {
    await selectFirstAvailableTimeSlotNextMonth(page);

    // Fill what is this meeting about? title
    await page.locator('[name="title"]').fill("Test meeting");

    await bookTimeSlot(page);

    await expect(page.locator("[data-testid=success-page]")).toBeVisible();
  });

  await test.step("can reschedule a booking", async () => {
    // Logged in
    await page.goto("/bookings/upcoming");
    await page.locator('[data-testid="edit_booking"]').nth(0).click();
    await page.locator('[data-testid="reschedule"]').click();
    await page.waitForURL((url) => {
      const bookingId = url.searchParams.get("rescheduleUid");
      return !!bookingId;
    });
    await selectSecondAvailableTimeSlotNextMonth(page);

    // No need to fill fields since they should be already filled
    await page.locator('[data-testid="confirm-reschedule-button"]').click();
    await page.waitForURL((url) => {
      return url.pathname.startsWith("/booking");
    });
    await expect(page.locator("[data-testid=success-page]")).toBeVisible();
  });

  await test.step("Can cancel the recently created booking", async () => {
    await page.goto("/bookings/upcoming");
    await page.locator('[data-testid="cancel"]').click();
    await page.waitForURL((url) => {
      return url.pathname.startsWith("/booking");
    });
    await page.locator('[data-testid="confirm_cancel"]').click();

    const cancelledHeadline = page.locator('[data-testid="cancelled-headline"]');
    await expect(cancelledHeadline).toBeVisible();
  });
});

test.describe("Organization:", () => {
  test.afterEach(({ orgs, users }) => {
    orgs.deleteAll();
    users.deleteAll();
  });
  test("Can book a time slot for an organization", async ({ page, users, orgs }) => {
    const org = await orgs.create({
      name: "TestOrg",
    });

    const user1 = await users.create({
      organizationId: org.id,
      name: "User 1",
      roleInOrganization: MembershipRole.ADMIN,
    });

    const user2 = await users.create({
      organizationId: org.id,
      name: "User 2",
      roleInOrganization: MembershipRole.ADMIN,
    });
    await doOnOrgDomain(
      {
        orgSlug: org.slug,
        page,
      },
      async () => {
        await page.goto(`/${user1.username}+${user2.username}`);
        await selectFirstAvailableTimeSlotNextMonth(page);
        await bookTimeSlot(page, {
          title: "Test meeting",
        });
        await expect(page.getByTestId("success-page")).toBeVisible();
        // All the teammates should be in the booking
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        await expect(page.getByText(user1.name!, { exact: true })).toBeVisible();
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        await expect(page.getByText(user2.name!, { exact: true })).toBeVisible();
      }
    );
  });
});
