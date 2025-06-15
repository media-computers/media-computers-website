import { Inter } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import { Providers } from '@/components/Providers'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  variable: '--font-inter',
})

export const metadata = {
  title: 'Media Computers',
  description: 'Your trusted partner in computer education and services',
  metadataBase: new URL('https://yourdomain.com'),
  openGraph: {
    title: 'Media Computers',
    description: 'Your trusted partner in computer education and services',
    url: 'https://yourdomain.com',
    siteName: 'Media Computers',
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: '#111827' },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <link rel="icon" href="/images/favicon.png" />
      </head>
      <body className={`${inter.variable} font-sans antialiased bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Providers>
            <Navbar />
            <main className="flex-grow pt-24">
              {children}
            </main>
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  )
} 