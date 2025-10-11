"use client";

import { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle, Clock, CheckCircle, Instagram } from 'lucide-react';
import Heading from './ui/heading';
import Badge from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';

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
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Location',
      details: 'Porvorim, Goa',
      description: 'Visit our office'
    },
    {
      icon: Mail,
      title: 'Email',
      details: 'ino.erayaexp@gmail.com',
      description: 'Drop us a line anytime'
    },
    {
      icon: Phone,
      title: 'Phone',
      details: '+91 9272166475',
      description: 'Call us for immediate support'
    },
    {
      icon: Instagram,
      title: 'Instagram',
      details: '@Erayaexperience',
      description: 'Follow our journey'
    }
  ];

  const serviceOptions = [
    'Social Media Management',
    'Influencer Marketing',
    'Hoardings & Offline Marketing',
    'Performance Marketing',
    'Website/SEO Development',
    'Event Curation/B2B',
    'Complete Digital Marketing Package'
  ];

  if (isSubmitted) {
    return (
      <section id="contact" className="section-padding relative overflow-hidden bg-gradient-to-b from-white via-[#f5f5f7] to-white">
        <div className="container-modern">
          <div className="mx-auto max-w-2xl text-center">
            <div className="rounded-[40px] border border-[rgba(209,209,214,0.6)] bg-white/95 p-12 shadow-[0_36px_90px_rgba(15,23,42,0.18)] backdrop-blur-xl">
              <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-primary text-white">
                <CheckCircle className="h-10 w-10" />
              </div>
              <h2 className="mb-6 text-4xl font-semibold text-foreground">Message sent successfully!</h2>
              <p className="text-lg leading-relaxed text-foreground/65">
                Thank you for reaching out. We will get back to you within 24 hours with a detailed response.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="section-padding relative overflow-hidden bg-gradient-to-b from-white via-[#f5f5f7] to-white">
      {/* Background decoration */}
      <div className="absolute left-0 top-1/4 h-96 w-96 rounded-full bg-primary/12 blur-3xl"></div>

      <div className="container-modern">
        <div className="mb-20 text-center">
          <div className="mb-8">
            <Badge icon={<MessageCircle className="mr-2 h-4 w-4 text-secondary/70" />} className="mx-auto">Get in touch</Badge>
          </div>

          <Heading
            as="h2"
            before="Got questions? "
            gradient="Reach out."
            subtitle="Ready to boost your brand visibility? Let's discuss how to transform your presence with Apple-aligned craft."
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Contact Information */}
          <div className="space-y-8 lg:col-span-2">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="group flex items-start gap-6 rounded-[28px] border border-[rgba(209,209,214,0.5)] bg-white/90 p-6 shadow-[0_16px_32px_rgba(15,23,42,0.1)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_26px_56px_rgba(15,23,42,0.14)]"
              >
                <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-primary/12 text-secondary transition-transform duration-300 group-hover:scale-110">
                  <info.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="mb-1 text-lg font-semibold text-foreground">{info.title}</h3>
                  <p className="mb-1 text-base font-semibold text-foreground/80">{info.details}</p>
                  <p className="text-sm text-foreground/55">{info.description}</p>
                </div>
              </div>
            ))}

            {/* Quick response card */}
            <div className="rounded-[28px] border border-[rgba(209,209,214,0.5)] bg-white/95 p-8 shadow-[0_18px_36px_rgba(15,23,42,0.12)]">
              <div className="mb-4 flex items-center gap-3">
                <Clock className="h-6 w-6 text-secondary/70" />
                <h3 className="text-lg font-semibold text-foreground">Quick response</h3>
              </div>
              <p className="leading-relaxed text-foreground/65">
                We typically respond within 2 hours during business hours. For urgent matters, call us directly.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <div className="rounded-[40px] border border-[rgba(209,209,214,0.5)] bg-white/95 p-8 shadow-[0_28px_60px_rgba(15,23,42,0.14)] backdrop-blur-xl lg:p-12">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-3">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@company.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-3">
                    <Label htmlFor="company">Company</Label>
                    <Input
                      id="company"
                      name="company"
                      type="text"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Your Company"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="service">Service Needed</Label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="h-12 w-full rounded-[26px] border border-[rgba(209,209,214,0.8)] bg-white/90 px-5 text-[15px] leading-tight shadow-[0_12px_26px_rgba(0,0,0,0.08)] transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 cursor-pointer"
                    >
                      <option value="">Select a service</option>
                      {serviceOptions.map((option, index) => (
                        <option key={index} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="message">Project Details *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={6}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your project, goals, and timeline..."
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="group w-full justify-center"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="inline-flex items-center gap-3">
                      <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                      Sending message...
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-3">
                      Send message
                      <Send className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;


