export type Testimonial = {
  id: string;
  quote: string;
  highlight: string;
  brand: string;
  logo: { src: string; width: number; height: number };
  image: { src: string; alt: string; position?: string };
  clientName: string;
  clientRole: string;
  service: string;
};

export const testimonials: Testimonial[] = [
  {
    id: "mission-rabies",
    brand: "Mission Rabies",
    logo: { src: "/images/clients/mono/mission-rabies.png", width: 552, height: 242 },
    image: { src: "/images/case-studies/mission-rabies.jpg", alt: "Rescued puppy photographed for Mission Rabies", position: "center 40%" },
    quote: "Awesome work. A genuinely good job from the whole team.",
    highlight: "genuinely good job",
    clientName: "Namitha Nair",
    clientRole: "Marketing Coordinator",
    service: "Social Media Marketing",
  },
  {
    id: "get-secured",
    brand: "Get Secured",
    logo: { src: "/images/clients/mono/get-secured.png", width: 778, height: 187 },
    image: { src: "/images/case-studies/get-secured-brand-kit.jpg", alt: "Get Secured brand kit across stationery, signage and merchandise", position: "62% center" },
    quote: "Great work. We truly appreciate everything you put into this.",
    highlight: "truly appreciate",
    clientName: "Avydhut",
    clientRole: "Founder",
    service: "Logo & Brand Kit",
  },
];
