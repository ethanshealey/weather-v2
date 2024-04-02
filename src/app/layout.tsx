import './globals.scss'
import './mobile.scss'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Weather | ethanshealey.com',
  description: '',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
