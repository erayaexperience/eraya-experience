"use client";

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { FiCheckCircle, FiArrowRight, FiArrowUpRight } from 'react-icons/fi';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { fieldLabel } from './ui/field';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { addScrollInterceptor } from '@/lib/lenis';
import { cn } from '@/lib/utils';
import { site } from '@/lib/site';

import { contactInfo, serviceOptions } from '@/constants/contact';
import { graphics } from '@/constants/graphics';

const WEB3FORMS_ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

const wallRows = [
  { order: [0, 8, 1, 10, 2, 11, 3], animation: 'animate-[gallery-left_180s_linear_infinite]' },
  { order: [4, 9, 6, 12, 7, 13, 5], animation: 'animate-[gallery-right_200s_linear_infinite]' },
];

const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const releasePageScroll = useRef<(() => void) | null>(null);
  useEffect(() => () => releasePageScroll.current?.(), []);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const wallY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [sendFailed, setSendFailed] = useState(false);
  const [botcheck, setBotcheck] = useState(false);

  const showSuccess = () => {
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', company: '', service: '', message: '' });
    }, 6000);
  };

  const openEmailDraft = () => {
    const lines = [`Name: ${formData.name}`, `Email: ${formData.email}`];
    if (formData.company) lines.push(`Brand: ${formData.company}`);
    if (formData.service) lines.push(`Service: ${formData.service}`);
    lines.push('', formData.message);
    const body = lines.join('\n');
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(`New enquiry from ${formData.name}`)}&body=${encodeURIComponent(body)}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSendFailed(false);

    if (botcheck) {
      showSuccess();
      return;
    }
    if (!WEB3FORMS_ACCESS_KEY) {
      openEmailDraft();
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `New website enquiry from ${formData.name}`,
          from_name: 'Eraya Experience website',
          name: formData.name,
          email: formData.email,
          brand: formData.company || 'Not given',
          service: formData.service || 'Not given',
          message: formData.message,
        }),
      });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error(result.message || 'Send failed');
      showSuccess();
    } catch {
      setSendFailed(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section ref={sectionRef} id="contact" className="relative overflow-hidden bg-background py-section">
      <motion.div
        aria-hidden
        style={{ y: wallY }}
        className="pointer-events-none absolute inset-0 flex -rotate-6 scale-125 flex-col justify-center gap-6 opacity-70"
      >
        {wallRows.map((row, rowIndex) => (
          <div key={rowIndex} className="overflow-x-clip">
            <div className={cn('flex w-max gap-6', row.animation)}>
              {[0, 1].map((copy) =>
                [...row.order, ...row.order].map((graphicIndex, position) => {
                  const graphic = graphics[graphicIndex];
                  return (
                    <div
                      key={`${copy}-${position}`}
                      style={{ aspectRatio: `${graphic.width} / ${graphic.height}` }}
                      className="relative h-56 shrink-0 overflow-hidden rounded-2xl shadow-xl md:h-72"
                    >
                      <Image src={graphic.src} alt="" fill sizes="240px" className="object-cover" />
                    </div>
                  );
                })
              )}
            </div>
          </div>
        ))}
      </motion.div>
      <div className="pointer-events-none absolute inset-0 glass bg-linear-to-b from-white/75 via-white/55 to-white/20 [--glass-blur-scale:1] [--glass-blur:8px] lg:bg-linear-to-r lg:from-white/75 lg:via-white/55 lg:via-45% lg:to-white/10 [--glass-rim:0_0_#0000] [--glass-saturate:70%]" />
      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-background via-transparent to-background" />

      <div className="container-modern relative grid items-center gap-14 lg:grid-cols-12 lg:gap-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
          className="text-center lg:col-span-5 lg:text-left"
        >
          <div className="mb-6 inline-flex items-center gap-3">
            <span className="h-px w-8 bg-primary" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground/60">Get in Touch</span>
            <span className="h-px w-8 bg-primary" />
          </div>
          <h2 className="text-4xl font-semibold leading-[1.05] tracking-tight text-secondary sm:text-5xl lg:text-[56px]">
            Let&apos;s Build Your <span className="block font-serif italic text-primary">Digital Legacy</span>
          </h2>
          <p className="mx-auto mt-6 max-w-md text-lg font-light lg:mx-0 leading-relaxed text-foreground/70">
            Got a brand, a launch or a big idea? Tell us where you want to go, and we&apos;ll show you how to get there.
          </p>

          <ul className="mt-10 divide-y divide-secondary/10 border-y border-secondary/10 text-left">
            {contactInfo.map((info) => (
              <li key={info.title}>
                <a
                  href={info.href}
                  {...(info.external && { target: '_blank', rel: 'noopener noreferrer' })}
                  className="group flex items-center gap-5 py-4"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full glass-cream text-primary">
                    <info.icon className="h-4.5 w-4.5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground/45 transition-colors duration-300 group-hover:text-foreground/70">{info.title}</span>
                    <span className="mt-0.5 block truncate text-lg font-medium text-secondary transition-colors duration-300 group-hover:text-primary">{info.details}</span>
                  </span>
                  <FiArrowUpRight className="h-5 w-5 shrink-0 text-primary opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:opacity-100" />
                </a>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="lg:col-span-7"
        >
          <div className="relative overflow-hidden rounded-4xl border border-black/5 bg-background p-(--pad) shadow-[0_40px_100px_-30px_rgba(0,0,0,0.25)] [--inner:0.75rem] [--pad:1.25rem] md:[--pad:2rem]">
            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="flex flex-col items-center justify-center py-20 text-center"
                >
                  <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-primary/15 text-primary">
                    <FiCheckCircle className="h-12 w-12" strokeWidth={1.2} />
                  </div>
                  <h3 className="mb-4 text-3xl font-semibold tracking-tight text-secondary">Thank you!</h3>
                  <p className="mx-auto max-w-xs font-light leading-relaxed text-foreground/60">
                    We&apos;ve got your message and we&apos;ll be in touch shortly.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col gap-5"
                >
                  <div>
                    <h3 className="text-2xl font-semibold tracking-tight text-secondary md:text-3xl">
                      Tell us about your <span className="font-serif italic text-primary">project</span>
                    </h3>
                    <p className="mt-2 text-sm font-light text-foreground/60">Share a few details and we&apos;ll take it from there.</p>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <Input
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      label="Name"
                    />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@brand.com"
                      label="Email"
                    />
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <Input
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Your brand or company"
                      label="Brand"
                    />
                    <div className="flex flex-col gap-2">
                      <label htmlFor="service" className={fieldLabel}>What do you need?</label>
                      <Select
                        value={formData.service}
                        onValueChange={(service) => setFormData((prev) => ({ ...prev, service }))}
                        onOpenChange={(open) => {
                          releasePageScroll.current?.();
                          releasePageScroll.current = open ? addScrollInterceptor(() => false) : null;
                        }}
                      >
                        <SelectTrigger id="service">
                          <SelectValue placeholder="Choose a service" />
                        </SelectTrigger>
                        <SelectContent>
                          {serviceOptions.map((option) => (
                            <SelectItem key={option} value={option}>{option}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="message" className={fieldLabel}>Tell us more</label>
                    <Textarea
                      id="message"
                      name="message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="What are you launching, and what does success look like?"
                    />
                  </div>

                  <input
                    type="checkbox"
                    name="botcheck"
                    checked={botcheck}
                    onChange={(e) => setBotcheck(e.target.checked)}
                    tabIndex={-1}
                    aria-hidden
                    className="hidden"
                  />

                  {sendFailed && (
                    <p role="alert" className="rounded-2xl border border-red-200 bg-red-50/80 px-5 py-3 text-sm text-red-700">
                      We couldn&apos;t send your message just now. Please try again, or email us at{' '}
                      <a href={`mailto:${site.email}`} className="font-semibold underline">{site.email}</a>.
                    </p>
                  )}

                  <Button type="submit" variant="secondary" size="lg" className="group w-full rounded-(--inner)" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <span className="flex items-center gap-3">
                        <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/20 border-t-white" />
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        Send Enquiry
                        <FiArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                      </span>
                    )}
                  </Button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
