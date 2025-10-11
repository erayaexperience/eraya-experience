import Link from 'next/link';
import { ArrowUpRight, Mail, Phone, MapPin, Instagram } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

const navColumns = [
  {
    title: 'Services',
    links: [
      { name: 'Social Media Management', href: '#services' },
      { name: 'Influencer Marketing', href: '#services' },
      { name: 'Performance Marketing', href: '#services' },
      { name: 'Website & SEO', href: '#services' },
    ],
  },
  {
    title: 'Company',
    links: [
      { name: 'About', href: '#about' },
      { name: 'Case Studies', href: '#case-studies' },
      { name: 'Portfolio', href: '#portfolio' },
      { name: 'Contact', href: '#contact' },
    ],
  },
];

const contactItems = [
  { icon: MapPin, label: 'Porvorim, Goa' },
  { icon: Mail, label: 'ino.erayaexp@gmail.com' },
  { icon: Phone, label: '+91 9272166475' },
  { icon: Instagram, label: '@erayaexperience' },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[rgba(209,209,214,0.35)] bg-white text-foreground">
      <div className="container-modern py-16">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-8">
            <div>
              <Link href="/" className="text-3xl font-semibold tracking-tight text-foreground hover:opacity-80 transition-opacity">
                Eraya Experience
              </Link>
              <p className="mt-4 max-w-lg text-sm leading-relaxed text-foreground/65 sm:text-base">
                We craft human-first brand experiences that merge strategy, storytelling, and product craft for ambitious teams across India.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {contactItems.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-3 rounded-[18px] border border-[rgba(209,209,214,0.45)] bg-white/80 px-4 py-3 shadow-[0_10px_24px_rgba(15,23,42,0.06)]">
                  <Icon className="h-4 w-4 text-secondary" />
                  <span className="text-sm font-medium text-foreground/70">{label}</span>
                </div>
              ))}
            </div>

            <div className="rounded-[26px] border border-[rgba(209,209,214,0.45)] bg-white/90 p-6 shadow-[0_18px_36px_rgba(15,23,42,0.08)]">
              <h3 className="text-base font-semibold text-foreground">Let&apos;s build something unmistakable</h3>
              <p className="mt-2 text-sm text-foreground/60">
                Tell us about the next product, platform, or campaign you want to bring to life.
              </p>
              <Button asChild size="lg" className="mt-5 inline-flex items-center gap-2">
                <Link href="#contact">
                  Start a project
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="space-y-10">
            <div className="grid gap-8 sm:grid-cols-2">
              {navColumns.map((column) => (
                <div key={column.title}>
                  <h4 className="text-sm font-semibold uppercase tracking-[0.25em] text-foreground/60">
                    {column.title}
                  </h4>
                  <ul className="mt-4 space-y-3">
                    {column.links.map((link) => (
                      <li key={link.name}>
                        <Link
                          href={link.href}
                          className="text-sm text-foreground/65 transition-colors hover:text-secondary"
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="rounded-[24px] border border-[rgba(209,209,214,0.45)] bg-white/90 p-6 shadow-[0_16px_32px_rgba(15,23,42,0.08)]">
              <h4 className="text-sm font-semibold uppercase tracking-[0.25em] text-foreground/60">
                Newsletter
              </h4>
              <p className="mt-3 text-sm leading-relaxed text-foreground/60">
                Monthly perspective on storytelling, product craft, and brand experience.
              </p>
              <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                <Input
                  type="email"
                  placeholder="name@company.com"
                  className="h-11 rounded-[22px] border-[rgba(209,209,214,0.65)] bg-white"
                />
                <Button type="button" size="sm" className="inline-flex items-center justify-center gap-2">
                  Join
                  <ArrowUpRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-[rgba(209,209,214,0.35)] pt-6 text-sm text-foreground/55 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {currentYear} Eraya Experience. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <p>Crafted in Goa, India</p>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 animate-pulse rounded-full bg-[#32d74b]" />
              <span>All systems operational</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
