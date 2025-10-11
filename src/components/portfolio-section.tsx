"use client";

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ExternalLink, ArrowUpRight, Award, Users, TrendingUp } from 'lucide-react';
import Heading from './ui/heading';
import Badge from './ui/badge';
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
      tags: ['Restaurant', 'Social Media', 'Content Creation', 'Influencer Marketing']
    },
    {
      id: 2,
      title: 'Snow Park Goa',
      description: 'Entertainment venue marketing - 108 followers gained, 20% walk-in increase, 50M+ reach',
      image: 'https://images.pexels.com/photos/3184298/pexels-photo-3184298.jpeg?auto=compress&cs=tinysrgb&w=1200',
      category: 'Influencer Marketing',
      metrics: { followers: '+108', walkin: '+20%', reach: '50M+' },
      tags: ['Entertainment', 'Influencer Marketing', 'Social Media', 'ROI Marketing']
    },
    {
      id: 3,
      title: 'Beach Walk Resort',
      description: 'Luxury resort digital transformation - 20,514% views increase, 57,953 accounts reached',
      image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1200',
      category: 'Digital Marketing',
      metrics: { views: '+20,514%', reach: '57,953', visits: '+19.1%' },
      tags: ['Hospitality', 'Digital Marketing', 'Content Strategy', 'Brand Awareness']
    },
    {
      id: 4,
      title: 'F&B Industry Campaigns',
      description: 'Multiple restaurant and cafe marketing campaigns across Goa',
      image: 'https://images.pexels.com/photos/3184431/pexels-photo-3184431.jpeg?auto=compress&cs=tinysrgb&w=1200',
      category: 'Social Media',
      metrics: { campaigns: '25+', reach: '10M+', conversion: '+180%' },
      tags: ['F&B', 'Multi-brand', 'Social Media', 'Performance Marketing']
    },
    {
      id: 5,
      title: 'Healthcare Sector',
      description: 'Digital presence building for healthcare and wellness brands',
      image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1200',
      category: 'Digital Marketing',
      metrics: { awareness: '+300%', leads: '+250%', trust: '95%' },
      tags: ['Healthcare', 'Trust Building', 'Digital Presence', 'Lead Generation']
    },
    {
      id: 6,
      title: 'Fashion & Lifestyle',
      description: 'Brand building and influencer partnerships for fashion brands',
      image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1200',
      category: 'Influencer Marketing',
      metrics: { partnerships: '50+', reach: '25M+', sales: '+220%' },
      tags: ['Fashion', 'Lifestyle', 'Influencer Marketing', 'Brand Building']
    }
  ];

  const categories = ['All', 'Social Media', 'Influencer Marketing', 'Digital Marketing'];

  const filteredProjects = activeFilter === 'All'
    ? projects
    : projects.filter(project => project.category === activeFilter);

  return (
    <section
      id="portfolio"
      className="section-padding relative overflow-hidden bg-gradient-to-b from-white via-[#f5f5f7] to-white"
    >
      {/* Background decoration */}
      <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-primary/12 blur-3xl" />

      <div className="container-modern">
        <div className="text-center mb-20">
          <div className="mb-8">
            <Badge icon={<Award className="mr-2 h-4 w-4 text-secondary/70" />} className="mx-auto">
              Our Portfolio
            </Badge>
          </div>

          <Heading
            as="h2"
            before="Our "
            gradient="client work"
            subtitle="A cross-industry look at Apple-inspired launches spanning hospitality, entertainment, healthcare, and lifestyle."
          />
          <div className="h-6 md:h-8"></div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => {
              const isActive = activeFilter === category;
              return (
                <Button
                  key={category}
                  type="button"
                  size="sm"
                  variant={isActive ? 'default' : 'subtle'}
                  className={`rounded-full px-6 ${isActive ? '' : 'text-foreground/70'}`}
                  onClick={() => setActiveFilter(category)}
                >
                  {category}
                </Button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {filteredProjects.map((project) => (
            <motion.article
              key={project.id}
              className="group modern-card flex h-full flex-col overflow-hidden cursor-pointer"
              whileHover={{ y: -8 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              <div className="relative overflow-hidden">
                <div className="relative h-72 w-full sm:h-80">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 520px"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-primary/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>

                {/* Overlay content */}
                <div className="absolute inset-0 flex items-end p-8 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="text-white">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag, tagIndex) => (
                        <span key={tagIndex} className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <button type="button" className="flex items-center text-white font-medium group/btn cursor-pointer">
                      View case study
                      <ArrowUpRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform duration-300" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex flex-1 flex-col justify-between p-8">
                <div className="mb-4 flex items-start justify-between">
                  <h3 className="text-2xl font-semibold text-foreground transition-colors duration-300 group-hover:text-foreground/80">
                    {project.title}
                  </h3>
                  <ExternalLink className="h-5 w-5 text-secondary/40 transition-all duration-300 group-hover:scale-110 group-hover:text-secondary/70" />
                </div>

                <p className="mb-8 text-sm leading-relaxed text-foreground/65">
                  {project.description}
                </p>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-4">
                  {Object.entries(project.metrics).map(([key, value], metricIndex) => (
                    <div
                      key={metricIndex}
                      className="rounded-[20px] border border-[rgba(209,209,214,0.5)] bg-white/90 p-4 text-center shadow-[0_16px_32px_rgba(15,23,42,0.08)]"
                    >
                      <div className="mb-1 text-lg font-semibold text-foreground">{value}</div>
                      <div className="text-xs capitalize text-foreground/55">{key}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Client Logos Section */}
        <div className="mt-32">
          <div className="mb-16 text-center">
            <h3 className="mb-6 text-4xl font-semibold text-foreground md:text-5xl">
              Our clients
            </h3>
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-foreground/60">
              Trusted by leading brands across various industries.
            </p>
          </div>

          <div className="grid grid-cols-2 items-center gap-8 opacity-60 transition-opacity duration-500 hover:opacity-100 md:grid-cols-4 lg:grid-cols-6">
            {[
              'Amazon', 'Myntra', 'Hotel DevDeep', 'Beach Walk', 'Xavier\'s Cafe', 'Mission Rabies',
              'Snow Park Goa', 'Koleso Lounge', 'Optica Indira', 'Thunder World', 'Carlito\'s', 'Dreamdays'
            ].map((client, index) => (
              <div key={index} className="rounded-[20px] bg-white/75 p-4 text-center shadow-[0_12px_26px_rgba(15,23,42,0.08)] transition-transform duration-300 hover:scale-110">
                <div className="text-sm font-semibold text-foreground/70">{client}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <div className="glass-effect mx-auto max-w-4xl rounded-3xl p-12 shadow-[0_20px_48px_rgba(15,23,42,0.12)]">
            <div className="mb-6 flex items-center justify-center">
              <Users className="mr-3 h-8 w-8 text-secondary/70" />
              <TrendingUp className="h-8 w-8 text-secondary/70" />
            </div>
            <h3 className="mb-6 text-3xl font-semibold text-foreground md:text-4xl">
              Ready to join our success stories?
            </h3>
            <p className="mb-8 text-lg leading-relaxed text-foreground/65">
              Let&apos;s create something extraordinary together and transform your business.
            </p>
            <Button size="lg" className="group inline-flex items-center justify-center gap-3 w-full sm:w-auto">
              Start your project
              <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;







