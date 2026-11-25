import { readFileSync } from "node:fs";
import { expect, test } from "@playwright/test";

// Stock and design-tool exports embed account and team identifiers; the repo and site are public.
const IMAGES = [
  "src/assets/images/hero-bg.jpg",
  "src/assets/images/linktree-bg.jpg",
  "src/assets/images/sectors-bg.jpg",
  "src/app/opengraph-image.jpg",
];

test("published images carry no embedded metadata", () => {
  const withMetadata = IMAGES.filter((path) =>
    /xmpmeta|Exif|Canva/.test(readFileSync(path).toString("latin1")),
  );
  expect(withMetadata).toEqual([]);
});
