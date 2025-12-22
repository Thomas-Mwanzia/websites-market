import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Websites Arena | Buy & Sell Profitable Starter Websites",
  description: "The premier marketplace for buying and selling high-quality starter websites, niche blogs, and micro-SaaS projects. Start your online business journey today.",
  keywords: ["buy website", "starter site", "niche blog", "micro saas", "online business", "websites arena"],
  openGraph: {
    title: "Websites Arena | Buy & Sell Profitable Starter Websites",
    description: "The premier marketplace for buying and selling high-quality starter websites.",
    url: "https://websitesarena.com",
    siteName: "Websites Arena",
    locale: "en_US",
    type: "website",
  },
  verification: {
    google: "google-site-verification-code", // Replace with your actual Google Site Verification code
  },
  other: {
    "google-adsense-account": "ca-pub-2569322292527210"
  }
};

import { Suspense } from "react";
import Script from "next/script";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.className} bg-white dark:bg-black text-gray-900 dark:text-gray-100 min-h-screen flex flex-col`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Suspense fallback={<div className="h-16 border-b border-gray-200 dark:border-gray-900 bg-white/80 dark:bg-black/80 backdrop-blur-md" />}>
            <Navbar />
          </Suspense>
          <main className="flex-grow pt-16">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
        <script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_ID || 'ca-pub-2569322292527210'}`}
          crossOrigin="anonymous"
        />
      </body>
    </html>
  );
}
