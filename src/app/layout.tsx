import 'lenis/dist/lenis.css';
import './globals.css';
import type { Metadata, Viewport } from 'next';
import { GeistSans } from 'geist/font/sans';
import { SmoothScroll } from '@/components/smooth-scroll';
import { Playfair_Display } from 'next/font/google';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#09090b' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://erayaexperience.com'),
  title: {
    default: 'Eraya Experience | Digital Marketing Agency Goa & Pan India',
    template: '%s | Eraya Experience',
  },
  description:
    'Eraya Experience is a premier digital marketing agency based in Goa, India. We deliver graphic and logo design, photoshoots, social media marketing, Meta and Google ads, influencer marketing, brand kits, and websites and SEO.',
  keywords: [
    'digital marketing agency Goa',
    'social media management Goa',
    'influencer marketing agency India',
    'performance marketing',
    'creative agency Goa',
    'brand strategy consultants',
    'ROI marketing',
    'Goa advertising agency',
    'Eraya Experience',
    'Pan India brand campaigns',
  ],
  authors: [{ name: 'Eraya Experience', url: 'https://erayaexperience.com' }],
  creator: 'Eraya Experience',
  publisher: 'Eraya Experience',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: 'https://erayaexperience.com',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.png', sizes: '500x500', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/apple-icon.png', sizes: '500x500', type: 'image/png' },
    ],
  },
  manifest: '/manifest.webmanifest',
  openGraph: {
    title: 'Eraya Experience | Digital Marketing Agency Goa & Pan India',
    description:
      'We craft human-first brand experiences that merge strategy, storytelling, and premium execution. Proven 4.8x average ROI across Pan-India brands.',
    url: 'https://erayaexperience.com',
    siteName: 'Eraya Experience',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Eraya Experience | Digital Marketing Agency Goa & Pan India',
    description:
      'We craft human-first brand experiences that merge strategy, storytelling, and premium execution. Proven 4.8x average ROI across Pan-India brands.',
    creator: '@erayaexperience',
    site: '@erayaexperience',
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
    <html lang="en" className="scroll-pt-(--header-height)">
      <body className={`${GeistSans.variable} ${playfair.variable} font-sans antialiased text-foreground bg-background selection:bg-primary/30 selection:text-foreground`}>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}