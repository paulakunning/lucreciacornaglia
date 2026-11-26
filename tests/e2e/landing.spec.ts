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

// JSX drops whitespace at line breaks, so a reflow can glue a bold phrase to its neighbour.
test("bold phrases keep the spaces around them", async ({ page }) => {
  await page.goto("/sobre-mi");
  await expect(page.locator("p:has(strong)")).toHaveText([
    "Acompaño a empresas y productores a analizar sus costos, precios y resultados para mejorar su gestión.",
    "Mi trabajo va más allá de los números: busco comprometerme con cada negocio para aportar soluciones y mejoras.",
    "Mi consultoría complementa el trabajo de tu estudio contable, no lo reemplaza. Podemos colaborar para que cuentes con información útil para gestionar y tomar decisiones.",
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

const aboutParagraphs = async (page: import("@playwright/test").Page) => {
  const section = page.getByRole("region", { name: "Un poco sobre mí" });
  const intro = await section
    .locator("p", { hasText: "Soy Lucrecia Cornaglia" })
    .boundingBox();
  const highlight = await section
    .locator("p", { hasText: "Mi trabajo va más allá" })
    .boundingBox();
  return { intro: intro!, highlight: highlight! };
};

test("without a photo, the highlight fills the right column on desktop", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto("/sobre-mi");
  const { intro, highlight } = await aboutParagraphs(page);
  expect(highlight.x).toBeGreaterThan(intro.x + intro.width);
});

test("on phones the highlight stays below the text", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/sobre-mi");
  const { intro, highlight } = await aboutParagraphs(page);
  expect(highlight.y).toBeGreaterThan(intro.y + intro.height);
});
