export type NavLink = {
    name: string;
    href: string;
    description: string;
    image: string;
};

export type NavGroup =
    | { name: string; href: string; children?: undefined }
    | { name: string; href?: undefined; children: NavLink[] };

export const navGroups: NavGroup[] = [
    {
        name: "Studio",
        children: [
            { name: "About", href: "#about", description: "Who we are and how we work", image: "/images/alizah-alam.png" },
            { name: "Press", href: "#press", description: "Features on our work and founders", image: "/images/press/times-of-india-goa-times.jpg" },
            { name: "Testimonials", href: "#testimonials", description: "Our partners, in their own words", image: "/images/graphics/mission-rabies-pune-team.jpg" },
            { name: "FAQ", href: "#faq", description: "What brands ask before we begin", image: "/images/gopal-walawalkar.png" },
        ],
    },
    { name: "Services", href: "#services" },
    {
        name: "Work",
        children: [
            { name: "Case Studies", href: "#case-studies", description: "Real brands, real numbers", image: "/images/case-studies/snow-park-goa.jpg" },
            { name: "Portfolio", href: "#portfolio", description: "Posters, campaigns and brand feeds", image: "/images/graphics/lilliput-saturday-blockbuster.jpg" },
            { name: "Events", href: "#events", description: "Moments that moved crowds", image: "/images/events/istoria/1.jpeg" },
        ],
    },
    { name: "Creators", href: "#creators" },
];

export const sectionIds = ["about", "press", "events", "creators", "services", "case-studies", "portfolio", "testimonials", "faq", "contact"];
