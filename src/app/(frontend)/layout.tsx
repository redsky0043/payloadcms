import type { Metadata } from 'next'

import { Nunito_Sans } from 'next/font/google'

const nunitoSans = Nunito_Sans({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-nunito-sans',
})
import React from 'react'

import { Footer } from '@/components/Footer/Component'
import { Header } from '@/components/Header/Component'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'

import '@/styles/app.scss'
import { getServerSideURL } from '@/utilities/getURL'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className={nunitoSans.variable} lang="en" suppressHydrationWarning>
      <head>
        <InitTheme />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body>
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    creator: '@payloadcms',
  },
}
