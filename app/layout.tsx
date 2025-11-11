import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Toaster } from "@/components/ui/toaster"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "24 Digital Products - Premium Online Courses & Digital Products",
  description:
    "Discover high-quality digital courses and products at 24 Digital Products. Learn new skills, advance your career, and achieve your goals with our expertly crafted content.",
  keywords: "online courses, digital products, e-learning, professional development, skill training",
  authors: [{ name: "24 Digital Products" }],
  openGraph: {
    title: "24 Digital Products - Premium Online Courses",
    description: "Discover high-quality digital courses and products to advance your skills",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "24 Digital Products",
    description: "Premium online courses and digital products",
  },
  robots: {
    index: true,
    follow: true,
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} font-sans antialiased`} suppressHydrationWarning>
        {children}
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}
