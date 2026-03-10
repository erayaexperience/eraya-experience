import './globals.css';
import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { Toaster } from '@/components/ui/toaster';
import { Playfair_Display } from 'next/font/google';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://erayaexperience.com'),
  title: {
    default: 'Eraya Experience | Digital Marketing Agency Goa',
    template: '%s | Eraya Experience',
  },
  description: 'We craft human-first brand experiences that merge strategy, storytelling, and premium execution. From social media management to Pan-India ROI marketing.',
  keywords: [
    'digital marketing agency',
    'social media management Goa',
    'influencer marketing India',
    'performance marketing',
    'creative agency Goa',
    'brand strategy',
    'ROI marketing',
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
    canonical: '/',
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
  icons: {
    icon: '/logo-small.png',
    shortcut: '/logo-small.png',
    apple: '/logo-small.png',
  },
  openGraph: {
    title: 'Eraya Experience | Digital Marketing Agency Goa',
    description: 'We craft human-first brand experiences that merge strategy, storytelling, and premium execution.',
    url: 'https://erayaexperience.com',
    siteName: 'Eraya Experience',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Eraya Experience | Digital Marketing Agency Goa',
    description: 'We craft human-first brand experiences that merge strategy, storytelling, and premium execution.',
    creator: '@erayaexperience',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${GeistSans.variable} ${playfair.variable} font-sans antialiased text-foreground bg-background selection:bg-primary/30 selection:text-foreground`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}