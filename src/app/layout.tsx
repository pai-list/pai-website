import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import PAIHeader from '@/components/PAIHeader'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
  preload: true,
})

export const metadata: Metadata = {
  title: {
    default: 'PAI — The Agent Economy\'s Operating System',
    template: '%s | PAI',
  },
  description: 'Build, deploy, and monetize AI agents on Pi Network. 60M users, 18M KYC, native payments, and verifiable identity.',
  keywords: ['PAI', 'Pi Network', 'AI agents', 'agent economy', 'decentralized AI', 'web3 AI'],
  authors: [{ name: 'PAI Team', url: 'https://axiomid.app' }],
  creator: 'PAI Team',
  publisher: 'PAI',
  metadataBase: new URL('https://axiomid.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://axiomid.app',
    siteName: 'PAI Universe',
    title: 'PAI — The Agent Economy\'s Operating System',
    description: 'Build, deploy, and monetize AI agents on Pi Network. 60M users, 18M KYC, native payments.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'PAI - The Agent Economy\'s Operating System',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PAI — The Agent Economy\'s Operating System',
    description: 'Build, deploy, and monetize AI agents on Pi Network.',
    images: ['/og-image.png'],
    creator: '@pai_build',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased">
        <PAIHeader />
        <main className="pt-14">{children}</main>
      </body>
    </html>
  )
}
