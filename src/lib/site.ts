const whatsappMessage =
  "Hola Lucrecia, vi tu web y quisiera consultar por tus servicios de costos y rentabilidad";

/** Contact details and URLs used across the site. */
export const site = {
  name: "Lucrecia Cornaglia",
  url: "https://lucreciacornaglia.vercel.app",
  instagramUrl: "https://www.instagram.com/lucreciacornaglia/",
  whatsappUrl: `https://wa.me/5493512044111?text=${encodeURIComponent(whatsappMessage)}`,
} as const;
