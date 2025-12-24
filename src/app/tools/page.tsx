import Link from 'next/link'
import { ArrowLeft, Image as ImageIcon, Calculator, FileText, TrendingUp, Eye, FileSignature, Lock, Share2, BarChart3, Shield, ArrowRight } from 'lucide-react'

export const metadata = {
    title: 'The Armory - Developer Tools | Websites Arena',
    description: 'Equip yourself for the digital battlefield. Free tools for founders, developers, and indie hackers.',
}

const ToolCard = ({ href, title, description, icon: Icon, color, bgColor, borderColor, status }: any) => (
    <Link href={href} className={`group relative p-8 rounded-3xl border ${borderColor || 'border-gray-200 dark:border-gray-800'} ${bgColor || 'bg-gray-50 dark:bg-gray-900/30'} hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-300 flex flex-col h-full`}>
        <div className={`w-14 h-14 rounded-2xl ${bgColor} ${color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
            <Icon className="w-7 h-7" />
        </div>

        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
            {title}
        </h3>
        <p className="text-gray-500 dark:text-gray-400 mb-8 leading-relaxed flex-grow">
            {description}
        </p>

        <div className="flex items-center justify-between mt-auto">
            {status === 'Live' || status === 'New' ? (
                <span className="inline-flex items-center text-sm font-bold text-blue-600 hover:text-blue-500 uppercase tracking-widest">
                    Open Tool <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
            ) : (
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-gray-200 dark:bg-gray-800 text-xs font-bold text-gray-500 uppercase tracking-widest">
                    Coming Soon
                </span>
            )}
            {status === 'New' && (
                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-md uppercase">New</span>
            )}
        </div>
    </Link>
)

export default function ToolsPage() {
    return (
        <div className="min-h-screen bg-white dark:bg-black pt-24 pb-32">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Hero Section */}
                <div className="mb-12">
                    <h1 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-4 tracking-tight">
                        ARMORY
                    </h1>
                    <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl font-medium leading-relaxed">
                        Equip yourself for the digital battlefield. Essential utilities for founders, developers, and indie hackers to build, launch, and sell faster.
                    </p>
                </div>

                {/* Tools Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <ToolCard
                        href="/tools/image-compressor"
                        title="Image Compressor"
                        description="Optimize your images for SEO and speed without losing quality. Runs 100% in your browser."
                        icon={ImageIcon}
                        color="text-blue-600"
                        bgColor="bg-blue-50 dark:bg-blue-900/20"
                        borderColor="border-blue-200 dark:border-blue-800"
                        status="Live"
                    />

                    <ToolCard
                        href="/tools/valuation"
                        title="Website Worth Calculator"
                        description="Estimate the selling price of your project based on revenue, traffic, and tech stack."
                        icon={Calculator}
                        color="text-green-600"
                        bgColor="bg-green-50 dark:bg-green-900/20"
                        borderColor="border-green-200 dark:border-green-800"
                        status="Live"
                    />

                    <ToolCard
                        href="/tools/roi"
                        title="ROI Calculator"
                        description="Calculate break-even points and investment returns for potential acquisitions."
                        icon={BarChart3}
                        color="text-purple-600"
                        bgColor="bg-purple-50 dark:bg-purple-900/20"
                        borderColor="border-purple-200 dark:border-purple-800"
                        status="Live"
                    />

                    <ToolCard
                        href="/tools/privacy"
                        title="Privacy Policy Generator"
                        description="Generate standard legal policies for your SaaS or mobile app in seconds."
                        icon={Shield}
                        color="text-amber-600"
                        bgColor="bg-amber-50 dark:bg-amber-900/20"
                        borderColor="border-amber-200 dark:border-amber-800"
                        status="Live"
                    />

                    <ToolCard
                        href="/tools/social-preview"
                        title="Open Graph Generator"
                        description="Design and generate perfect Open Graph meta tags for your product launch."
                        icon={Share2}
                        color="text-pink-600"
                        bgColor="bg-pink-50 dark:bg-pink-900/20"
                        borderColor="border-pink-200 dark:border-pink-800"
                        status="Live"
                    />

                    <ToolCard
                        href="/tools/readme"
                        title="Readme Generator"
                        description="Build beautiful documentation for your GitHub repositories effortlessly."
                        icon={FileText}
                        color="text-indigo-600"
                        bgColor="bg-indigo-50 dark:bg-indigo-900/20"
                        borderColor="border-indigo-200 dark:border-indigo-800"
                        status="Live"
                    />

                    <ToolCard
                        href="/tools/model-release"
                        title="Model Release Form Generator"
                        description="Create legally binding consent forms for models. Essential for selling stock photography."
                        icon={FileSignature}
                        color="text-rose-600"
                        bgColor="bg-rose-50 dark:bg-rose-900/20"
                        borderColor="border-rose-200 dark:border-rose-800"
                        status="New"
                    />
                </div>

                {/* SEO Content / Footer */}
                <div className="mt-32 text-center">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                        Why use these tools?
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
                        We built The Armory to solve the small but annoying problems we face every day as builders.
                        No ads, no signups, just utility. Use them to polish your projects before listing them on the Arena.
                    </p>
                </div>
            </div>
        </div>
    )
}
