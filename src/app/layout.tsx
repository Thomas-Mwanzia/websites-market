import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter, Libre_Baskerville } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { ScrollToTop } from "@/components/ui/ScrollToTop";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });
const inter = Inter({
  subsets: ["latin"],
  variable: '--font-inter',
});
const libreBaskerville = Libre_Baskerville({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Websites Arena | Buy & Sell Digital Assets, Websites, Online businesses & Templates",
  description: "The premier marketplace for buying and selling premium digital assets: starter websites, SaaS codebases, e-books, design templates, and more.",
  applicationName: "Websites Arena",
  keywords: ["buy website", "starter site", "digital assets", "micro saas", "e-books", "templates", "ui kits", "online business", "websites arena", "web arena", "webs arena", "website arena", "dev arena", "site arena", "flippa alternative", "acquire.com alternative", "tiny acquisitions alternative"],
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },
  openGraph: {
    title: "Websites Arena | Buy & Sell Digital Assets, Websites, Online businesses & Templates",
    description: "The premier marketplace for buying and selling premium digital assets: starter websites, SaaS codebases, e-books, design templates, and more.",
    url: "https://websitesarena.com",
    siteName: "Websites Arena",
    locale: "en_US",
    type: "website",
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "google-site-verification-code",
  },
  twitter: {
    card: "summary_large_image",
    site: "@websitesarena",
    creator: "@websitesarena",
  }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "name": "Websites Arena",
      "url": "https://websitesarena.com",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://websitesarena.com/shop?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@type": "Organization",
      "name": "Websites Arena",
      "url": "https://websitesarena.com",
      "logo": "https://websitesarena.com/icon.png",
      "sameAs": [
        "https://twitter.com/websitesarena",
        "https://linkedin.com/company/websitesarena"
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "",
        "contactType": "customer service",
        "email": "support@websitesarena.com"
      }
    }
  ]
};

const navigationJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "itemListElement": [
    {
      "@type": "SiteNavigationElement",
      "position": 1,
      "name": "Shop",
      "url": "https://websitesarena.com/"
    },
    {
      "@type": "SiteNavigationElement",
      "position": 2,
      "name": "Sell",
      "url": "https://websitesarena.com/sell"
    },
    {
      "@type": "SiteNavigationElement",
      "position": 3,
      "name": "Pricing",
      "url": "https://websitesarena.com/pricing"
    },
    {
      "@type": "SiteNavigationElement",
      "position": 4,
      "name": "Tools",
      "url": "https://websitesarena.com/tools"
    },
    {
      "@type": "SiteNavigationElement",
      "position": 5,
      "name": "Business Suite",
      "url": "https://websitesarena.com/tools/business-suite"
    },
    {
      "@type": "SiteNavigationElement",
      "position": 6,
      "name": "Blog",
      "url": "https://websitesarena.com/blog"
    },
    {
      "@type": "SiteNavigationElement",
      "position": 7,
      "name": "About",
      "url": "https://websitesarena.com/about"
    }
  ]
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
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(navigationJsonLd) }}
        />
      </head>
      <body className={`${jakarta.className} ${inter.variable} ${libreBaskerville.variable} bg-white dark:bg-black text-gray-900 dark:text-gray-100 min-h-screen flex flex-col`}>
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
        <ScrollToTop />
      </body>
    </html>
  );
}
