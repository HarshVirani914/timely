import { expect } from "@playwright/test";
import { getEmbedIframe } from "@timely/embed-core/playwright/lib/testUtils";
import { test } from "@timely/web/playwright/lib/fixtures";

test.describe("Inline Embed", () => {
  test("should verify that the iframe got created with correct URL", async ({
    page,
    embeds: { getActionFiredDetails, addEmbedListeners },
  }) => {
    //TODO: Do it with page.goto automatically
    await addEmbedListeners("");
    await page.goto("/");
    const calNamespace = "";
    const embedIframe = await getEmbedIframe({ calNamespace, page, pathname: "/pro" });
    expect(embedIframe).toBeEmbedCalLink("", getActionFiredDetails, {
      pathname: "/pro",
      searchParams: {
        theme: "dark",
      },
    });
    // expect(await page.screenshot()).toMatchSnapshot("react-component-inline.png");
  });
});
