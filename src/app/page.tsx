import Link from "next/link";
import { ArrowRight, CheckCircle, TrendingUp, Zap, Globe, Shield, CreditCard } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 lg:py-40 bg-white dark:bg-black overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 mb-10 max-w-2xl mx-auto font-medium leading-relaxed">
              The premier marketplace for high-quality starter websites and micro-SaaS projects. Hand-vetted and ready for growth.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link
                href="/shop"
                className="px-10 py-5 bg-black text-white dark:bg-white dark:text-black rounded-full font-bold text-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-all flex items-center"
              >
                Browse Marketplace <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                href="/sell"
                className="px-10 py-5 bg-white text-gray-900 border border-gray-200 rounded-full font-bold text-lg hover:bg-gray-50 transition-all dark:bg-black dark:text-white dark:border-gray-800 dark:hover:bg-gray-900"
              >
                Sell Your Site
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats/Trust Bar */}
      <section className="py-12 border-y border-gray-200 dark:border-gray-900 bg-gray-50/50 dark:bg-gray-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">100%</div>
              <div className="text-sm text-gray-500 uppercase tracking-wider font-semibold">Vetted Sites</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">24h</div>
              <div className="text-sm text-gray-500 uppercase tracking-wider font-semibold">Avg. Delivery</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">$0</div>
              <div className="text-sm text-gray-500 uppercase tracking-wider font-semibold">Listing Fees</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">15%</div>
              <div className="text-sm text-gray-500 uppercase tracking-wider font-semibold">Commission</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-32 bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Built for Success</h2>
            <p className="text-gray-500 dark:text-gray-400 text-lg max-w-2xl mx-auto font-medium">Every project in the Arena is vetted for quality and potential.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <div className="group">
              <div className="w-14 h-14 bg-gray-100 dark:bg-gray-900 rounded-2xl flex items-center justify-center mb-8 text-gray-900 dark:text-white transition-colors group-hover:bg-blue-600 group-hover:text-white">
                <Zap className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Instant Delivery</h3>
              <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                Get full access to your new website's code and assets immediately after purchase. No waiting, no friction.
              </p>
            </div>
            <div className="group">
              <div className="w-14 h-14 bg-gray-100 dark:bg-gray-900 rounded-2xl flex items-center justify-center mb-8 text-gray-900 dark:text-white transition-colors group-hover:bg-blue-600 group-hover:text-white">
                <Shield className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Vetted Quality</h3>
              <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                Every listing is manually reviewed for code quality, design standards, and potential profitability.
              </p>
            </div>
            <div className="group">
              <div className="w-14 h-14 bg-gray-100 dark:bg-gray-900 rounded-2xl flex items-center justify-center mb-8 text-gray-900 dark:text-white transition-colors group-hover:bg-blue-600 group-hover:text-white">
                <Globe className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">SEO Optimized</h3>
              <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                Built with modern tech stacks (Next.js) and optimized for search engines from the ground up.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-black text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to start your journey?</h2>
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto font-medium">Join hundreds of entrepreneurs building their digital empire with Websites Arena.</p>
          <Link
            href="/shop"
            className="inline-flex px-12 py-6 bg-white text-black rounded-full font-bold text-xl hover:bg-gray-100 transition-all"
          >
            Explore Marketplace
          </Link>
        </div>
      </section>
    </div>
  );
}
