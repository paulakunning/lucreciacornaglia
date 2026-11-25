import { expect, test } from "@playwright/test";
import { ICON_NAMES } from "../../src/components/icon-names";

test("the sprite is valid SVG and defines every icon name", async ({
  page,
}) => {
  await page.goto("/");
  const result = await page.evaluate(
    async (names) => {
      const res = await fetch("/sprite.svg");
      const doc = new DOMParser().parseFromString(
        await res.text(),
        "image/svg+xml",
      );
      return {
        status: res.status,
        parseError: doc.querySelector("parsererror")?.textContent ?? null,
        missing: names.filter((name) => !doc.getElementById(name)),
      };
    },
    ICON_NAMES as unknown as string[],
  );
  expect(result).toEqual({ status: 200, parseError: null, missing: [] });
});
