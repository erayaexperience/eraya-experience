"use client";

import {
  Users,
  Camera,
  TrendingUp,
  Megaphone,
  Search,
  Globe,
  ArrowRight
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from './ui/button';

const ServicesSection = () => {
  const services = [
    {
      icon: Users,
      title: 'Influencer Marketing',
      description: 'High engagement campaigns with authentic influencer partnerships that drive real results.',
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      icon: Camera,
      title: 'Social Media Marketing',
      description: 'Graphics, paid ads, and professional content that captures attention and drives engagement.',
      image: 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      icon: Megaphone,
      title: 'Hoardings & Offline Marketing',
      description: 'Strategic outdoor advertising placements for maximum brand visibility.',
      image: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      icon: TrendingUp,
      title: 'Performance Marketing',
      description: 'Data-driven campaigns focused on ROI and measurable business growth.',
      image: 'https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      icon: Globe,
      title: 'Website & SEO',
      description: 'Professional websites optimized for search engines and user experience.',
      image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      icon: Search,
      title: 'Event Curation',
      description: 'Strategic event planning and B2B networking for brand activation.',
      image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800',
    }
  ];

  return (
    <section id="services" className="bg-[#f9f9f9] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block rounded-full border border-[#e5e5e7] bg-white px-4 py-2 text-xs font-medium uppercase tracking-wider text-gray-600 mb-6">
            Our Services
          </span>
          <h2 className="text-3xl font-semibold text-gray-900 sm:text-4xl lg:text-5xl">
            Services that drive growth
          </h2>
          <p className="mt-4 mx-auto max-w-2xl text-lg text-gray-600">
            A focused suite of marketing services designed to help modern brands succeed.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <article
              key={index}
              className="group overflow-hidden rounded-xl border border-[#e5e5e7] bg-white transition-shadow hover:shadow-md"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                />
                {/* Icon Badge */}
                <div className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-lg bg-white">
                  <service.icon className="h-5 w-5 text-[#162451]" />
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                  {service.description}
                </p>
                <Link
                  href="#contact"
                  className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[#162451] hover:underline"
                >
                  Learn more
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <div className="mx-auto max-w-2xl rounded-xl border border-[#e5e5e7] bg-white p-8 lg:p-12">
            <h3 className="text-2xl font-semibold text-gray-900">
              Ready to grow your brand?
            </h3>
            <p className="mt-3 text-gray-600">
              Let's discuss how we can help you achieve your marketing goals.
            </p>
            <div className="mt-6">
              <Button asChild size="lg">
                <Link href="#contact" className="inline-flex items-center gap-2">
                  Start a project
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
