import 'lenis/dist/lenis.css';
import './globals.css';
import type { Metadata, Viewport } from 'next';
import { SmoothScroll } from '@/components/smooth-scroll';
import { Cursor } from '@/components/cursor';
import { LiquidGlassFilter } from '@/components/liquid-glass-filter';
import { LOGO_PATH, LOGO_VIEWBOX } from '@/constants/logo-path';
import { Playfair_Display } from 'next/font/google';
import { SITE_URL, site } from '@/lib/site';

const playfair = Playfair_Display({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#f8f6f2',
  colorScheme: 'only light',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: site.title,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    'digital marketing agency Goa',
    'creative agency Goa',
    'social media marketing Goa',
    'influencer marketing agency India',
    'Meta and Google ads agency',
    'graphic and logo design Goa',
    'photoshoots Goa',
    'brand kits',
    'website and SEO Goa',
    'Eraya Experience',
  ],
  authors: [{ name: site.name, url: SITE_URL }],
  creator: site.name,
  publisher: site.legalName,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
  },
  manifest: '/manifest.webmanifest',
  openGraph: {
    title: site.title,
    description: site.shareDescription,
    url: '/',
    siteName: site.name,
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: site.title,
    description: site.shareDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  category: 'Marketing & Advertising',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-IN" className="scroll-pt-(--header-height)">
      <body className={`${playfair.variable} font-sans antialiased text-foreground bg-background selection:bg-primary/30 selection:text-foreground`}>
        <div aria-hidden className="intro">
          <svg viewBox={LOGO_VIEWBOX} className="intro-logo">
            <path className="intro-hole" fillRule="evenodd" d={`M-100000,-100000H100000V100000H-100000Z${LOGO_PATH}`} />
          </svg>
        </div>
        <SmoothScroll />
        <Cursor />
        <LiquidGlassFilter />
        {children}
      </body>
    </html>
  );
}