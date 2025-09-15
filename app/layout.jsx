import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Universal Skill Translator - Learn Any Skill, Any Language',
  description: 'Transform any skill into personalized, interactive, multi-language learning journeys powered by AI',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}