import { expect, test } from "@playwright/test";
import { INSTAGRAM_URL, SLOGAN, WHATSAPP_URL } from "./expected";

test("links to the landing, WhatsApp and Instagram only", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByRole("navigation", { name: "Enlaces" }).getByRole("link"),
  ).toHaveCount(3);
  await expect(
    page.getByRole("link", { name: "Conocé mi trabajo" }),
  ).toHaveAttribute("href", "/sobre-mi");
  await expect(
    page.getByRole("link", { name: "Hablemos por WhatsApp" }),
  ).toHaveAttribute("href", WHATSAPP_URL);
  await expect(page.getByRole("link", { name: "Instagram" })).toHaveAttribute(
    "href",
    INSTAGRAM_URL,
  );
});

test("shows the slogan without a trailing period", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText(SLOGAN, { exact: true })).toBeVisible();
});

test("the isotype stays still with reduced motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const name = await page
    .locator("header svg g")
    .first()
    .evaluate((el) => getComputedStyle(el).animationName);
  expect(name).toBe("none");
});
