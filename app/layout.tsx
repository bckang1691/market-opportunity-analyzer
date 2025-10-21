import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Market Opportunity Analyzer - Find Your Next $10K Side Project',
  description:
    'Discover profitable side project ideas with ROI scores. Analyze Chrome extensions, Reddit trends, and Product Hunt opportunities.',
  keywords: [
    'side project',
    'market opportunity',
    'ROI analyzer',
    'startup ideas',
    'Chrome extensions',
    'Product Hunt',
    'Reddit trends',
  ],
  authors: [{ name: 'Market Opportunity Analyzer' }],
  openGraph: {
    title: 'Market Opportunity Analyzer',
    description: 'Find Your Next $10K Side Project in Minutes',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
          {children}
        </div>
      </body>
    </html>
  )
}
