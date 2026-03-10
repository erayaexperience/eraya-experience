import Navigation from '@/components/navigation';
import HeroSection from '@/components/hero-section';
import ServicesSection from '@/components/services-section';
import CaseStudiesSection from '@/components/case-studies-section';
import PortfolioSection from '@/components/portfolio-section';
import AboutSection from '@/components/about-section';
import ContactSection from '@/components/contact-section';
import Footer from '@/components/footer';

export default function Home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': ['ProfessionalService', 'MarketingAgency', 'LocalBusiness'],
    name: 'Eraya Experience',
    description: 'We help brands grow with strategic social media management, influencer marketing, and bespoke campaigns across Pan India.',
    url: 'https://erayaexperience.com',
    logo: 'https://erayaexperience.com/logo-small.png',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Porvorim',
      addressRegion: 'Goa',
      addressCountry: 'IN'
    },
    telephone: '+919272166475',
    email: 'ino.erayaexp@gmail.com',
    sameAs: [
      'https://www.instagram.com/erayaexperience/'
    ],
    priceRange: '$$',
    areaServed: {
      '@type': 'Country',
      name: 'India'
    }
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
        <ServicesSection />
        <CaseStudiesSection />
        <PortfolioSection />
        <AboutSection />
        <ContactSection />
        <Footer />
      </main>
    </>
  );
}
