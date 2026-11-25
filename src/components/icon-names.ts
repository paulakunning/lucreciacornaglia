// Symbol ids in public/sprite.svg. The e2e suite checks that every one exists.
export const ICON_NAMES = [
  "wordmark",
  "isotype",
  "seal",
  "donut",
  "growth",
  "bars",
  "knot",
  "sector-agro",
  "sector-retail",
  "sector-services",
  "sector-industry",
  "sector-ecommerce",
  "whatsapp",
  "instagram",
  "linkedin",
] as const;

export type IconName = (typeof ICON_NAMES)[number];
