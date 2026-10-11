import { aboutContent } from "@/constants/about";
import { faqs } from "@/constants/faq";
import { pressItems } from "@/constants/press";
import { services } from "@/constants/services";
import { SITE_URL, site } from "./site";

const id = (fragment: string) => `${SITE_URL}/#${fragment}`;
const absolute = (path: string) => (path.startsWith("http") ? path : `${SITE_URL}${path}`);

const founders = [
  { key: "founder", ...aboutContent.founder },
  { key: "co-founder", ...aboutContent.coFounder },
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": id("website"),
      url: SITE_URL,
      name: site.name,
      alternateName: "Eraya",
      description: site.description,
      inLanguage: "en-IN",
      publisher: { "@id": id("organization") },
    },
    {
      "@type": "WebPage",
      "@id": id("webpage"),
      url: SITE_URL,
      name: site.title,
      description: site.description,
      inLanguage: "en-IN",
      isPartOf: { "@id": id("website") },
      about: { "@id": id("organization") },
      primaryImageOfPage: { "@type": "ImageObject", url: site.heroImage },
    },
    {
      "@type": ["Organization", "ProfessionalService"],
      "@id": id("organization"),
      name: site.name,
      legalName: site.legalName,
      alternateName: "Eraya",
      url: SITE_URL,
      logo: { "@type": "ImageObject", ...site.logo },
      image: site.heroImage,
      description: aboutContent.description,
      slogan: site.slogan,
      email: site.email,
      telephone: site.telephone,
      address: {
        "@type": "PostalAddress",
        addressLocality: site.locality,
        addressRegion: site.region,
        addressCountry: site.country,
      },
      areaServed: [
        { "@type": "State", name: "Goa" },
        { "@type": "Country", name: "India" },
      ],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "sales",
        email: site.email,
        telephone: site.telephone,
        areaServed: "IN",
      },
      sameAs: [site.instagram],
      subjectOf: pressItems.map((item) => ({
        "@type": "Article",
        headline: item.headline,
        url: item.href ? absolute(item.href) : undefined,
        image: absolute(item.src),
        datePublished: item.date ? new Date(item.date).toLocaleDateString("en-CA") : undefined,
        publisher: { "@type": "Organization", name: item.publication },
        about: { "@id": id("organization") },
      })),
      founder: founders.map((person) => ({ "@id": id(person.key) })),
      knowsAbout: services.map((service) => service.title),
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Marketing & Creative Services",
        itemListElement: services.map((service) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: service.title,
            description: service.description,
            image: absolute(service.image),
            provider: { "@id": id("organization") },
            areaServed: { "@type": "Country", name: "India" },
          },
        })),
      },
    },
    ...founders.map((person) => ({
      "@type": "Person",
      "@id": id(person.key),
      name: person.name,
      jobTitle: person.role,
      image: absolute(person.image),
      worksFor: { "@id": id("organization") },
    })),
    {
      "@type": "FAQPage",
      "@id": id("faq"),
      url: `${SITE_URL}/#faq`,
      isPartOf: { "@id": id("webpage") },
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
  ],
};

export const structuredDataJson = JSON.stringify(structuredData).replace(/</g, `${String.fromCharCode(92)}u003c`);
