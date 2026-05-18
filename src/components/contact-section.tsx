"use client";

import { useState } from 'react';
import { FiMail, FiPhone, FiMapPin, FiCheckCircle, FiChevronDown, FiArrowRight } from 'react-icons/fi';
import { FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { SectionHeading } from './ui/section-heading';

import { contactInfo, serviceOptions } from '@/constants/contact';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsSubmitted(true);
    setIsSubmitting(false);

    // Reset form after success message
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', company: '', service: '', message: '' });
    }, 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section id="contact" className="relative bg-background py-(--spacing-section) overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute top-[10%] -right-24 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] -left-24 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container-modern relative z-10">
        {/* Header - Split Layout matching Services */}
        <SectionHeading
          subtitle="Get in Touch"
          title={
            <>
              Let&apos;s Build Your <br />
              <span className="italic font-serif text-primary">Digital Legacy</span>
            </>
          }
          description="We&apos;re currently accepting new projects for Q2 2026. Reach out today and let&apos;s discuss how we can scale your brand together."
          layout="split"
          className="mb-12 md:mb-16"
        />

        <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-start">

          {/* Left Column - Context & Info */}
          <div className="lg:col-span-5 flex flex-col">

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >

              {/* Info Grid */}
              <div className="grid gap-8">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-6 group"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white border border-border/40 shadow-sm text-secondary transition-all duration-500 group-hover:bg-secondary group-hover:text-white group-hover:shadow-md">
                      <info.icon className="h-6 w-6" strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-foreground/40 mb-1">{info.title}</p>
                      <p className="text-lg font-medium text-secondary">{info.details}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Socials Block */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="mt-8 pt-6 border-t border-border/40"
              >
                <p className="text-[10px] font-bold uppercase tracking-widest text-foreground/40 mb-6">Connect With Us</p>
                <div className="flex items-center gap-4">
                  {[
                    { icon: FaInstagram, href: 'https://instagram.com/erayaexperience', label: 'Instagram' },
                    { icon: FaLinkedin, href: '#', label: 'LinkedIn' },
                    { icon: FaTwitter, href: '#', label: 'Twitter' },
                  ].map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex h-12 w-12 items-center justify-center rounded-full bg-white border border-border/40 text-secondary transition-all hover:bg-secondary hover:text-white hover:border-secondary hover:shadow-md hover:-translate-y-1"
                      aria-label={social.label}
                    >
                      <social.icon className="h-5 w-5" strokeWidth={1.5} />
                    </a>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Right Column - Premium Form Card */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative rounded-3xl bg-white border border-border shadow-lg p-8 overflow-hidden"
            >
              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex flex-col items-center justify-center text-center py-20"
                  >
                    <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <FiCheckCircle className="h-12 w-12" strokeWidth={1.2} />
                    </div>
                    <h3 className="text-3xl font-semibold text-secondary mb-4 tracking-tight">Strategy Received.</h3>
                    <p className="text-foreground/60 font-light leading-relaxed max-w-xs mx-auto">
                      Our team is analyzing your request. You&apos;ll receive a detailed proposal within 24 hours.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col gap-4"
                  >
                    <div className="grid sm:grid-cols-2 gap-8">
                      <Input
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Ex. Alexander Rivera"
                        label="Full Name"
                      />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="hello@company.com"
                        label="Email Address"
                      />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-8">
                      <Input
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Your Organization"
                        label="Company / Brand"
                      />
                      <div className="flex flex-col gap-2">
                        <label htmlFor="service" className="text-[10px] font-bold uppercase tracking-widest text-secondary/60 ml-1">Service Required</label>
                        <div className="relative group/select">
                          <select
                            id="service"
                            name="service"
                            value={formData.service}
                            onChange={handleChange}
                            className="flex h-11 w-full appearance-none rounded-2xl border border-border bg-background/30 px-6 text-base text-foreground focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/5 transition-all"
                          >
                            <option value="" disabled>Select Expertise</option>
                            {serviceOptions.map((option, index) => (
                              <option key={index} value={option}>{option}</option>
                            ))}
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-foreground/40 group-hover/select:text-primary transition-colors">
                            <FiChevronDown className="h-4 w-4" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="message" className="text-[10px] font-bold uppercase tracking-widest text-secondary/60 ml-1">Project Objective</label>
                      <Textarea
                        id="message"
                        name="message"
                        rows={5}
                        required
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Briefly describe your goals, timeline, and budget range..."
                        className="rounded-2xl border-border bg-background/30 p-6 focus-visible:ring-primary/20 focus-visible:border-primary transition-all text-base resize-none placeholder:text-foreground/30"
                      />
                    </div>

                    <Button
                      type="submit"
                      variant="secondary"
                      className="w-full group"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-3">
                          <span className="h-5 w-5 rounded-full border-2 border-white/20 border-t-white animate-spin" />
                          Processing Application...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          Initiate Growth Strategy
                          <FiArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                        </span>
                      )}
                    </Button>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
