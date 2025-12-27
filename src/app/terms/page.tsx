export const metadata = {
    title: 'Terms of Service | Websites Arena',
    description: 'Review our Terms of Service to understand the rules and regulations for using Websites Arena.',
}

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-white dark:bg-black pt-24 pb-32">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="max-w-none space-y-12">
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">1. Acceptance of Terms</h2>
                        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                            By accessing or using Websites Arena, you agree to be bound by these Terms of Service and all applicable laws and regulations.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">2. Use License</h2>
                        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                            When you purchase a digital asset from Websites Arena, you are granted a non-exclusive, non-transferable license to use the code/files for your own business purposes. You may not resell the asset as a template or starter kit.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">3. Refund Policy</h2>
                        <p className="mb-4 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                            We offer a <strong>10-day money-back guarantee</strong> for all digital assets purchased on Websites Arena. If you're not satisfied with your purchase, you're entitled to a refund if you request it within 10 days of the delivery date.
                        </p>

                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">How to Request a Refund:</h3>
                        <ul className="list-disc list-inside space-y-2 mb-6 text-gray-600 dark:text-gray-300">
                            <li>Contact us at <span className="text-green-600 font-bold">support@websitesarena.com</span> within 10 days of delivery</li>
                            <li>Provide your order ID and brief reason for the refund request</li>
                            <li>Our team will verify eligibility and process the refund within 5-7 business days</li>
                        </ul>

                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">What Qualifies for a Refund:</h3>
                        <ul className="list-disc list-inside space-y-2 mb-6 text-gray-600 dark:text-gray-300">
                            <li>Product does not match the description or preview shown</li>
                            <li>Product is defective or corrupted</li>
                            <li>Product is incompatible with your environment</li>
                            <li>Change of mind (within 10 days)</li>
                        </ul>

                        <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                            <strong>Note:</strong> The 10-day period starts from the date you received/downloaded the digital asset. Refunds are not available after this period has elapsed.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">4. Disclaimer</h2>
                        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                            The materials on Websites Arena are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    )
}
