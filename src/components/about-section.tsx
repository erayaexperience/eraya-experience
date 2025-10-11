"use client";

import { Award, Users, Target, Lightbulb, Heart, Zap, MapPin } from 'lucide-react';
import Heading from './ui/heading';
import Badge from './ui/badge';

const AboutSection = () => {
  const stats = [
    { label: 'Years Experience', value: '6+', icon: Target },
    { label: 'Successfully Grown', value: '18+', icon: Award },
    { label: 'Creative Heads', value: '11+', icon: Users },
    { label: 'Pan India Reach', value: '100%', icon: MapPin }
  ];

  const industries = [
    {
      name: 'F&B',
      description: 'Restaurants, cafes, and food delivery services',
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      name: 'Hospitality',
      description: 'Hotels, resorts, and travel experiences',
      image: 'https://images.pexels.com/photos/3184298/pexels-photo-3184298.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      name: 'Healthcare',
      description: 'Medical services and wellness brands',
      image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      name: 'Fashion',
      description: 'Clothing, accessories, and lifestyle brands',
      image: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      name: 'Finance',
      description: 'Banking, investment, and financial services',
      image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      name: 'Utility/Stores',
      description: 'Retail, e-commerce, and utility services',
      image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  const services = [
    'Social Media Management',
    'Influencer Marketing',
    'Hoardings',
    'Photoshoots',
    'ADS/Paid Marketing',
    'B2B',
    'Workshops',
    'ROI Marketing'
  ];

  return (
    <section id="about" className="section-padding bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-eraya-beige/10 rounded-full filter blur-3xl"></div>

      <div className="container-modern">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="mb-8">
            <Badge icon={<Zap className="w-4 h-4 mr-2 text-eraya-navy/60" />}>About Eraya Experience</Badge>
          </div>

          <Heading as="h2" before="KPI's about " gradient="ErayaExp" />
        </div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
          <div>
            <p className="text-2xl md:text-3xl text-eraya-navy/80 mb-8 font-light leading-relaxed">
              We help brands grow with social media management and influencer marketing that boost visibility.
            </p>
            <p className="text-lg text-eraya-navy/60 mb-12 font-light leading-relaxed">
              From eye-catching hoardings and creative photoshoots to result-driven ads and paid campaigns, we cover it all. Our B2B strategies and workshops build stronger connections, while our focus on ROI marketing ensures every effort delivers real growth.
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="group text-center p-6 hover:bg-eraya-navy/5 rounded-2xl transition-all duration-300">
                  <stat.icon className="w-8 h-8 text-eraya-navy/40 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <div className="text-4xl font-extralight text-eraya-navy mb-2 group-hover:scale-105 transition-transform duration-300">
                    {stat.value}
                  </div>
                  <div className="text-eraya-navy/60 font-medium text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="image-reveal rounded-3xl overflow-hidden shadow-xl shadow-black/10">
              <img
                src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Eraya Experience team at work"
                className="w-full h-[600px] object-cover"
              />
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-8 -left-8 glass-effect rounded-2xl p-6 floating-element">
              <div className="flex items-center">
                <Award className="w-6 h-6 text-eraya-navy/60 mr-3" />
                <div>
                  <div className="font-medium text-eraya-navy">Pan India</div>
                  <div className="text-sm text-eraya-navy/60">Reach & Presence</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Services Section */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <h3 className="text-4xl md:text-5xl font-light text-eraya-navy mb-6">
              Our expertise
            </h3>
            <p className="text-lg text-eraya-navy/60 max-w-2xl mx-auto font-light leading-relaxed">
              Comprehensive digital marketing services tailored to your business needs.
            </p>
          </div>

          <div className="bg-eraya-navy rounded-3xl p-12 text-center">
            <div className="flex flex-wrap justify-center gap-4">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="px-6 py-3 bg-eraya-beige text-eraya-navy rounded-full font-medium hover:scale-105 transition-transform duration-300"
                >
                  {service}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Industries Section */}
        <div className="text-center">
          <h3 className="text-4xl md:text-5xl font-light text-eraya-navy mb-6">
            Industries we have worked in
          </h3>
          <p className="text-lg text-eraya-navy/60 max-w-2xl mx-auto font-light leading-relaxed mb-16">
            Our diverse portfolio spans across multiple industries, delivering tailored solutions for each sector.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {industries.map((industry, index) => (
              <div key={index} className="group modern-card overflow-hidden">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={industry.image}
                    alt={industry.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-eraya-navy/60 via-eraya-navy/20 to-transparent"></div>

                  <div className="absolute inset-0 flex items-center justify-center">
                    <h4 className="text-2xl font-medium text-white">{industry.name}</h4>
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-eraya-navy/60 font-light text-sm leading-relaxed">
                    {industry.description}
                  </p>
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