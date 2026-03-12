"use client";

import { useState } from 'react';
import Image from 'next/image';
import { FiArrowRight, FiAward } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';
import { SectionHeading } from './ui/section-heading';

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
      tags: ['Entertainment', 'Influencer']
    },
    {
      id: 3,
      title: 'Beach Walk Resort',
      description: 'Luxury resort digital transformation - 20,514% views increase, 57,953 accounts reached',
      image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1200',
      category: 'Digital Marketing',
      metrics: { views: '+20k%', reach: '57k', visits: '+19%' },
      tags: ['Hospitality', 'Digital']
    },
    {
      id: 4,
      title: 'F&B Industry Campaigns',
      description: 'Multiple restaurant and cafe marketing campaigns strategically executed across Goa',
      image: 'https://images.pexels.com/photos/3184431/pexels-photo-3184431.jpeg?auto=compress&cs=tinysrgb&w=1200',
      category: 'Social Media',
      metrics: { campaigns: '25+', reach: '10M+', conversion: '+180%' },
      tags: ['F&B', 'Multi-brand']
    },
    {
      id: 5,
      title: 'Healthcare Sector',
      description: 'Digital presence building and trust cultivation for healthcare and wellness brands',
      image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1200',
      category: 'Digital Marketing',
      metrics: { awareness: '+300%', leads: '+250%', trust: '95%' },
      tags: ['Healthcare', 'Corporate']
    },
    {
      id: 6,
      title: 'Fashion & Lifestyle',
      description: 'Premium brand building and influencer partnerships for bespoke fashion brands',
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
    <section id="portfolio" className="bg-white py-section">
      <div className="container-modern">
        {/* Header */}
        <SectionHeading
          subtitle="Our Portfolio"
          title={
            <>
              Featured <span className="text-primary italic font-serif">Client Work</span>
            </>
          }
          description="A cross-industry look at our most impactful launches spanning hospitality, entertainment, healthcare, and lifestyle."
          layout="center"
        />

        {/* Filters */}
        <motion.div
          className="mt-component flex flex-wrap justify-center gap-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`relative px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${activeFilter === category
                ? 'text-white shadow-md'
                : 'text-foreground/70 hover:text-foreground hover:bg-foreground/5 bg-white border border-border/50'
                }`}
            >
              {activeFilter === category && (
                <motion.div
                  layoutId="activeFilter"
                  className="absolute inset-0 bg-secondary rounded-full -z-10"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              {category}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid gap-8 md:grid-cols-2"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.article
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="group flex flex-col overflow-hidden rounded-3xl border border-border/40 bg-white hover:shadow-2xl hover:shadow-primary/5 transition-shadow duration-500"
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden sm:h-100">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 600px"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-60" />
                  <div className="absolute top-6 left-6 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="rounded-full bg-white/20 backdrop-blur-md border border-white/20 px-4 py-1.5 text-xs font-medium text-white shadow-sm tracking-wide">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col grow p-8 sm:p-10">
                  <h3 className="text-2xl font-medium text-foreground mb-3 group-hover:text-secondary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-foreground/70 font-light leading-relaxed mb-8 grow">
                    {project.description}
                  </p>

                  {/* Metrics */}
                  <div className="grid grid-cols-3 gap-6 border-t border-border/60 pt-6">
                    {Object.entries(project.metrics).map(([key, value]) => (
                      <div key={key}>
                        <p className="text-xl font-medium tracking-tight text-secondary">
                          {value}
                        </p>
                        <p className="text-xs uppercase tracking-wider text-foreground/50 mt-1">
                          {key}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
};

export default PortfolioSection;
