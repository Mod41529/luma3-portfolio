import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Analytics } from '@vercel/analytics/react'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://luma3-portfolio.vercel.app'),
  title: 'LUMA3 — Portfolio',
  description: 'I think in systems, create in layers.',
  alternates: {
    canonical: 'https://luma3-portfolio.vercel.app',
  },
  openGraph: {
    title: 'LUMA3',
    description: 'I think in systems, create in layers.',
    siteName: 'LUMA3 Portfolio',
    url: 'https://luma3-portfolio.vercel.app',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'LUMA3 Portfolio' }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/og-image.png'],
  },
  icons: {
    apple: '/apple-touch-icon.png',
  },
}

// JSON-LD structured data
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Jun Yusung',
  alternateName: 'luma3',
  url: 'https://luma3-portfolio.vercel.app',
  jobTitle: 'Strategic Designer',
  knowsAbout: ['Video Production', 'Music Production', 'Design', 'Web Development', 'Business Strategy'],
  sameAs: [
    'https://github.com/Mod41529',
    'https://www.linkedin.com/in/yusung-jun-b09952279/',
  ],
}

// Inline script to prevent flash of wrong theme
const themeScript = `
  (function() {
    if (localStorage.getItem('theme') === 'dark') {
      document.documentElement.classList.add('dark');
    }
  })();
`

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="ko"
      className={`${GeistSans.variable} ${GeistMono.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans bg-bg text-fg antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
