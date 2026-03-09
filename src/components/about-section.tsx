"use client";

import Image from 'next/image';
import { Award, Users, Target, MapPin } from 'lucide-react';

const AboutSection = () => {
  const stats = [
    { label: 'Years Experience', value: '6+', icon: Target },
    { label: 'Successfully Grown', value: '18+', icon: Award },
    { label: 'Creative Heads', value: '11+', icon: Users },
    { label: 'Pan India Reach', value: '100%', icon: MapPin },
  ];

  const industries = [
    {
      name: 'F&B',
      description: 'Restaurants, cafes, and food delivery services',
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      name: 'Hospitality',
      description: 'Hotels, resorts, and travel experiences',
      image: 'https://images.pexels.com/photos/3184298/pexels-photo-3184298.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      name: 'Healthcare',
      description: 'Medical services and wellness brands',
      image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      name: 'Fashion',
      description: 'Clothing, accessories, and lifestyle brands',
      image: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      name: 'Finance',
      description: 'Banking, investment, and financial services',
      image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      name: 'Utility/Stores',
      description: 'Retail, e-commerce, and utility services',
      image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
  ];

  const services = [
    'Social Media Management',
    'Influencer Marketing',
    'Hoardings',
    'Photoshoots',
    'ADS/Paid Marketing',
    'B2B',
    'Workshops',
    'ROI Marketing',
  ];

  return (
    <section id="about" className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-20">
          <span className="inline-block rounded-full border border-[#e5e5e7] bg-[#f9f9f9] px-4 py-2 text-xs font-medium uppercase tracking-wider text-gray-600 mb-6">
            About Eraya Experience
          </span>
          <h2 className="text-3xl font-semibold text-gray-900 sm:text-4xl lg:text-5xl">
            KPIs that matter
          </h2>
        </div>

        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          {/* Text Content */}
          <div>
            <p className="text-2xl font-medium leading-relaxed text-gray-900 sm:text-3xl">
              We help brands grow with social media management and influencer marketing that boost visibility.
            </p>
            <p className="mt-6 text-lg leading-relaxed text-gray-600">
              From eye-catching hoardings and creative photoshoots to result-driven ads and paid campaigns, we cover it all. Our B2B strategies and workshops build stronger connections, while our focus on ROI marketing ensures every effort delivers real growth.
            </p>

            {/* Stats Grid */}
            <div className="mt-12 grid grid-cols-2 gap-6">
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-xl border border-[#e5e5e7] bg-[#f9f9f9] p-6">
                  <stat.icon className="h-6 w-6 text-[#162451]" />
                  <p className="mt-4 text-3xl font-semibold text-gray-900">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-sm text-gray-600">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative h-[500px] overflow-hidden rounded-2xl border border-[#e5e5e7]">
              <Image
                src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Eraya Experience team at work"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 600px"
              />
            </div>
            {/* Floating Badge */}
            <div className="absolute -bottom-6 -left-6 rounded-xl border border-[#e5e5e7] bg-white p-6 shadow-lg hidden lg:block">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f9f9f9]">
                  <MapPin className="h-6 w-6 text-[#162451]" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Pan India</p>
                  <p className="text-sm text-gray-600">Reach & Presence</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Expertise */}
        <div className="mt-32">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-semibold text-gray-900">Our Expertise</h3>
            <p className="mt-4 text-lg text-gray-600">
              Comprehensive digital marketing services tailored to your business needs.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {services.map((service) => (
              <span
                key={service}
                className="rounded-full border border-[#e5e5e7] bg-white px-6 py-3 text-sm font-medium text-gray-700"
              >
                {service}
              </span>
            ))}
          </div>
        </div>

        {/* Industries */}
        <div className="mt-32">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-semibold text-gray-900">Industries We Serve</h3>
            <p className="mt-4 text-lg text-gray-600">
              Delivering tailored solutions across diverse sectors.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((industry) => (
              <div key={industry.name} className="group overflow-hidden rounded-xl border border-[#e5e5e7] bg-white">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={industry.image}
                    alt={industry.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 33vw, 400px"
                  />
                  <div className="absolute inset-0 bg-black/40 transition-opacity group-hover:bg-black/50" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h4 className="text-2xl font-medium text-white">{industry.name}</h4>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-sm text-gray-600">{industry.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
