import Navigation from '@/components/navigation';
import HeroSection from '@/components/hero-section';
import AboutSection from '@/components/about-section';
import KPIsSection from '@/components/kpis-section';
import ServicesSection from '@/components/services-section';
import CaseStudiesSection from '@/components/case-studies-section';
import ClientsSection from '@/components/clients-section';
import PressSection from '@/components/press-section';
import GraphicsSection from '@/components/graphics-section';
import ContactSection from '@/components/contact-section';
import Footer from '@/components/footer';

export default function Home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': 'https://erayaexperience.com/#website',
        url: 'https://erayaexperience.com',
        name: 'Eraya Experience',
        description:
          'Premier digital marketing & creative agency based in Goa, specializing in social media management, influencer campaigns, and ROI marketing across India.',
        inLanguage: 'en-IN',
      },
      {
        '@type': ['ProfessionalService', 'MarketingAgency', 'LocalBusiness'],
        '@id': 'https://erayaexperience.com/#organization',
        name: 'Eraya Experience',
        url: 'https://erayaexperience.com',
        logo: 'https://erayaexperience.com/logo-small.png',
        image: 'https://erayaexperience.com/logo-small.png',
        description:
          'We craft human-first brand experiences that merge strategy, storytelling, and premium execution. From social media management to Pan-India ROI marketing.',
        telephone: '+918208664702',
        email: 'info.erayaexp@gmail.com',
        priceRange: '$$',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Porvorim',
          addressRegion: 'Goa',
          addressCountry: 'IN',
        },
        areaServed: {
          '@type': 'Country',
          name: 'India',
        },
        founders: [
          {
            '@type': 'Person',
            name: 'Alizah',
            jobTitle: 'Founder',
            image: 'https://erayaexperience.com/images/Alizah.PNG',
          },
          {
            '@type': 'Person',
            name: 'Siddharth Gopal',
            jobTitle: 'Co-Founder',
            image: 'https://erayaexperience.com/images/Siddharth.PNG',
          },
        ],
        sameAs: ['https://www.instagram.com/erayaexperience/'],
        knowsAbout: [
          'Graphic Design',
          'Logo Design',
          'Photoshoots',
          'Social Media Marketing',
          'Meta Ads',
          'Google Ads',
          'Influencer Marketing',
          'Brand Kits',
          'Web Design',
          'SEO',
        ],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Marketing & Creative Services',
          itemListElement: [
            ...[
              ['Graphic & Logo Design', 'Logos, posters and campaign graphics, recognised in a second and remembered long after.'],
              ['Photoshoots', 'Food, drinks, fashion and lifestyle shoots that make the product the hero of every frame.'],
              ['Social Media Marketing', 'Pages planned around the audience and the goal: consistent, aesthetic and on brand.'],
              ['Meta & Google Ads', 'Paid campaigns built around return, with every rupee tracked.'],
              ['Influencer Marketing', 'The right creators, matched to the audience so people talk, share and show up.'],
              ['Brand Kits', 'Logo, colours, type and branded essentials in one complete kit.'],
              ['Website & SEO', 'Fast, beautiful websites built to rank on Google and turn visitors into customers.'],
            ].map(([name, description]) => ({
              '@type': 'Offer',
              itemOffered: { '@type': 'Service', name, description },
            })),
          ],
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main id="top" className="min-h-screen bg-white">
        <Navigation />
        <HeroSection />
        <KPIsSection />
        <AboutSection />
        <PressSection />
        <ServicesSection />
        <CaseStudiesSection />
        <GraphicsSection />
        <ClientsSection />
        <ContactSection />
        <Footer />
      </main>
    </>
  );
}
