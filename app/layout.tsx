import type { Metadata, Viewport } from 'next'
import { JetBrains_Mono } from 'next/font/google'
import { GeistPixelGrid } from 'geist/font/pixel'
import { ThemeProvider } from '@/components/theme-provider'
import { CroctProvider } from '@/components/croct-provider'
import { IntercomProvider } from '@/components/intercom'
import { Analytics } from '@vercel/analytics/next'
import { AnalyticsConsentManager } from '@/components/analytics-consent-manager'

import './globals.css'

const rawGoogleAnalyticsId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID
const GOOGLE_ANALYTICS_ID = /^G-[A-Z0-9]{10}$/i.test(rawGoogleAnalyticsId ?? '') ? rawGoogleAnalyticsId : undefined
const IS_PRODUCTION_DEPLOYMENT =
  process.env.NODE_ENV === 'production' && (process.env.VERCEL_ENV === undefined || process.env.VERCEL_ENV === 'production')
const SHOULD_ENABLE_GOOGLE_ANALYTICS = IS_PRODUCTION_DEPLOYMENT && Boolean(GOOGLE_ANALYTICS_ID)

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  title: 'Nubis | The Modern Cloud Platform',
  description:
    'Nubis is a modern cloud platform offering App Platform, Databases, instances, Firewalls, Kubernetes, and Core infrastructure natively.',
  keywords: [
    'nubis',
    'cloud platform nigeria',
    'african cloud provider',
    'app platform',
    'kubernetes lagos',
    'managed databases africa',
    'infrastructure',
    'aws alternative africa',
    'cloud hosting nigeria',
  ],
  authors: [{ name: 'Nubis' }],
  creator: 'Nubis',
  publisher: 'Nubis',
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
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'Nubis | The Modern Cloud Platform',
    description:
      'Nubis is a modern cloud platform offering App Platform, Databases, instances, Firewalls, Kubernetes, and Core infrastructure natively.',
    siteName: 'Nubis',
    images: [{
      url: '/images/og-image.png',
      width: 1200,
      height: 630,
      alt: 'Nubis Cloud Platform',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nubis | The Modern Cloud Platform',
    description:
      'Nubis is a modern cloud platform offering App Platform, Databases, instances, Firewalls, Kubernetes, and Core infrastructure natively.',
    creator: '@usenubis',
    images: [{
      url: '/images/og-image.png',
      width: 1200,
      height: 630,
      alt: 'Nubis Cloud Platform',
    }],
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_APP_URL || 'https://usenubis.com',
  },
  icons: {
    icon: '/images/logo/nubis_icon_white_transparent.png',
    apple: '/images/logo/nubis_icon_white_transparent.png',
  },
  category: 'technology',
}

export const viewport: Viewport = {
  themeColor: '#F2F1EA',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Nubis',
    url: process.env.NEXT_PUBLIC_APP_URL || 'https://usenubis.com',
    logo: `${process.env.NEXT_PUBLIC_APP_URL || 'https://usenubis.com'}/images/logo/brandmark-dark.svg`,
    description: 'Nubis is an African-born cloud hosting platform providing modern infrastructure, managed databases, and scalable App Platform services.',
    areaServed: ['Nigeria', 'Africa', 'Global'],
    sameAs: [
      'https://twitter.com/usenubis'
    ]
  }

  return (
    <html lang="en" className={`${jetbrainsMono.variable} ${GeistPixelGrid.variable}`} suppressHydrationWarning>
      <head>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-VBJ7MP7XX5"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-VBJ7MP7XX5');
          `}
        </Script>
      </head>
      <body className="font-mono antialiased">
        {SHOULD_ENABLE_GOOGLE_ANALYTICS && GOOGLE_ANALYTICS_ID && (
          <AnalyticsConsentManager analyticsId={GOOGLE_ANALYTICS_ID} />
        )}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
          <CroctProvider>
            {children}
            <IntercomProvider />
          </CroctProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
