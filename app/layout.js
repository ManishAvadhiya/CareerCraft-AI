import { Geist, Azeret_Mono as Geist_Mono } from "next/font/google"
import "./globals.css"
import ThemeProviderWrapper from "@/components/theme-provider-wrapper"
import Header from "@/components/header"
import { ClerkProvider } from "@clerk/nextjs"
import { dark } from "@clerk/themes"
import { Toaster } from "@/components/ui/sonner"


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata = {
  title: "CareerCraft AI",
  description: "Generated by create next app",
}

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <html lang="en" suppressHydrationWarning>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased relative`}>
          <ThemeProviderWrapper>
            <Header />
            <main className="min-h-screen">{children}</main>
            <Toaster richColors />
            <footer className="bg-gray-900 py-8">
  <div className="container mx-auto px-4 text-center text-gray-300">
    <p className="text-lg font-semibold">
      Elevate your career with AI-powered resume building, cover letters, and interview preparation.
    </p>
    <div className="mt-4">
      <p className="text-sm">© {new Date().getFullYear()} CareerCraft AI. All rights reserved.</p>
      <p className="text-sm">
        Made with <span className="text-red-500">❤️</span> by Manish
      </p>
    </div>
  </div>
</footer>

          </ThemeProviderWrapper>
        </body>
      </html>
    </ClerkProvider>
  )
}

