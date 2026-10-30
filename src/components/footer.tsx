import Link from 'next/link';
import Image from 'next/image';
import { FiArrowUpRight } from 'react-icons/fi';
import { navColumns, contactItems, socialLinks } from '@/constants/footer';
import { cn } from '@/lib/utils';
import { ShaderBackground } from './ui/shader-background';


const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-secondary text-white">
      <ShaderBackground />

      <div className="container-modern relative pt-16 pb-8">
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-12 lg:gap-12">
          <div className="col-span-2 space-y-6 lg:col-span-4">
            <Link href="#top" aria-label="Eraya Experience, back to top" className="tap inline-flex items-center transition-opacity hover:opacity-80">
              <Image src="/logo.png" alt="Eraya Experience" width={140} height={35} className="h-auto brightness-0 invert" />
            </Link>
            <p className="max-w-sm text-sm font-light leading-relaxed text-white/60">
              Strategy, storytelling and standout creative for brands that want to be remembered.
            </p>
            <ul className="space-y-3 pointer-coarse:space-y-0">
              {contactItems.map((item) => {
                const Icon = item.icon;
                const Tag = item.href ? 'a' : 'span';
                return (
                  <li key={item.label}>
                    <Tag
                      href={item.href}
                      className={cn('tap inline-flex items-center gap-3 text-sm text-white/80 transition-colors', item.href && 'hover:text-primary')}
                    >
                      <Icon className="h-4 w-4 text-primary" />
                      {item.label}
                    </Tag>
                  </li>
                );
              })}
            </ul>
          </div>

          {navColumns.map((column) => (
            <div key={column.title} className="lg:col-span-2">
              <h4 className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-white/40">{column.title}</h4>
              <ul className="space-y-3 pointer-coarse:space-y-0">
                {column.links.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="tap inline-flex items-center text-sm font-light text-white/70 transition-colors hover:text-primary">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="col-span-2 lg:col-span-4">
            <div className="glass-gold rounded-3xl p-5">
              <h3 className="text-xl font-medium text-white">
                Let&apos;s build something <span className="font-serif italic text-primary">unmistakable</span>
              </h3>
              <p className="mt-2 text-sm font-light text-white/60">
                Tell us about the next product, platform or campaign you want to bring to life.
              </p>
              <Link
                href="#contact"
                className="tap mt-6 inline-flex h-10 items-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-secondary transition-colors hover:bg-white"
              >
                <span className="text-trim">Start a project</span>
                <FiArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/45 sm:flex-row">
          <p>&copy; {currentYear} Eraya Experience. All rights reserved.</p>
          <div className="flex items-center gap-3">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <Link
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-primary hover:bg-primary hover:text-secondary"
                >
                  <Icon className="h-4 w-4" />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
