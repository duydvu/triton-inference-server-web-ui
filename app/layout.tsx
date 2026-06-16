import type { Metadata } from 'next'
import './globals.css'

import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

import AppBar from '@/components/AppBar'

export const metadata: Metadata = {
  title: 'Triton Inference Server Web UI',
  description: 'Triton Inference Server Web UI',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <AppBar />
        {children}
      </body>
    </html>
  )
}
