'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { ArrowLeft, Download, Image as ImageIcon, Type, Palette, Upload, RefreshCw, CheckCircle2, HelpCircle, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { toPng } from 'html-to-image'
import { useDropzone } from 'react-dropzone'
import toast, { Toaster } from 'react-hot-toast'

export default function SocialPreviewPage() {
    const [title, setTitle] = useState('My Awesome Project')
    const [description, setDescription] = useState('The best way to build and launch your next big idea.')
    const [bgColor, setBgColor] = useState('#000000')
    const [textColor, setTextColor] = useState('#ffffff')
    const [headingColor, setHeadingColor] = useState('#ffffff')
    const [descriptionColor, setDescriptionColor] = useState('#ffffff')
    const [logo, setLogo] = useState<string | null>(null)
    const [isLogoRounded, setIsLogoRounded] = useState(false)
    const [showBgLogo, setShowBgLogo] = useState(false)
    const [bgOpacity, setBgOpacity] = useState(0.1)
    const [isGenerating, setIsGenerating] = useState(false)

    const previewRef = useRef<HTMLDivElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const [scale, setScale] = useState(1)

    useEffect(() => {
        const handleResize = () => {
            if (containerRef.current) {
                const containerWidth = containerRef.current.offsetWidth
                const padding = 64 // 32px padding on each side (p-8)
                const availableWidth = containerWidth - padding
                const newScale = Math.min(availableWidth / 1200, 1)
                setScale(newScale)
            }
        }

        handleResize()
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const file = acceptedFiles[0]
        if (file) {
            const url = URL.createObjectURL(file)
            setLogo(url)
        }
    }, [])

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: { 'image/*': [] },
        maxFiles: 1
    })

    const handleDownload = async () => {
        if (!previewRef.current) return
        setIsGenerating(true)

        try {
            const dataUrl = await toPng(previewRef.current, {
                quality: 1.0,
                width: 1200,
                height: 630,
                style: {
                    transform: 'none',
                    transformOrigin: 'top left'
                }
            })

            const link = document.createElement('a')
            link.download = 'social-preview.png'
            link.href = dataUrl
            link.click()
            toast.success('Image downloaded!')
        } catch (err) {
            console.error(err)
            toast.error('Failed to generate image.')
        } finally {
            setIsGenerating(false)
        }
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
                        SOCIAL <span className="text-pink-600">PREVIEW</span>
                    </h1>
                    <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl font-medium">
                        Design beautiful Open Graph images for your project launch. Stand out on Twitter, LinkedIn, and Discord.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Controls */}
                    <div className="space-y-6">
                        <div className="bg-gray-50 dark:bg-gray-900/30 rounded-3xl p-6 border border-gray-200 dark:border-gray-800 space-y-4">
                            <h3 className="font-bold text-gray-900 dark:text-white flex items-center mb-4">
                                <Type className="w-4 h-4 mr-2 text-pink-600" /> Content
                            </h3>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Title</label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="w-full px-4 py-2 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-pink-600 outline-none transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Description</label>
                                <textarea
                                    rows={3}
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="w-full px-4 py-2 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-pink-600 outline-none transition-all resize-none"
                                />
                            </div>
                        </div>

                        <div className="bg-gray-50 dark:bg-gray-900/30 rounded-3xl p-6 border border-gray-200 dark:border-gray-800 space-y-4">
                            <h3 className="font-bold text-gray-900 dark:text-white flex items-center mb-4">
                                <Palette className="w-4 h-4 mr-2 text-pink-600" /> Style
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Background</label>
                                    <div className="flex items-center space-x-2">
                                        <input
                                            type="color"
                                            value={bgColor}
                                            onChange={(e) => setBgColor(e.target.value)}
                                            className="w-10 h-10 rounded-lg cursor-pointer border-none p-0 bg-transparent"
                                        />
                                        <span className="text-xs font-mono text-gray-500">{bgColor}</span>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Heading Color</label>
                                    <div className="flex items-center space-x-2">
                                        <input
                                            type="color"
                                            value={headingColor}
                                            onChange={(e) => setHeadingColor(e.target.value)}
                                            className="w-10 h-10 rounded-lg cursor-pointer border-none p-0 bg-transparent"
                                        />
                                        <span className="text-xs font-mono text-gray-500">{headingColor}</span>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Description Color</label>
                                    <div className="flex items-center space-x-2">
                                        <input
                                            type="color"
                                            value={descriptionColor}
                                            onChange={(e) => setDescriptionColor(e.target.value)}
                                            className="w-10 h-10 rounded-lg cursor-pointer border-none p-0 bg-transparent"
                                        />
                                        <span className="text-xs font-mono text-gray-500">{descriptionColor}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-50 dark:bg-gray-900/30 rounded-3xl p-6 border border-gray-200 dark:border-gray-800 space-y-4">
                            <h3 className="font-bold text-gray-900 dark:text-white flex items-center mb-4">
                                <ImageIcon className="w-4 h-4 mr-2 text-pink-600" /> Logo
                            </h3>
                            <div {...getRootProps()} className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-4 text-center cursor-pointer hover:border-pink-500 transition-colors">
                                <input {...getInputProps()} />
                                <Upload className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                                <p className="text-xs text-gray-500">Click to upload logo</p>
                            </div>
                            {logo && (
                                <button
                                    onClick={() => setLogo(null)}
                                    className="text-xs text-red-500 font-bold hover:underline w-full text-center"
                                >
                                    Remove Logo
                                </button>
                            )}
                            {logo && (
                                <div className="space-y-4 mt-4 pt-4 border-t border-gray-200 dark:border-gray-800">
                                    <label className="flex items-center space-x-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={isLogoRounded}
                                            onChange={(e) => setIsLogoRounded(e.target.checked)}
                                            className="rounded text-pink-600 focus:ring-pink-500"
                                        />
                                        <span className="text-xs font-bold text-gray-500 uppercase">Round Logo</span>
                                    </label>

                                    <label className="flex items-center space-x-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={showBgLogo}
                                            onChange={(e) => setShowBgLogo(e.target.checked)}
                                            className="rounded text-pink-600 focus:ring-pink-500"
                                        />
                                        <span className="text-xs font-bold text-gray-500 uppercase">Show in Background</span>
                                    </label>

                                    {showBgLogo && (
                                        <div>
                                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                                                Opacity: {(bgOpacity * 100).toFixed(0)}%
                                            </label>
                                            <input
                                                type="range"
                                                min="0.05"
                                                max="0.5"
                                                step="0.05"
                                                value={bgOpacity}
                                                onChange={(e) => setBgOpacity(parseFloat(e.target.value))}
                                                className="w-full h-1 bg-gray-200 dark:bg-gray-800 rounded-lg appearance-none cursor-pointer accent-pink-600"
                                            />
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Preview Area */}
                    <div className="lg:col-span-2 space-y-6">
                        <div ref={containerRef} className="bg-gray-100 dark:bg-gray-900 rounded-3xl p-4 md:p-8 flex items-center justify-center min-h-[400px] overflow-hidden">
                            {/* The actual card to capture */}
                            <div
                                ref={previewRef}
                                style={{
                                    backgroundColor: bgColor,
                                    color: textColor,
                                    width: '1200px',
                                    height: '630px',
                                    transform: `scale(${scale})`,
                                    transformOrigin: 'center center',
                                    flexShrink: 0,
                                }}
                                className="flex flex-col items-center justify-center p-16 text-center relative shadow-2xl overflow-hidden"
                            >
                                {/* Background Logo */}
                                {logo && showBgLogo && (
                                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                        <img
                                            src={logo}
                                            alt="Background"
                                            style={{ opacity: bgOpacity }}
                                            className="w-full h-full object-cover grayscale"
                                        />
                                    </div>
                                )}

                                <div className="relative z-10 flex flex-col items-center w-full">
                                    {logo && (
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <img
                                            src={logo}
                                            alt="Logo"
                                            className={`w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 object-contain mb-4 sm:mb-6 md:mb-8 ${isLogoRounded ? 'rounded-full' : ''}`}
                                        />
                                    )}
                                    <h1
                                        style={{ color: headingColor }}
                                        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black mb-3 sm:mb-4 md:mb-6 leading-tight">
                                        {title}
                                    </h1>
                                    <p
                                        style={{ color: descriptionColor }}
                                        className="text-sm sm:text-base md:text-lg lg:text-2xl font-medium opacity-80 max-w-3xl leading-relaxed">
                                        {description}
                                    </p>
                                </div>


                            </div>
                        </div>

                        <button
                            onClick={handleDownload}
                            disabled={isGenerating}
                            className="w-full py-4 bg-black text-white dark:bg-white dark:text-black rounded-xl font-bold text-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-all flex items-center justify-center disabled:opacity-50"
                        >
                            {isGenerating ? (
                                <><RefreshCw className="w-5 h-5 mr-2 animate-spin" /> Generating...</>
                            ) : (
                                <><Download className="w-5 h-5 mr-2" /> Download Image (PNG)</>
                            )}
                        </button>
                    </div>
                </div>

                {/* SEO & Conversion Content */}
                <div className="mt-24 max-w-4xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                                Why Open Graph Matters?
                            </h2>
                            <div className="space-y-4 text-gray-500 dark:text-gray-400 leading-relaxed">
                                <p>
                                    Social preview images (Open Graph) are the first thing users see when your link is shared on Twitter, LinkedIn, or Facebook.
                                </p>
                                <ul className="space-y-3 mt-4">
                                    <li className="flex items-start">
                                        <CheckCircle2 className="w-5 h-5 text-pink-600 mr-3 flex-shrink-0 mt-0.5" />
                                        <span><strong>Higher CTR:</strong> Links with images get 200% more clicks than those without.</span>
                                    </li>
                                    <li className="flex items-start">
                                        <CheckCircle2 className="w-5 h-5 text-pink-600 mr-3 flex-shrink-0 mt-0.5" />
                                        <span><strong>Brand Authority:</strong> A professional preview image builds trust instantly.</span>
                                    </li>
                                    <li className="flex items-start">
                                        <CheckCircle2 className="w-5 h-5 text-pink-600 mr-3 flex-shrink-0 mt-0.5" />
                                        <span><strong>Stand Out:</strong> Grab attention in busy social media feeds.</span>
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
                                        <HelpCircle className="w-4 h-4 mr-2 text-gray-400" /> What size is the image?
                                    </h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        We generate images at 1200x630 pixels, which is the recommended standard for Facebook, Twitter, and LinkedIn.
                                    </p>
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center">
                                        <HelpCircle className="w-4 h-4 mr-2 text-gray-400" /> Is it free?
                                    </h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Yes, this tool is 100% free to use. No watermarks, no sign-up required.
                                    </p>
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center">
                                        <HelpCircle className="w-4 h-4 mr-2 text-gray-400" /> Can I use my own logo?
                                    </h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Absolutely. You can upload any PNG or JPG logo to customize your preview card.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* CTA Card */}
                    <div className="bg-black dark:bg-white rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
                        <div className="relative z-10">
                            <h2 className="text-3xl font-black text-white dark:text-black mb-4">
                                Launching a product?
                            </h2>
                            <p className="text-lg text-gray-400 dark:text-gray-600 mb-8 max-w-2xl mx-auto">
                                Don't just share it on social media. List it on Websites Arena to reach serious buyers and investors.
                            </p>
                            <Link
                                href="/sell"
                                className="inline-flex items-center px-8 py-4 bg-white text-black dark:bg-black dark:text-white rounded-full font-bold text-lg hover:scale-105 transition-transform"
                            >
                                List Your Product <ArrowRight className="ml-2 w-5 h-5" />
                            </Link>
                        </div>

                        {/* Decorative Background */}
                        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                            <div className="absolute top-[-50%] left-[-20%] w-[500px] h-[500px] rounded-full bg-pink-600 blur-[100px]"></div>
                            <div className="absolute bottom-[-50%] right-[-20%] w-[500px] h-[500px] rounded-full bg-rose-600 blur-[100px]"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
