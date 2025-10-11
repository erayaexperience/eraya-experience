"use client";

import { useState } from 'react';
import { ExternalLink, ArrowUpRight, Award, Users, TrendingUp } from 'lucide-react';
import Heading from './ui/heading';
import Badge from './ui/badge';

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
    <section id="portfolio" className="section-padding bg-gradient-to-br from-eraya-beige/5 via-white to-eraya-beige/10 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-eraya-navy/5 rounded-full filter blur-3xl"></div>

      <div className="container-modern">
        <div className="text-center mb-20">
          <div className="mb-8">
            <Badge icon={<Award className="w-4 h-4 mr-2 text-eraya-navy/60" />}>Our Portfolio</Badge>
          </div>

          <Heading
            as="h2"
            before="Our "
            gradient="client work"
            subtitle="Explore our successful campaigns across various industries - from restaurants to resorts, entertainment to healthcare."
          />
          <div className="h-6 md:h-8"></div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`px-8 py-3 rounded-full text-sm font-medium transition-all duration-300 ${activeFilter === category
                  ? 'bg-eraya-navy text-white shadow-md shadow-eraya-navy/20'
                  : 'bg-white text-eraya-navy border border-eraya-navy/10 hover:bg-eraya-navy/5'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className="group modern-card overflow-hidden cursor-pointer"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-eraya-navy/60 via-eraya-navy/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

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
                    <button className="flex items-center text-white font-medium group/btn">
                      View case study
                      <ArrowUpRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform duration-300" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-8">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-2xl font-medium text-eraya-navy group-hover:text-eraya-navy/80 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <ExternalLink className="w-5 h-5 text-eraya-navy/40 group-hover:text-eraya-navy/60 group-hover:scale-110 transition-all duration-300" />
                </div>

                <p className="text-eraya-navy/60 font-light leading-relaxed mb-8">
                  {project.description}
                </p>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-4">
                  {Object.entries(project.metrics).map(([key, value], metricIndex) => (
                    <div key={metricIndex} className="text-center p-4 bg-eraya-navy/5 rounded-xl">
                      <div className="text-lg font-medium text-eraya-navy mb-1">{value}</div>
                      <div className="text-xs text-eraya-navy/50 capitalize">{key}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Client Logos Section */}
        <div className="mt-32">
          <div className="text-center mb-16">
            <h3 className="text-4xl md:text-5xl font-light text-eraya-navy mb-6">
              Our clients
            </h3>
            <p className="text-lg text-eraya-navy/60 max-w-2xl mx-auto font-light leading-relaxed">
              Trusted by leading brands across various industries.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center opacity-60 hover:opacity-100 transition-opacity duration-500">
            {[
              'Amazon', 'Myntra', 'Hotel DevDeep', 'Beach Walk', 'Xavier\'s Cafe', 'Mission Rabies',
              'Snow Park Goa', 'Koleso Lounge', 'Optica Indira', 'Thunder World', 'Carlito\'s', 'Dreamdays'
            ].map((client, index) => (
              <div key={index} className="text-center p-4 hover:scale-110 transition-transform duration-300">
                <div className="text-eraya-navy font-medium text-sm">{client}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-20">
          <div className="glass-effect rounded-3xl p-12 max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <Users className="w-8 h-8 text-eraya-navy/60 mr-3" />
              <TrendingUp className="w-8 h-8 text-eraya-navy/60" />
            </div>
            <h3 className="text-3xl md:text-4xl font-light text-eraya-navy mb-6">
              Ready to join our success stories?
            </h3>
            <p className="text-lg text-eraya-navy/60 mb-8 font-light leading-relaxed">
              Let's create something extraordinary together and transform your business.
            </p>
            <button className="modern-button modern-button-primary group text-lg">
              Start your project
              <ArrowUpRight className="ml-3 h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;