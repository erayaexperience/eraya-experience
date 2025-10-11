"use client";

import { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle, Clock, CheckCircle, Instagram } from 'lucide-react';
import Heading from './ui/heading';
import Badge from './ui/badge';

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
      <section id="contact" className="section-padding bg-gradient-to-br from-eraya-beige/5 via-white to-eraya-beige/10">
        <div className="container-modern">
          <div className="max-w-2xl mx-auto text-center">
            <div className="modern-card p-12">
              <div className="w-20 h-20 bg-eraya-navy rounded-full flex items-center justify-center mx-auto mb-8">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-4xl font-light text-eraya-navy mb-6">Message sent successfully!</h2>
              <p className="text-lg text-eraya-navy/60 font-light leading-relaxed">
                Thank you for reaching out. We'll get back to you within 24 hours with a detailed response.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="section-padding bg-gradient-to-br from-eraya-beige/5 via-white to-eraya-beige/10 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-eraya-navy/5 rounded-full filter blur-3xl"></div>

      <div className="container-modern">
        <div className="text-center mb-20">
          <div className="mb-8">
            <Badge icon={<MessageCircle className="w-4 h-4 mr-2 text-eraya-navy/60" />}>Get in touch</Badge>
          </div>

          <Heading
            as="h2"
            before="Got questions? "
            gradient="Reach out."
            subtitle="Ready to boost your brand visibility? Let's discuss how we can help transform your digital presence and achieve your business goals."
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-2 space-y-8">
            {contactInfo.map((info, index) => (
              <div key={index} className="group flex items-start space-x-6 p-6 hover:bg-eraya-navy/5 rounded-2xl transition-all duration-300">
                <div className="w-14 h-14 bg-eraya-navy rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <info.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-medium text-eraya-navy mb-1 text-lg">{info.title}</h3>
                  <p className="text-eraya-navy font-medium mb-1">{info.details}</p>
                  <p className="text-eraya-navy/50 text-sm font-light">{info.description}</p>
                </div>
              </div>
            ))}

            {/* Quick response card */}
            <div className="glass-dark rounded-2xl p-8 text-white">
              <div className="flex items-center mb-4">
                <Clock className="w-6 h-6 mr-3" />
                <h3 className="font-medium text-lg">Quick response</h3>
              </div>
              <p className="text-white/80 font-light leading-relaxed">
                We typically respond within 2 hours during business hours. For urgent matters, don't hesitate to call us directly.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <div className="modern-card p-8 lg:p-12">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-eraya-navy mb-3">
                      Full Name *
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-6 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-eraya-navy focus:border-transparent transition-all duration-300 text-lg"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-eraya-navy mb-3">
                      Email Address *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-6 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-eraya-navy focus:border-transparent transition-all duration-300 text-lg"
                      placeholder="john@company.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-eraya-navy mb-3">
                      Company
                    </label>
                    <input
                      id="company"
                      name="company"
                      type="text"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-6 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-eraya-navy focus:border-transparent transition-all duration-300 text-lg"
                      placeholder="Your Company"
                    />
                  </div>
                  <div>
                    <label htmlFor="service" className="block text-sm font-medium text-eraya-navy mb-3">
                      Service Needed
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full px-6 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-eraya-navy focus:border-transparent transition-all duration-300 text-lg bg-white"
                    >
                      <option value="">Select a service</option>
                      {serviceOptions.map((option, index) => (
                        <option key={index} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-eraya-navy mb-3">
                    Project Details *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-6 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-eraya-navy focus:border-transparent transition-all duration-300 resize-none text-lg"
                    placeholder="Tell us about your project, goals, and timeline..."
                  />
                </div>

                <button
                  type="submit"
                  className="modern-button modern-button-primary w-full group text-lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3"></div>
                      Sending message...
                    </div>
                  ) : (
                    <>
                      Send message
                      <Send className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;