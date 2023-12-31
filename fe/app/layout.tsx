import ToastProvider from "@/components/Toast"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Script from "next/script"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Test Muhamad Imron",
  description: "Test Muhamad Imron ",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToastProvider>{children}</ToastProvider>
        <Script
          strategy="beforeInteractive"
          src="https://widget.cloudinary.com/v2.0/global/all.js"
          type="text/javascript"
        />
      </body>
    </html>
  )
}
