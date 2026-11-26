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

test("blocks already on screen fade in on load instead of being hidden", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1280, height: 2000 });
  await page.goto("/sobre-mi");
  // Wait until the script has run: something further down is hidden.
  await expect(
    page.getByRole("listitem").filter({ hasText: "Nos conocemos" }),
  ).toHaveCSS("opacity", "0");
  const highlight = page.locator("p", { hasText: "Mi trabajo va más allá" });
  await expect(highlight).not.toHaveAttribute("data-reveal", "hidden");
  expect(
    await highlight.evaluate((el) => getComputedStyle(el).animationName),
  ).not.toBe("none");
  await expect(highlight).toHaveCSS("opacity", "1");
});

test("the about section fades in without rising", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 400 });
  await page.goto("/sobre-mi");
  const intro = page
    .getByRole("region", { name: "Un poco sobre mí" })
    .locator("[data-reveal]")
    .first();
  await expect(intro).toHaveAttribute("data-reveal", "hidden");
  await expect(intro).toHaveCSS("translate", "none");
});

/** For the hero's text and its photo: whether each one, or a block around it, animates. */
const heroAnimations = (page: Page) =>
  page
    .locator("section")
    .first()
    .evaluate((hero) => {
      const animates = (el: Element) => {
        for (let e: Element | null = el; e && e !== hero; e = e.parentElement)
          if (getComputedStyle(e).animationName !== "none") return true;
        return false;
      };
      return {
        text: [...hero.querySelectorAll("h1, p, a")].map(animates),
        photo: animates(hero.querySelector("img")!),
      };
    });

// The photo is the page's largest paint, so animating it would cost PageSpeed points.
test("the hero text eases in on load, its photo stays put", async ({
  page,
}) => {
  await page.goto("/sobre-mi");
  const { text, photo } = await heroAnimations(page);
  expect(new Set(text)).toEqual(new Set([true]));
  expect(photo).toBe(false);
});

test("nothing is hidden when the visitor asks for reduced motion", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/sobre-mi");
  await expect(page.locator('[data-reveal="hidden"]').first()).toBeAttached();
  expect(new Set(await opacities(page))).toEqual(new Set(["1"]));
  expect(new Set((await heroAnimations(page)).text)).toEqual(new Set([false]));
});

test.describe("without JavaScript", () => {
  test.use({ javaScriptEnabled: false });

  test("every block is visible", async ({ page }) => {
    await page.goto("/sobre-mi");
    expect((await opacities(page)).length).toBeGreaterThan(10);
    // Once the on-load fade is over.
    await expect
      .poll(async () => new Set(await opacities(page)))
      .toEqual(new Set(["1"]));
  });
});
