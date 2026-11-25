import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const PAGES = ["/", "/sobre-mi", "/no-existe"];

for (const path of PAGES) {
  test(`${path} has no serious accessibility violations`, async ({ page }) => {
    await page.goto(path);
    const { violations } = await new AxeBuilder({ page }).analyze();
    expect(
      violations.filter(
        (v) => v.impact === "serious" || v.impact === "critical",
      ),
    ).toEqual([]);
  });

  test(`${path} loads without console errors`, async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });
    page.on("pageerror", (err) => errors.push(err.message));
    await page.goto(path);
    await page.waitForLoadState("networkidle");
    // The 404 page logs its own document status; that one is expected.
    expect(
      errors.filter(
        (e) => !(path === "/no-existe" && e.includes("status of 404")),
      ),
    ).toEqual([]);
  });
}

test("responses carry the security headers", async ({ request }) => {
  const headers = (await request.get("/")).headers();
  expect(headers["content-security-policy"]).toContain(
    "frame-ancestors 'none'",
  );
  expect(headers["content-security-policy"]).toContain("object-src 'none'");
  expect(headers["x-content-type-options"]).toBe("nosniff");
  expect(headers["referrer-policy"]).toBe("strict-origin-when-cross-origin");
  expect(headers["permissions-policy"]).toContain("camera=()");
  expect(headers["x-powered-by"]).toBeUndefined();
});

test("keyboard focus is visible on dark backgrounds", async ({ page }) => {
  const sky = "rgb(127, 169, 255)";
  await page.goto("/");
  const tile = page.getByRole("link", { name: "Hablemos por WhatsApp" });
  await tile.focus();
  expect(await tile.evaluate((el) => getComputedStyle(el).outlineColor)).toBe(
    sky,
  );

  await page.goto("/sobre-mi");
  const cta = page
    .getByRole("region", { name: "¿Hablamos?" })
    .getByRole("link", { name: "Hablemos por WhatsApp" });
  await cta.focus();
  expect(await cta.evaluate((el) => getComputedStyle(el).outlineColor)).toBe(
    sky,
  );
});
