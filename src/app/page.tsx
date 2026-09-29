import Navigation from '@/components/navigation';
import HeroSection from '@/components/hero-section';
import AboutSection from '@/components/about-section';
import KPIsSection from '@/components/kpis-section';
import AchievementsSection from '@/components/achievements-section';
import ServicesSection from '@/components/services-section';
import CaseStudiesSection from '@/components/case-studies-section';
import ClientsSection from '@/components/clients-section';
import PortfolioSection from '@/components/portfolio-section';
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
        telephone: '+919272166475',
        email: 'ino.erayaexp@gmail.com',
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
            name: 'Siddharth',
            jobTitle: 'Co-Founder',
            image: 'https://erayaexperience.com/images/Siddharth.PNG',
          },
        ],
        sameAs: ['https://www.instagram.com/erayaexperience/'],
        knowsAbout: [
          'Social Media Management',
          'Influencer Marketing',
          'Performance Marketing',
          'Paid Advertising',
          'Creative Photoshoots',
          'Out-Of-Home & Hoardings Advertising',
          'B2B Strategy',
          'ROI Marketing',
        ],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Marketing & Creative Services',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Social Media Management',
                description: 'End-to-end brand management, curation, and organic community growth.',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Influencer Marketing',
                description: 'Curated creator alignments that cultivate authentic brand trust.',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Performance & Paid Ads',
                description: 'Hyper-targeted ad campaigns engineered for measurable ROI.',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Hoardings & Offline Presence',
                description: 'Strategic out-of-home advertising bridging digital and physical landscapes.',
              },
            },
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
        <AchievementsSection />
        <ServicesSection />
        <CaseStudiesSection />
        <ClientsSection />
        <PortfolioSection />
        <ContactSection />
        <Footer />
      </main>
    </>
  );
}
