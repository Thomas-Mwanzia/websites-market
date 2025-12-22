import Link from "next/link";
import { ArrowRight, CheckCircle, TrendingUp, Zap } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-black -z-10" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] -z-10 opacity-20" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 mb-8 font-medium text-sm">
            <span className="flex h-2 w-2 rounded-full bg-blue-600 mr-2 animate-pulse"></span>
            New Listings Added Daily
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-8">
            Buy Your Next <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              Profitable Business
            </span>
          </h1>

          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-10">
            Skip the setup. Buy high-quality, pre-built starter websites and micro-SaaS projects.
            Start earning from day one.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/shop"
              className="px-8 py-4 bg-blue-600 text-white rounded-full font-bold text-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-500/25 flex items-center"
            >
              Browse Marketplace <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              href="/sell"
              className="px-8 py-4 bg-white text-gray-900 border border-gray-200 rounded-full font-bold text-lg hover:bg-gray-50 transition-all dark:bg-gray-900 dark:text-white dark:border-gray-700 dark:hover:bg-gray-800"
            >
              Sell Your Site
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="p-8 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-6 text-blue-600 dark:text-blue-400">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Instant Delivery</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Get full access to your new website's code and assets immediately after purchase. No waiting.
              </p>
            </div>
            <div className="p-8 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center mb-6 text-purple-600 dark:text-purple-400">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Vetted Quality</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Every listing is manually reviewed for code quality, design, and potential profitability.
              </p>
            </div>
            <div className="p-8 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center mb-6 text-green-600 dark:text-green-400">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold mb-4">SEO Optimized</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Built with modern tech stacks (Next.js) and optimized for Google from the ground up.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gray-900 text-white overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid.svg')] opacity-10"></div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Your Empire?</h2>
          <p className="text-xl text-gray-300 mb-10">
            Join thousands of entrepreneurs who found their next big idea on Websites Arena.
          </p>
          <Link
            href="/shop"
            className="inline-flex px-8 py-4 bg-white text-black rounded-full font-bold text-lg hover:bg-gray-100 transition-all"
          >
            View All Listings
          </Link>
        </div>
      </section>
    </div>
  );
}
