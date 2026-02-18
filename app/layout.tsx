import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import ChunkErrorHandler from '@/components/ChunkErrorHandler'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Smart Bookmark App',
  description: 'Manage your bookmarks with ease',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ChunkErrorHandler />
        {children}
      </body>
    </html>
  )
}
