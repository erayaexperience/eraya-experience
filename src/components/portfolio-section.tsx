"use client";

import { useState } from 'react';
import Image from 'next/image';
import { ArrowRight, Award } from 'lucide-react';
import { Button } from './ui/button';

const PortfolioSection = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  const projects = [
    {
      id: 1,
      title: 'You And Me Anjuna',
      description: 'Restaurant social media transformation - 18.5% follower growth, 340% engagement increase',
      image: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1200',
      category: 'Social Media',
      metrics: { followers: '+18.5%', posts: '12', engagement: '+340%' },
      tags: ['Restaurant', 'Social Media']
    },
    {
      id: 2,
      title: 'Snow Park Goa',
      description: 'Entertainment venue marketing - 108 followers gained, 20% walk-in increase, 50M+ reach',
      image: 'https://images.pexels.com/photos/3184298/pexels-photo-3184298.jpeg?auto=compress&cs=tinysrgb&w=1200',
      category: 'Influencer Marketing',
      metrics: { followers: '+108', walkin: '+20%', reach: '50M+' },
      tags: ['Entertainment', 'Influencer Marketing']
    },
    {
      id: 3,
      title: 'Beach Walk Resort',
      description: 'Luxury resort digital transformation - 20,514% views increase, 57,953 accounts reached',
      image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1200',
      category: 'Digital Marketing',
      metrics: { views: '+20k%', reach: '57k', visits: '+19%' },
      tags: ['Hospitality', 'Digital Marketing']
    },
    {
      id: 4,
      title: 'F&B Industry Campaigns',
      description: 'Multiple restaurant and cafe marketing campaigns across Goa',
      image: 'https://images.pexels.com/photos/3184431/pexels-photo-3184431.jpeg?auto=compress&cs=tinysrgb&w=1200',
      category: 'Social Media',
      metrics: { campaigns: '25+', reach: '10M+', conversion: '+180%' },
      tags: ['F&B', 'Multi-brand']
    },
    {
      id: 5,
      title: 'Healthcare Sector',
      description: 'Digital presence building for healthcare and wellness brands',
      image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1200',
      category: 'Digital Marketing',
      metrics: { awareness: '+300%', leads: '+250%', trust: '95%' },
      tags: ['Healthcare', 'Trust Building']
    },
    {
      id: 6,
      title: 'Fashion & Lifestyle',
      description: 'Brand building and influencer partnerships for fashion brands',
      image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1200',
      category: 'Influencer Marketing',
      metrics: { partnerships: '50+', reach: '25M+', sales: '+220%' },
      tags: ['Fashion', 'Lifestyle']
    }
  ];

  const categories = ['All', 'Social Media', 'Influencer Marketing', 'Digital Marketing'];

  const filteredProjects = activeFilter === 'All'
    ? projects
    : projects.filter(project => project.category === activeFilter);

  return (
    <section id="portfolio" className="bg-[#f9f9f9] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block rounded-full border border-[#e5e5e7] bg-white px-4 py-2 text-xs font-medium uppercase tracking-wider text-gray-600 mb-6">
            Our Portfolio
          </span>
          <h2 className="text-3xl font-semibold text-gray-900 sm:text-4xl lg:text-5xl">
            Selected client work
          </h2>
          <p className="mt-4 mx-auto max-w-2xl text-lg text-gray-600">
            A cross-industry look at our most impactful launches spanning hospitality, entertainment, healthcare, and lifestyle.
          </p>

          {/* Filters */}
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${activeFilter === category
                    ? 'bg-[#162451] text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-[#e5e5e7]'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid gap-8 md:grid-cols-2">
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              className="group overflow-hidden rounded-2xl border border-[#e5e5e7] bg-white transition-shadow hover:shadow-md"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden sm:h-72">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 600px"
                />
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-white/95 px-3 py-1 text-xs font-medium text-gray-900 shadow-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 sm:p-8">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {project.title}
                    </h3>
                    <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                </div>

                {/* Metrics */}
                <div className="mt-6 grid grid-cols-3 gap-4 border-t border-[#e5e5e7] pt-6">
                  {Object.entries(project.metrics).map(([key, value]) => (
                    <div key={key}>
                      <p className="text-lg font-semibold text-[#162451]">
                        {value}
                      </p>
                      <p className="text-xs capitalize text-gray-500">
                        {key}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Clients */}
        <div className="mt-24 border-t border-[#e5e5e7] pt-16">
          <p className="text-center text-sm font-medium text-gray-500 mb-8">
            Trusted by leading brands across industries
          </p>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 opacity-60 grayscale transition-all hover:opacity-100 hover:grayscale-0">
            {[
              'Amazon', 'Myntra', 'Hotel DevDeep', 'Beach Walk', 'Xavier\'s Cafe', 'Mission Rabies',
              'Snow Park Goa', 'Koleso Lounge', 'Optica Indira', 'Thunder World', 'Carlito\'s', 'Dreamdays'
            ].map((client) => (
              <span key={client} className="text-lg font-semibold text-gray-800">
                {client}
              </span>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-20 text-center">
          <div className="mx-auto max-w-3xl rounded-2xl bg-[#162451] p-10 text-white sm:p-16">
            <h3 className="text-2xl font-semibold sm:text-3xl">
              Ready to join our success stories?
            </h3>
            <p className="mt-4 text-white/80 text-lg">
              Let's create something extraordinary together and transform your business.
            </p>
            <div className="mt-8">
              <Button asChild size="lg" className="bg-white text-[#162451] hover:bg-white/90">
                <a href="#contact" className="inline-flex items-center gap-2">
                  Start your project
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
