import './globals.css';
import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';

export const metadata: Metadata = {
  title: 'Eraya Experience - Digital Marketing Agency | Social Media & Influencer Marketing',
  description: 'We help brands grow with social media management and influencer marketing that boost visibility. From creative campaigns to ROI-driven results across Pan India.',
  keywords: 'digital marketing, social media management, influencer marketing, brand growth, ROI marketing, Goa marketing agency',
  authors: [{ name: 'Eraya Experience' }],
  icons: {
    icon: '/logo-small.png',
    shortcut: '/logo-small.png',
    apple: '/logo-small.png',
  },
  openGraph: {
    title: 'Eraya Experience - Digital Marketing Agency',
    description: 'We help brands grow with social media management and influencer marketing that boost visibility.',
    url: 'https://erayaexperience.com',
    siteName: 'Eraya Experience',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Eraya Experience - Digital Marketing Agency',
    description: 'We help brands grow with social media management and influencer marketing that boost visibility.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={GeistSans.className}>{children}</body>
    </html>
  );
}