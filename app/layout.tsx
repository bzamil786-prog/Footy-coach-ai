import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"

const geistSans = Geist({ subsets: ["latin"], variable: "--font-geist-sans" })
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" })

export const metadata: Metadata = {
  title: "FootyCoach AI — Football, Explained Simply",
  description: "A friendly, judgment-free AI coach for football rules, terms, tactics, positions, and competitions.",
}

export const viewport: Viewport = {
  themeColor: "#24633b",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className="bg-background"><body className={`${geistSans.variable} ${geistMono.variable}`}>{children}</body></html>
}
