import Navigation from '@/components/navigation';
import HeroSection from '@/components/hero-section';
import ServicesSection from '@/components/services-section';
import CaseStudiesSection from '@/components/case-studies-section';
import PortfolioSection from '@/components/portfolio-section';
import AboutSection from '@/components/about-section';
import ContactSection from '@/components/contact-section';
import Footer from '@/components/footer';

export default function Home() {
  return (
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
  );
}
