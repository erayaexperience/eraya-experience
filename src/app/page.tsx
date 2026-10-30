import Navigation from '@/components/navigation';
import HeroSection from '@/components/hero-section';
import AboutSection from '@/components/about-section';
import KPIsSection from '@/components/kpis-section';
import ServicesSection from '@/components/services-section';
import CaseStudiesSection from '@/components/case-studies-section';
import ClientsSection from '@/components/clients-section';
import PressSection from '@/components/press-section';
import EventsSection from '@/components/events-section';
import CreatorsSection from '@/components/creators-section';
import GraphicsSection from '@/components/graphics-section';
import TestimonialsSection from '@/components/testimonials-section';
import FaqSection from '@/components/faq-section';
import ContactSection from '@/components/contact-section';
import Footer from '@/components/footer';
import { structuredDataJson } from '@/lib/structured-data';

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: structuredDataJson }}
      />
      <main id="top" className="min-h-screen bg-white">
        <Navigation />
        <div className="relative">
          <HeroSection />
          <KPIsSection />
          <AboutSection />
        </div>
        <PressSection />
        <EventsSection />
        <CreatorsSection />
        <ServicesSection />
        <CaseStudiesSection />
        <GraphicsSection />
        <ClientsSection />
        <TestimonialsSection />
        <FaqSection />
        <ContactSection />
        <Footer />
      </main>
    </>
  );
}
