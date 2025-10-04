import type { Metadata } from 'next'
import StyledComponentsRegistry from '@/lib/styled-registry'
import ConsoleLogger from './console-logger'
import '../styles/globals.css'

export const metadata: Metadata = {
  title: 'Cindy Adames',
  description: 'Portfolio',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>
          <ConsoleLogger />
          {children}
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
