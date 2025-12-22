import { Shield, Target, Users, Zap } from 'lucide-react'

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-white dark:bg-black">
            {/* Hero Section */}
            <section className="pt-24 pb-32 px-4 bg-white dark:bg-black">
                <div className="max-w-7xl mx-auto text-center">
                    <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-10 font-medium leading-relaxed">
                        Websites Arena is the premier marketplace for high-quality, pre-built starter websites. We bridge the gap between talented developers and ambitious entrepreneurs.
                    </p>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-32 px-4 border-y border-gray-200 dark:border-gray-900 bg-gray-50/30 dark:bg-gray-900/10">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8">Empowering Creators</h2>
                            <p className="text-lg text-gray-500 dark:text-gray-400 mb-8 leading-relaxed font-medium">
                                We believe that starting an online business shouldn't take months of development and thousands of dollars. Our mission is to provide ready-to-launch assets that allow anyone to start their entrepreneurial journey in minutes.
                            </p>
                            <p className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed font-medium">
                                Every website listed on our platform is hand-vetted for quality, SEO optimization, and ease of use. We don't just sell code; we sell the foundation for your future success.
                            </p>
                        </div>
                        <div className="grid grid-cols-2 gap-8">
                            <div className="p-8 bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-sm">
                                <Zap className="w-10 h-10 text-blue-600 mb-6" />
                                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Speed</h4>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Launch your business in under 10 minutes.</p>
                            </div>
                            <div className="p-8 bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-sm">
                                <Shield className="w-10 h-10 text-blue-600 mb-6" />
                                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Security</h4>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Secure payments and verified delivery.</p>
                            </div>
                            <div className="p-8 bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-sm">
                                <Target className="w-10 h-10 text-blue-600 mb-6" />
                                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Quality</h4>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Vetted codebases and modern stacks.</p>
                            </div>
                            <div className="p-8 bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-sm">
                                <Users className="w-10 h-10 text-blue-600 mb-6" />
                                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Support</h4>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Assistance for every single purchase.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Founder Section */}
            <section className="py-32 px-4 bg-white dark:bg-black">
                <div className="max-w-3xl mx-auto text-center">
                    <div className="w-20 h-20 bg-black dark:bg-white rounded-full mx-auto mb-12 flex items-center justify-center text-white dark:text-black text-2xl font-black">
                        TM
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8">A Message from the Founder</h2>
                    <p className="text-xl italic text-gray-500 dark:text-gray-400 mb-12 leading-relaxed font-medium">
                        "I built Websites Arena because I saw too many great ideas die in the development phase. By providing high-quality starter sites, we're giving people the head start they need to focus on growth."
                    </p>
                    <div className="text-lg font-bold text-gray-900 dark:text-white">Thomas Mwanzia</div>
                    <div className="text-sm text-gray-500 font-bold uppercase tracking-widest">Founder, Websites Arena</div>
                </div>
            </section>
        </div>
    )
}
