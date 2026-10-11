const productionHost = process.env.VERCEL_PROJECT_PRODUCTION_URL;

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? (productionHost ? `https://${productionHost}` : "https://erayaexperience.com");

export const site = {
  name: "Eraya Experience",
  legalName: "Eraya Experience LLP",
  title: "Eraya Experience | Digital Marketing Agency Goa & Pan India",
  description:
    "Eraya Experience is a creative digital marketing agency in Goa, India: design, photoshoots, social media, Meta & Google ads, influencers, brand kits and SEO.",
  shareDescription:
    "A creative marketing agency in Goa for brands that want to be noticed and remembered. Design, content, ads, influencers and websites, measured by real growth.",
  slogan: "We make brands unmissable.",
  locality: "Porvorim",
  region: "Goa",
  country: "IN",
  email: "info.erayaexp@gmail.com",
  telephone: "+918208664702",
  phoneLabel: "+91 8208664702",
  instagramHandle: "erayaexperience",
  instagram: "https://www.instagram.com/erayaexperience/",
  logo: { url: `${SITE_URL}/logo.png`, width: 1257, height: 447 },
  heroImage: `${SITE_URL}/images/hero-desktop-frame.webp`,
} as const;
