import { expect, test } from "@playwright/test";

const SITE = "https://lucreciacornaglia.vercel.app";

test("unknown URLs show the branded 404", async ({ page }) => {
  const res = await page.goto("/no-existe");
  expect(res?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "No encontramos esta página",
  );
  await expect(
    page.getByRole("link", { name: "Volver al inicio" }),
  ).toHaveAttribute("href", "/");
});

test("each page has its title, description and share image", async ({
  page,
}) => {
  for (const [path, title] of [
    ["/", "Lucrecia Cornaglia | Costos y rentabilidad"],
    ["/sobre-mi", "Sobre mí | Lucrecia Cornaglia, costos y rentabilidad"],
  ]) {
    await page.goto(path);
    await expect(page).toHaveTitle(title);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      "content",
      /costos, precios y resultados/,
    );
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
      "content",
      new RegExp(`^${SITE}/opengraph-image`),
    );
  }
});

test("sitemap lists both pages and robots points to it", async ({
  request,
}) => {
  const sitemap = await (await request.get("/sitemap.xml")).text();
  expect(sitemap).toContain(`<loc>${SITE}</loc>`);
  expect(sitemap).toContain(`<loc>${SITE}/sobre-mi</loc>`);
  const robots = await (await request.get("/robots.txt")).text();
  expect(robots).toContain(`Sitemap: ${SITE}/sitemap.xml`);
});
