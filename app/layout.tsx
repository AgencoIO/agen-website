import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Header } from '@/components/header'
import { FaqSection } from '@/components/faq-section'
import { Footer } from '@/components/footer'
import { ExcludeOnPaths } from '@/components/exclude-on-paths'
import './globals.css'

const geist = Geist({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  title: 'Agenco | Data Infrastructure for E-Commerce',
  description: 'Transform fragmented e-commerce data into competitive advantage. Custom data pipelines, inventory analytics, and competitor intelligence for Shopify founders and D2C brands.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

// Revalidate layout-level data every 60 seconds
export const revalidate = 60

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`}>
      <body className="font-sans antialiased text-base leading-relaxed text-foreground bg-background">
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <ExcludeOnPaths excludePaths={["/blog*"]}>
            <FaqSection />
          </ExcludeOnPaths>
          <Footer />
        </div>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
