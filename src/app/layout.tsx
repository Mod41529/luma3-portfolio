import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://luma3.vercel.app'),
  title: 'LUMA3 — Portfolio',
  description: 'I think in systems, create in layers.',
  openGraph: {
    title: 'LUMA3',
    description: 'I think in systems, create in layers.',
    siteName: 'LUMA3 Portfolio',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="ko"
      className={`${GeistSans.variable} ${GeistMono.variable} scroll-smooth`}
    >
      <body className="font-sans bg-bg text-fg antialiased">
        {children}
      </body>
    </html>
  )
}
