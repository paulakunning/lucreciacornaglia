import { expect, test } from "@playwright/test";

test("home responds in Spanish (Argentina)", async ({ page }) => {
  const res = await page.goto("/");
  expect(res?.status()).toBe(200);
  await expect(page.locator("html")).toHaveAttribute("lang", "es-AR");
});
