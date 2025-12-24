'use client'

import { useState, useEffect } from 'react'
import { ArrowLeft, FileText, Copy, Code, Terminal, Layers, BookOpen, Download, HelpCircle, CheckCircle2, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import toast, { Toaster } from 'react-hot-toast'

export default function ReadmePage() {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        features: '',
        installation: 'npm install my-project',
        usage: 'npm run start',
        license: 'MIT'
    })

    const [previewText, setPreviewText] = useState('')

    const generateReadme = () => {
        return `# ${formData.title || 'Project Title'}

${formData.description || 'A brief description of what this project does and who it is for.'}

## Features

${formData.features ? formData.features.split('\n').map(f => `- ${f}`).join('\n') : '- Feature 1\n- Feature 2\n- Feature 3'}

## Installation

\`\`\`bash
${formData.installation}
\`\`\`

## Usage

\`\`\`bash
${formData.usage}
\`\`\`

## License

[${formData.license}](https://choosealicense.com/licenses/${formData.license.toLowerCase()}/)
`
    }

    // Update preview when form changes
    useEffect(() => {
        setPreviewText(generateReadme())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData])

    const handleCopy = () => {
        navigator.clipboard.writeText(previewText)
        toast.success('Markdown copied to clipboard!')
    }

    const handleDownload = () => {
        const content = previewText
        const blob = new Blob([content], { type: 'text/markdown' })
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = 'README.md'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        toast.success('Downloaded README.md')
    }

    return (
        <div className="min-h-screen bg-white dark:bg-black pt-24 pb-32">
            <Toaster position="bottom-center" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-12">
                    <Link href="/tools" className="inline-flex items-center text-sm font-bold text-gray-400 hover:text-gray-900 dark:hover:text-white mb-8 transition-colors uppercase tracking-widest">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Armory
                    </Link>
                    <h1 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-4 tracking-tight">
                        README <span className="text-indigo-600">ARCHITECT</span>
                    </h1>
                    <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl font-medium">
                        Create professional documentation for your GitHub repositories. Good documentation increases project value.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Form Section */}
                    <div className="space-y-8">
                        <div className="bg-gray-50 dark:bg-gray-900/30 rounded-3xl p-8 border border-gray-200 dark:border-gray-800 space-y-6">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
                                <FileText className="w-5 h-5 mr-2 text-indigo-600" /> Project Details
                            </h3>

                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Project Title</label>
                                <input
                                    type="text"
                                    placeholder="e.g. Super SaaS"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full px-4 py-3 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-indigo-600 outline-none transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Description</label>
                                <textarea
                                    rows={3}
                                    placeholder="What does your project do?"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full px-4 py-3 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-indigo-600 outline-none transition-all resize-none"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Features (One per line)</label>
                                <textarea
                                    rows={4}
                                    placeholder="Real-time updates&#10;Dark mode support&#10;Mobile responsive"
                                    value={formData.features}
                                    onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                                    className="w-full px-4 py-3 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-indigo-600 outline-none transition-all resize-none"
                                />
                            </div>
                        </div>

                        <div className="bg-gray-50 dark:bg-gray-900/30 rounded-3xl p-8 border border-gray-200 dark:border-gray-800 space-y-6">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
                                <Terminal className="w-5 h-5 mr-2 text-indigo-600" /> Technical
                            </h3>

                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Installation Command</label>
                                <div className="relative">
                                    <Code className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input
                                        type="text"
                                        value={formData.installation}
                                        onChange={(e) => setFormData({ ...formData, installation: e.target.value })}
                                        className="w-full pl-10 pr-4 py-3 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-indigo-600 outline-none transition-all font-mono text-sm"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Usage Command</label>
                                <div className="relative">
                                    <Terminal className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input
                                        type="text"
                                        value={formData.usage}
                                        onChange={(e) => setFormData({ ...formData, usage: e.target.value })}
                                        className="w-full pl-10 pr-4 py-3 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-indigo-600 outline-none transition-all font-mono text-sm"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Preview Section */}
                    <div className="relative h-full min-h-[600px]">
                        <div className="sticky top-24 h-[calc(100vh-8rem)] flex flex-col">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
                                    <BookOpen className="w-5 h-5 mr-2 text-indigo-600" /> Markdown Preview
                                </h3>
                                <div className="flex space-x-2">
                                    <button
                                        onClick={handleDownload}
                                        className="px-3 py-2 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg font-bold text-xs hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center"
                                    >
                                        <Download className="w-3 h-3 mr-1" /> MD
                                    </button>
                                    <button
                                        onClick={handleCopy}
                                        className="px-4 py-2 bg-black text-white dark:bg-white dark:text-black rounded-lg font-bold text-sm hover:opacity-80 transition-opacity flex items-center"
                                    >
                                        <Copy className="w-4 h-4 mr-2" /> Copy
                                    </button>
                                </div>
                            </div>

                            <textarea
                                value={previewText}
                                onChange={(e) => setPreviewText(e.target.value)}
                                className="w-full h-full min-h-[500px] bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-8 shadow-xl font-mono text-sm leading-relaxed text-gray-600 dark:text-gray-300 resize-none focus:ring-2 focus:ring-indigo-600 outline-none"
                            />
                        </div>
                    </div>
                </div>

                {/* SEO & Conversion Content */}
                <div className="mt-24 max-w-4xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                                Why Good Documentation Matters?
                            </h2>
                            <div className="space-y-4 text-gray-500 dark:text-gray-400 leading-relaxed">
                                <p>
                                    A great README is the first thing people see when they visit your repository. It's your chance to make a good first impression and explain why your project is useful.
                                </p>
                                <ul className="space-y-3 mt-4">
                                    <li className="flex items-start">
                                        <CheckCircle2 className="w-5 h-5 text-indigo-600 mr-3 flex-shrink-0 mt-0.5" />
                                        <span><strong>Increases Adoption:</strong> Clear installation steps make it easier for developers to use your tool.</span>
                                    </li>
                                    <li className="flex items-start">
                                        <CheckCircle2 className="w-5 h-5 text-indigo-600 mr-3 flex-shrink-0 mt-0.5" />
                                        <span><strong>Attracts Contributors:</strong> Open source projects with good docs get more pull requests.</span>
                                    </li>
                                    <li className="flex items-start">
                                        <CheckCircle2 className="w-5 h-5 text-indigo-600 mr-3 flex-shrink-0 mt-0.5" />
                                        <span><strong>Professionalism:</strong> Well-documented code is a sign of a high-quality project.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                                Frequently Asked Questions
                            </h2>
                            <div className="space-y-6">
                                <div>
                                    <h3 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center">
                                        <HelpCircle className="w-4 h-4 mr-2 text-gray-400" /> What is Markdown?
                                    </h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Markdown is a lightweight markup language used to format text. It's the standard for GitHub documentation.
                                    </p>
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center">
                                        <HelpCircle className="w-4 h-4 mr-2 text-gray-400" /> Can I add images?
                                    </h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Yes! You can add images using standard Markdown syntax: <code>![Alt Text](url)</code>.
                                    </p>
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center">
                                        <HelpCircle className="w-4 h-4 mr-2 text-gray-400" /> Is this free?
                                    </h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Yes, the Readme Architect is completely free for all developers.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* CTA Card */}
                    <div className="bg-black dark:bg-white rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
                        <div className="relative z-10">
                            <h2 className="text-3xl font-black text-white dark:text-black mb-4">
                                Project ready for launch?
                            </h2>
                            <p className="text-lg text-gray-400 dark:text-gray-600 mb-8 max-w-2xl mx-auto">
                                If you've built something valuable, don't just leave it on GitHub. Sell it on Websites Arena to a community of buyers.
                            </p>
                            <Link
                                href="/sell"
                                className="inline-flex items-center px-8 py-4 bg-white text-black dark:bg-black dark:text-white rounded-full font-bold text-lg hover:scale-105 transition-transform"
                            >
                                Sell Your Project <ArrowRight className="ml-2 w-5 h-5" />
                            </Link>
                        </div>

                        {/* Decorative Background */}
                        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                            <div className="absolute top-[-50%] left-[-20%] w-[500px] h-[500px] rounded-full bg-indigo-600 blur-[100px]"></div>
                            <div className="absolute bottom-[-50%] right-[-20%] w-[500px] h-[500px] rounded-full bg-purple-600 blur-[100px]"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
