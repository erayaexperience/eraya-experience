"use client";

import { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, Instagram } from 'lucide-react';
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
      <section id="contact" className="bg-[#f9f9f9] py-20 lg:py-28">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <div className="rounded-2xl border border-[#e5e5e7] bg-white p-12 shadow-sm">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
              <CheckCircle className="h-8 w-8" />
            </div>
            <h2 className="mb-4 text-3xl font-semibold text-gray-900">Message sent!</h2>
            <p className="text-lg text-gray-600">
              Thank you for reaching out. We will get back to you within 24 hours.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="bg-[#f9f9f9] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="text-center mb-16">
          <span className="inline-block rounded-full border border-[#e5e5e7] bg-white px-4 py-2 text-xs font-medium uppercase tracking-wider text-gray-600 mb-6">
            Get in touch
          </span>
          <h2 className="text-3xl font-semibold text-gray-900 sm:text-4xl lg:text-5xl">
            Let's start a conversation
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Ready to boost your brand visibility? We're here to help.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-5">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-6">
            {contactInfo.map((info, index) => (
              <div key={index} className="flex items-start gap-4 rounded-xl border border-[#e5e5e7] bg-white p-6">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-[#f9f9f9] text-[#162451]">
                  <info.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{info.title}</h3>
                  <p className="font-medium text-[#162451]">{info.details}</p>
                  <p className="text-sm text-gray-500">{info.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <div className="rounded-2xl border border-[#e5e5e7] bg-white p-8 lg:p-10 shadow-sm">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
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

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <Input
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Your Company"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="service">Service Needed</Label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="flex h-11 w-full rounded-lg border border-[#e5e5e7] bg-white px-4 text-sm text-gray-900 focus:border-[#162451] focus:outline-none focus:ring-1 focus:ring-[#162451]"
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

                <div className="space-y-2">
                  <Label htmlFor="message">Project Details</Label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your project..."
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                  {!isSubmitting && <Send className="ml-2 h-4 w-4" />}
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
