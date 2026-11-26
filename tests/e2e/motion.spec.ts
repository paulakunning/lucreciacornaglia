import { expect, test, type Page } from "@playwright/test";

const opacities = (page: Page) =>
  page
    .locator("[data-reveal]")
    .evaluateAll((els) => els.map((el) => getComputedStyle(el).opacity));

test("blocks below the fold fade in as they scroll into view", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/sobre-mi");
  const step = page.getByRole("listitem").filter({ hasText: "Nos conocemos" });
  await expect(step).toHaveCSS("opacity", "0");

  // Scroll down like a visitor would, all the way to the footer.
  while (
    await page.evaluate(async () => {
      window.scrollBy(0, 300);
      // Let a frame render, as it would for a person, so the observer sees each step.
      await new Promise((r) => requestAnimationFrame(() => setTimeout(r)));
      return innerHeight + scrollY < document.documentElement.scrollHeight;
    })
  );
  await expect
    .poll(async () => new Set(await opacities(page)))
    .toEqual(new Set(["1"]));
});

test("blocks already on screen are never hidden", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 2000 });
  await page.goto("/sobre-mi");
  // Wait until the script has run: something further down is hidden.
  await expect(
    page.getByRole("listitem").filter({ hasText: "Nos conocemos" }),
  ).toHaveCSS("opacity", "0");
  await expect(
    page.locator("p", { hasText: "Mi trabajo va más allá" }),
  ).toHaveCSS("opacity", "1");
});

test("nothing is hidden when the visitor asks for reduced motion", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/sobre-mi");
  await expect(page.locator('[data-reveal="hidden"]').first()).toBeAttached();
  expect(new Set(await opacities(page))).toEqual(new Set(["1"]));
});

test.describe("without JavaScript", () => {
  test.use({ javaScriptEnabled: false });

  test("every block is visible", async ({ page }) => {
    await page.goto("/sobre-mi");
    const values = await opacities(page);
    expect(values.length).toBeGreaterThan(10);
    expect(new Set(values)).toEqual(new Set(["1"]));
  });
});
