import Link from 'next/link';
import Image from 'next/image';
import { FiArrowUpRight, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import { FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { Button } from './ui/button';
import { navColumns, contactItems, socialLinks } from '@/constants/footer';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary text-white overflow-hidden relative">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay pointer-events-none" />
      <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-primary/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />

      <div className="container-modern relative z-10 pt-16 pb-8 lg:pt-16">
        <div className="grid gap-12 lg:grid-cols-12 items-start">
          {/* Brand & Contact */}
          <div className="lg:col-span-4 space-y-8">
            <Link href="/" className="inline-block transition-opacity hover:opacity-80">
              <Image
                src="/logo.png"
                alt="ERAYA Logo"
                width={140}
                height={35}
                className="brightness-0 invert"
              />
            </Link>
            <p className="text-base leading-relaxed text-white/70 font-light max-w-sm">
              We craft human-first brand experiences that merge strategy, storytelling, and premium execution.
            </p>

            <div className="flex flex-col space-y-4 pt-2">
              {contactItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} className="flex items-center gap-3">
                    <Icon className="h-4 w-4 text-primary" strokeWidth={2} />
                    <span className="text-sm font-medium text-white/90">{item.label}</span>
                  </div>
                );
              })}
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4 pt-6">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <Link
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/70 transition-all hover:bg-primary hover:text-secondary hover:border-primary hover:-translate-y-1 shadow-sm"
                    aria-label={social.label}
                  >
                    <Icon className="h-4 w-4" strokeWidth={2} />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Navigation */}
          {navColumns.map((column) => (
            <div key={column.title} className="lg:col-span-2">
              <h4 className="text-xs font-semibold uppercase tracking-[0.25em] text-white/40 mb-6 flex items-center gap-3">
                <span className="w-4 h-px bg-primary/50" />
                {column.title}
              </h4>
              <ul className="space-y-4">
                {column.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm font-light text-white/70 transition-colors hover:text-primary inline-flex items-center gap-2 group"
                    >
                      <span className="w-0 h-px bg-primary transition-all duration-300 group-hover:w-3" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* CTA Box */}
          <div className="lg:col-span-4">
            <div className="rounded-[24px] bg-white/5 border border-white/10 p-6 sm:p-8 backdrop-blur-md relative overflow-hidden group">
              <div className="absolute inset-0 bg-primary/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
              <div className="relative z-10">
                <h3 className="text-xl font-medium text-white mb-2">Let&apos;s build something <span className="text-primary italic font-serif">unmistakable</span></h3>
                <p className="text-sm text-white/60 font-light mb-6">
                  Tell us about the next product, platform, or campaign you want to bring to life.
                </p>
                <Button asChild variant="secondary" className="w-full group/btn">
                  <Link href="#contact" className="inline-flex items-center justify-center gap-2">
                    Start a project
                    <FiArrowUpRight className="h-5 w-5" strokeWidth={2} />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-center gap-6 border-t border-white/10 pt-6 text-sm font-light text-white/50">
          <p>&copy; {currentYear} Eraya Experience. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
