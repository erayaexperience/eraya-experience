"use client";

import { useState } from 'react';
import { ArrowUpRight, TrendingUp, Users, Eye, Heart, MessageCircle, Share2, Target, Award } from 'lucide-react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useRef } from 'react';
import Heading from './ui/heading';
import Badge from './ui/badge';

const CaseStudiesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCase, setActiveCase] = useState(0);

  const caseStudies = [
    {
      id: 1,
      title: "You And Me Anjuna",
      subtitle: "Restaurant Social Media Transformation",
      category: "Social Media Marketing",
      challenge: "The client wanted to increase the reach and awareness of his restaurant",
      hurdles: "The client was not able to give a shoot date due to which the content had to be generated using stock images and stock content",
      image: "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1200",
      beforeAfter: {
        before: {
          posts: 34,
          followers: 54,
          following: 36
        },
        after: {
          posts: 48,
          followers: 64,
          following: 13
        }
      },
      results: [
        "Optimised and set their GMB",
        "Reworked the Feed",
        "Make attractive creatives",
        "Optimized the account",
        "Gained 10 organic followers",
        "12 postings done",
        "Any number from 0-9 for a timer",
        "Redesigned the highlights"
      ],
      metrics: {
        followerGrowth: "+18.5%",
        engagement: "+340%",
        reach: "10K+",
        posts: "12"
      },
      services: ["Social Media Management", "Content Creation", "GMB Optimization", "Account Setup"],
      duration: "3 months",
      roi: "High engagement & walk-in"
    },
    {
      id: 2,
      title: "Snow Park Goa",
      subtitle: "Entertainment Venue Marketing Campaign",
      category: "Influencer Marketing",
      challenge: "Increase follower count, create brand reach, and bring walk-in/client brand awareness",
      solution: "Comprehensive social media and influencer marketing campaign focusing on ROI marketing",
      image: "https://images.pexels.com/photos/3184298/pexels-photo-3184298.jpeg?auto=compress&cs=tinysrgb&w=1200",
      beforeAfter: {
        before: {
          followers: 1289,
          walkIn: "50%",
          engagement: "Low"
        },
        after: {
          followers: 1397,
          walkIn: "70%",
          engagement: "High"
        }
      },
      results: [
        "108 followers gained organically",
        "20% increase in walk-in traffic",
        "50M+ reach through influencer campaigns",
        "High engagement rate achieved",
        "Brand awareness significantly increased"
      ],
      metrics: {
        followerGrowth: "+108",
        walkInIncrease: "+20%",
        reach: "50M+",
        engagement: "High"
      },
      services: ["Influencer Marketing", "Social Media Marketing", "ROI Marketing", "Brand Awareness"],
      duration: "4 months",
      roi: "High engagement & walk in & visibility"
    },
    {
      id: 3,
      title: "Beach Walk Resort",
      subtitle: "Luxury Resort Digital Transformation",
      category: "Digital Marketing",
      challenge: "Transform digital presence for luxury resort and increase bookings",
      solution: "Comprehensive digital marketing strategy with professional content creation",
      image: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1200",
      beforeAfter: {
        before: {
          posts: 74,
          followers: 234,
          following: 163,
          views: "390"
        },
        after: {
          posts: 89,
          followers: 296,
          following: 172,
          views: "80,404"
        }
      },
      results: [
        "Profile activity increased by 619 (+26.8%)",
        "Profile visits: 579 (+19.1%)",
        "External link taps: 40 (+1,900%)",
        "Views increased to 80,404",
        "87.5% views from ads",
        "Accounts reached: 57,953 (+2,672%)"
      ],
      metrics: {
        viewsIncrease: "+20,514%",
        profileVisits: "+19.1%",
        linkTaps: "+1,900%",
        reach: "57,953"
      },
      services: ["Digital Marketing", "Content Strategy", "Paid Advertising", "Profile Optimization"],
      duration: "6 months",
      roi: "High engagement & traction"
    }
  ];

  const campaignGoals = [
    {
      icon: Users,
      title: "Increase Follower Count",
      description: "Organic growth through engaging content"
    },
    {
      icon: Target,
      title: "Create Brand Reach",
      description: "Expand visibility across target demographics"
    },
    {
      icon: TrendingUp,
      title: "Bring Walk In/Client Brand Awareness",
      description: "Convert online engagement to real business"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <section id="case-studies" className="section-padding relative overflow-hidden" ref={ref}>
      {/* Background decoration */}
      <motion.div
        className="absolute top-1/4 right-0 w-96 h-96 morphing-blob"
        style={{
          background: 'linear-gradient(135deg, rgba(22, 36, 81, 0.08) 0%, rgba(214, 182, 133, 0.05) 100%)',
          filter: 'blur(80px)'
        }}
        animate={{
          x: [0, -50, 0],
          y: [0, 30, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="container-modern">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div variants={itemVariants} className="mb-8">
            <Badge icon={<Award className="w-4 h-4 mr-2 text-eraya-navy/60" />}>Case Studies</Badge>
          </motion.div>

          <Heading
            as="h2"
            before="Real "
            gradient="results"
            after=" for real clients"
            subtitle="Discover how we've helped businesses achieve remarkable growth through strategic digital marketing campaigns."
          />
        </motion.div>

        {/* Campaign Goals */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <motion.h3
            className="text-3xl md:text-4xl font-light text-eraya-navy mb-12 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            Campaign Goals
          </motion.h3>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {campaignGoals.map((goal, index) => (
              <motion.div
                key={index}
                className="liquid-card rounded-3xl p-8 text-center group"
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <motion.div
                  className="w-16 h-16 bg-eraya-navy rounded-2xl flex items-center justify-center mx-auto mb-6"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <goal.icon className="w-8 h-8 text-white" />
                </motion.div>
                <h4 className="text-xl font-medium text-eraya-navy mb-4">{goal.title}</h4>
                <p className="text-eraya-navy/60 font-light leading-relaxed">{goal.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Case Study Navigation */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 md:gap-4 mb-12 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          role="tablist"
          aria-label="Case studies"
        >
          {caseStudies.map((study, index) => (
            <motion.button
              key={study.id}
              onClick={() => setActiveCase(index)}
              className={`px-5 md:px-7 py-3 md:py-4 rounded-2xl font-medium transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-eraya-navy/30 ${activeCase === index
                ? 'liquid-button text-white'
                : 'liquid-glass hairline-border text-eraya-navy'
                }`}
              whileHover={{ scale: activeCase === index ? 1.03 : 1.05, y: -2 }}
              whileTap={{ scale: 0.96 }}
              role="tab"
              aria-selected={activeCase === index}
              aria-controls={`case-panel-${index}`}
              id={`case-tab-${index}`}
            >
              {study.title}
            </motion.button>
          ))}
        </motion.div>

        {/* Active Case Study */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCase}
            className="liquid-card glass-noise hairline-border rounded-3xl overflow-hidden"
            initial={{ opacity: 0, y: 50, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.98 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            role="tabpanel"
            aria-labelledby={`case-tab-${activeCase}`}
            id={`case-panel-${activeCase}`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              {/* Image Section */}
              <div className="relative h-96 lg:h-auto overflow-hidden">
                <motion.img
                  src={caseStudies[activeCase].image}
                  alt={caseStudies[activeCase].title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                  initial={{ scale: 1.06 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-eraya-navy/60 via-eraya-navy/20 to-transparent"></div>

                {/* Category Badge */}
                <motion.div
                  className="absolute top-6 left-6 px-4 py-2 liquid-glass hairline-border rounded-xl"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  <span className="text-sm font-medium text-eraya-navy">{caseStudies[activeCase].category}</span>
                </motion.div>
              </div>

              {/* Content Section */}
              <motion.div
                className="p-8 lg:p-12"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <div className="mb-8">
                  <h3 className="text-3xl md:text-4xl font-medium text-eraya-navy mb-4">
                    {caseStudies[activeCase].title}
                  </h3>
                  <p className="text-xl text-eraya-navy/70 mb-6 font-light">
                    {caseStudies[activeCase].subtitle}
                  </p>

                  {/* Services */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {caseStudies[activeCase].services.map((service, index) => (
                      <span key={index} className="px-3 py-1 liquid-glass hairline-border rounded-full text-sm font-medium">
                        {service}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Challenge & Solution */}
                <div className="space-y-6 mb-8">
                  <div>
                    <h4 className="font-medium text-eraya-navy mb-2">Challenge</h4>
                    <p className="text-eraya-navy/60 font-light leading-relaxed">{caseStudies[activeCase].challenge}</p>
                  </div>
                  {caseStudies[activeCase].hurdles && (
                    <div>
                      <h4 className="font-medium text-eraya-navy mb-2">Hurdles</h4>
                      <p className="text-eraya-navy/60 font-light leading-relaxed">{caseStudies[activeCase].hurdles}</p>
                    </div>
                  )}
                  {caseStudies[activeCase].solution && (
                    <div>
                      <h4 className="font-medium text-eraya-navy mb-2">Solution</h4>
                      <p className="text-eraya-navy/60 font-light leading-relaxed">{caseStudies[activeCase].solution}</p>
                    </div>
                  )}
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {Object.entries(caseStudies[activeCase].metrics).map(([key, value], index) => (
                    <div key={index} className="text-center p-4 liquid-glass hairline-border rounded-xl">
                      <div className="text-2xl font-medium text-eraya-navy mb-1">{value}</div>
                      <div className="text-xs text-eraya-navy/60 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
                    </div>
                  ))}
                </div>

                {/* Duration & ROI */}
                <div className="flex items-center justify-between text-sm text-eraya-navy/60 mb-8">
                  <span><strong>Duration:</strong> {caseStudies[activeCase].duration}</span>
                  <span><strong>ROI:</strong> {caseStudies[activeCase].roi}</span>
                </div>

                <motion.button
                  className="liquid-button text-white px-8 py-4 rounded-2xl font-medium group w-full inline-flex items-center justify-center"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  View Full Case Study
                  <ArrowUpRight className="ml-2 h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Before/After Comparison */}
        <motion.div
          className="mt-16 liquid-card rounded-3xl p-8 lg:p-12"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <h3 className="text-3xl font-light text-eraya-navy mb-8 text-center">Results Comparison</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Before */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ delay: 1.4, duration: 0.6 }}
            >
              <h4 className="text-2xl font-medium text-eraya-navy mb-6">Before</h4>
              <div className="space-y-4">
                {Object.entries(caseStudies[activeCase].beforeAfter.before).map(([key, value], index) => (
                  <motion.div
                    key={index}
                    className="flex justify-between items-center p-4 liquid-glass rounded-xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5 + index * 0.1, duration: 0.4 }}
                  >
                    <span className="capitalize font-medium text-eraya-navy">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                    <span className="text-eraya-navy/60">{value}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* After */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ delay: 1.4, duration: 0.6 }}
            >
              <h4 className="text-2xl font-medium text-eraya-navy mb-6">After</h4>
              <div className="space-y-4">
                {Object.entries(caseStudies[activeCase].beforeAfter.after).map(([key, value], index) => (
                  <motion.div
                    key={index}
                    className="flex justify-between items-center p-4 liquid-glass rounded-xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5 + index * 0.1, duration: 0.4 }}
                  >
                    <span className="capitalize font-medium text-eraya-navy">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                    <span className="text-eraya-navy font-medium">{value}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Results List */}
        <motion.div
          className="mt-16 liquid-card rounded-3xl p-8 lg:p-12"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ delay: 1.6, duration: 0.8 }}
        >
          <h3 className="text-3xl font-light text-eraya-navy mb-8 text-center">Key Results Achieved</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {caseStudies[activeCase].results.map((result, index) => (
              <motion.div
                key={index}
                className="flex items-start space-x-3 p-4 liquid-glass rounded-xl"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.8 + index * 0.1, duration: 0.4 }}
                whileHover={{ x: 5, scale: 1.02 }}
              >
                <motion.div
                  className="w-2 h-2 bg-eraya-beige rounded-full mt-2 flex-shrink-0"
                  whileHover={{ scale: 1.5 }}
                />
                <span className="text-eraya-navy/70 font-light leading-relaxed">{result}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ delay: 2, duration: 0.8 }}
        >
          <motion.div
            className="liquid-glass rounded-3xl p-12 max-w-4xl mx-auto"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="flex items-center justify-center mb-6">
              <TrendingUp className="w-8 h-8 text-eraya-navy/60 mr-3" />
              <Target className="w-8 h-8 text-eraya-navy/60" />
            </div>
            <h3 className="text-3xl md:text-4xl font-light text-eraya-navy mb-6">
              Ready to achieve similar results?
            </h3>
            <p className="text-lg text-eraya-navy/60 mb-8 font-light leading-relaxed">
              Let's discuss how we can create a customized strategy for your business growth.
            </p>
            <motion.button
              className="liquid-button text-white px-8 py-4 rounded-2xl font-medium group text-lg inline-flex items-center"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Start your success story
              <ArrowUpRight className="ml-3 h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CaseStudiesSection;