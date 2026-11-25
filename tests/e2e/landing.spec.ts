import { expect, test } from "@playwright/test";
import { INSTAGRAM_URL, SLOGAN, WHATSAPP_URL } from "./expected";

test("the title reads as one sentence", async ({ page }) => {
  await page.goto("/sobre-mi");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(SLOGAN);
});

test("shows every section in order", async ({ page }) => {
  await page.goto("/sobre-mi");
  await expect(page.getByRole("heading", { level: 2 })).toHaveText([
    "Un poco sobre mí",
    "¿En qué puedo ayudarte?",
    "¿Con quiénes trabajo?",
    "Cómo trabajo",
    "¿Hablamos?",
  ]);
});

test("every contact link points to the real accounts", async ({ page }) => {
  await page.goto("/sobre-mi");
  const hrefs = (selector: string) =>
    page
      .locator(selector)
      .evaluateAll((els) => els.map((el) => el.getAttribute("href")));
  // nav, hero, contact section, footer
  expect(await hrefs('a[href*="wa.me"]')).toEqual(Array(4).fill(WHATSAPP_URL));
  // nav, contact section, footer
  expect(await hrefs('a[href*="instagram.com"]')).toEqual(
    Array(3).fill(INSTAGRAM_URL),
  );
  await expect(page.locator('a[href*="linkedin"]')).toHaveCount(0);
});

for (const path of ["/", "/sobre-mi"]) {
  test(`${path} fits a 360px screen`, async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await page.goto(path);
    const overflowing = await page
      .locator("h1, h2, h3, p, a, li, dt, dd")
      .evaluateAll((els) =>
        els
          .filter((el) => el.getBoundingClientRect().right > innerWidth + 1)
          .map((el) => el.textContent),
      );
    expect(overflowing).toEqual([]);
  });
}

test("each title line fits on one line at 360px", async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 740 });
  await page.goto("/sobre-mi");
  const lines = await page
    .locator("h1 span")
    .evaluateAll((els) =>
      els.map((el) =>
        Math.round(
          el.getBoundingClientRect().height /
            parseFloat(getComputedStyle(el).lineHeight),
        ),
      ),
    );
  expect(lines).toEqual([1, 1]);
});
