import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-white dark:bg-black text-gray-900 dark:text-gray-100 min-h-screen flex flex-col`}>
        <Navbar />
        <main className="flex-grow pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
