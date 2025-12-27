export const metadata = {
    title: 'Privacy Policy | Websites Arena',
    description: 'Read our Privacy Policy to understand how we collect, use, and protect your personal information.',
}

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-white dark:bg-black pt-24 pb-32">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="max-w-none space-y-12">
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">1. Information We Collect</h2>
                        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                            We collect information you provide directly to us when you create an account, make a purchase, or communicate with us. This may include your name, email address, and payment information.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">2. How We Use Your Information</h2>
                        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                            We use the information we collect to provide, maintain, and improve our services, to process your transactions, and to communicate with you about your account and our services.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">3. Data Security</h2>
                        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                            We take reasonable measures to help protect information about you from loss, theft, misuse, and unauthorized access, disclosure, alteration, and destruction.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">4. Third-Party Services</h2>
                        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                            We use third-party services like Lemon Squeezy for payment processing and Sanity for content management. These services have their own privacy policies.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    )
}
