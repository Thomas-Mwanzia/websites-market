import { Shield, Target, Users, Zap } from 'lucide-react'
import { Dancing_Script } from 'next/font/google'
import Image from 'next/image'

const signature = Dancing_Script({ subsets: ['latin'] })

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-white dark:bg-black">
            {/* Hero Section */}
            <section className="pt-24 pb-32 px-4 bg-white dark:bg-black">
                <div className="max-w-7xl mx-auto text-center">
                    <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-10 font-medium leading-relaxed">
                        Websites Arena is the premier marketplace for high-quality digital assets. We bridge the gap between talented creators and ambitious entrepreneurs.
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
                                We believe that starting an online business shouldn't take months of development. Our mission is to provide ready-to-launch assets—from SaaS codebases to design templates—that allow anyone to start their entrepreneurial journey in minutes.
                            </p>
                            <p className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed font-medium">
                                Every asset listed on our platform is hand-vetted for quality, utility, and ease of use. We don't just sell files; we sell the foundation for your future success.
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
                    <div className="relative w-32 h-32 mx-auto mb-8 rounded-full overflow-hidden border-4 border-gray-100 dark:border-gray-800 shadow-xl">
                        <Image
                            src="/founder.png"
                            alt="Thomas Mwanzia"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <h2 className={`text-4xl md:text-5xl font-bold text-blue-600 mb-8 ${signature.className}`}>A Message from the Founder</h2>
                    <p className="text-xl italic text-gray-500 dark:text-gray-400 mb-12 leading-relaxed font-medium">
                        "In the digital economy, speed is the ultimate competitive advantage. Websites Arena was built to eliminate the technical friction that slows down innovation. Our goal is simple: to provide entrepreneurs with the high-caliber, vetted assets they need to skip the build phase and go straight to market dominance."
                    </p>
                    <div className={`text-4xl font-bold text-blue-600 mb-2 ${signature.className}`}>Thomas Mwanzia</div>
                    <div className="text-sm text-gray-500 font-bold uppercase tracking-widest">Founder, Websites Arena</div>
                </div>
            </section>
        </div>
    )
}
