import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'PAI — البيت',
  description: 'The Universe Where Every Agent Finds Peace & Purpose',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  )
}
