import { Mail, MessageSquare } from 'lucide-react'
import { ContactForm } from '@/components/contact/ContactForm'


export const metadata = {
    title: 'Contact Us | Websites Arena',
    description: 'Have questions or need support? Contact the Websites Arena team for assistance with buying or selling digital assets.',
}

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-white dark:bg-black pt-24 pb-32">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-20">
                    <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-10 font-medium leading-relaxed">
                        Have questions about a listing or want to sell your site? We're here to help.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-3xl mx-auto">
                    <div className="p-8 bg-gray-50 dark:bg-gray-900/30 rounded-[2.5rem] border border-gray-200 dark:border-gray-800">
                        <div className="w-14 h-14 bg-white dark:bg-black rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
                            <Mail className="w-7 h-7 text-blue-600" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 text-center">Email Us</h3>

                        <ContactForm />
                    </div>

                    <div className="p-10 bg-gray-50 dark:bg-gray-900/30 rounded-[2.5rem] border border-gray-200 dark:border-gray-800 text-center">
                        <div className="w-14 h-14 bg-white dark:bg-black rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-sm">
                            <MessageSquare className="w-7 h-7 text-blue-600" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Sell Your Site</h3>
                        <p className="text-gray-500 dark:text-gray-400 mb-6 font-medium">Ready to list your project?</p>
                        <a href="mailto:hello@websitesarena.com?subject=Sell My Website" className="text-blue-600 font-bold hover:underline">
                            hello@websitesarena.com
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )

