'use client'

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import imageCompression from 'browser-image-compression'
import { ArrowLeft, Upload, Download, Image as ImageIcon, RefreshCw, CheckCircle2, AlertCircle, HelpCircle, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import toast, { Toaster } from 'react-hot-toast'

export default function ImageCompressorPage() {
    const [originalFile, setOriginalFile] = useState<File | null>(null)
    const [compressedFile, setCompressedFile] = useState<File | null>(null)
    const [isCompressing, setIsCompressing] = useState(false)
    const [compressionLevel, setCompressionLevel] = useState(0.8) // 0 to 1

    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        const file = acceptedFiles[0]
        if (file) {
            setOriginalFile(file)
            setCompressedFile(null) // Reset previous result
            await compressImage(file, compressionLevel)
        }
    }, [compressionLevel])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/jpeg': [],
            'image/png': [],
            'image/webp': []
        },
        maxFiles: 1
    })

    const compressImage = async (file: File, quality: number) => {
        setIsCompressing(true)
        try {
            const options = {
                maxSizeMB: 1,
                maxWidthOrHeight: 1920,
                useWebWorker: true,
                initialQuality: quality,
            }
            const compressedBlob = await imageCompression(file, options)
            // Create a new File object from the Blob to keep the name
            const compressed = new File([compressedBlob], file.name, {
                type: file.type,
                lastModified: Date.now(),
            })
            setCompressedFile(compressed)
            toast.success('Image compressed successfully!')
        } catch (error) {
            console.error(error)
            toast.error('Failed to compress image.')
        } finally {
            setIsCompressing(false)
        }
    }

    const handleQualityChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const newQuality = parseFloat(e.target.value)
        setCompressionLevel(newQuality)
        if (originalFile) {
            await compressImage(originalFile, newQuality)
        }
    }

    const formatSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes'
        const k = 1024
        const sizes = ['Bytes', 'KB', 'MB', 'GB']
        const i = Math.floor(Math.log(bytes) / Math.log(k))
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
    }

    const calculateSavings = () => {
        if (!originalFile || !compressedFile) return 0
        const savings = ((originalFile.size - compressedFile.size) / originalFile.size) * 100
        return savings.toFixed(0)
    }

    const downloadImage = () => {
        if (!compressedFile) return
        const url = URL.createObjectURL(compressedFile)
        const link = document.createElement('a')
        link.href = url
        link.download = `optimized-${originalFile?.name}`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    return (
        <div className="min-h-screen bg-white dark:bg-black pt-24 pb-32">
            <Toaster position="bottom-center" />
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-12">
                    <Link href="/tools" className="inline-flex items-center text-sm font-bold text-gray-400 hover:text-gray-900 dark:hover:text-white mb-8 transition-colors uppercase tracking-widest">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Armory
                    </Link>
                    <h1 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-4 tracking-tight">
                        IMAGE <span className="text-blue-600">COMPRESSOR</span>
                    </h1>
                    <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl font-medium">
                        Optimize your images for lightning-fast load times. Secure, client-side compression that never uploads your files to a server.
                    </p>
                </div>

                {/* Main Tool Area */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left: Upload / Preview */}
                    <div className="lg:col-span-2 space-y-8">
                        {!originalFile ? (
                            <div
                                {...getRootProps()}
                                className={`border-4 border-dashed rounded-3xl h-96 flex flex-col items-center justify-center cursor-pointer transition-all ${isDragActive
                                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                                    : 'border-gray-200 dark:border-gray-800 hover:border-blue-400 dark:hover:border-blue-600 bg-gray-50 dark:bg-gray-900/30'
                                    }`}
                            >
                                <input {...getInputProps()} />
                                <div className="w-20 h-20 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center mb-6 shadow-sm">
                                    <Upload className="w-8 h-8 text-blue-600" />
                                </div>
                                <p className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                    Drop your image here
                                </p>
                                <p className="text-gray-500 dark:text-gray-400">
                                    or click to browse (JPG, PNG, WebP)
                                </p>
                            </div>
                        ) : (
                            <div className="bg-gray-50 dark:bg-gray-900/30 rounded-3xl p-8 border border-gray-200 dark:border-gray-800">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="font-bold text-gray-900 dark:text-white flex items-center">
                                        <ImageIcon className="w-5 h-5 mr-2 text-blue-600" /> Preview
                                    </h3>
                                    <button
                                        onClick={() => {
                                            setOriginalFile(null)
                                            setCompressedFile(null)
                                        }}
                                        className="text-sm font-bold text-red-500 hover:text-red-600"
                                    >
                                        Remove
                                    </button>
                                </div>

                                <div className="relative aspect-video bg-gray-200 dark:bg-gray-800 rounded-2xl overflow-hidden flex items-center justify-center">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={URL.createObjectURL(originalFile)}
                                        alt="Preview"
                                        className="max-w-full max-h-full object-contain"
                                    />
                                    {isCompressing && (
                                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center backdrop-blur-sm">
                                            <RefreshCw className="w-10 h-10 text-white animate-spin" />
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right: Controls & Stats */}
                    <div className="space-y-6">
                        {/* Stats Card */}
                        <div className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-xl shadow-gray-200/50 dark:shadow-none">
                            <h3 className="font-bold text-gray-900 dark:text-white mb-6 uppercase tracking-widest text-sm">
                                Compression Stats
                            </h3>

                            <div className="space-y-6">
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Original Size</p>
                                    <p className="text-2xl font-black text-gray-900 dark:text-white">
                                        {originalFile ? formatSize(originalFile.size) : '-'}
                                    </p>
                                </div>

                                <div className="relative">
                                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-px bg-gray-200 dark:bg-gray-800"></div>
                                    <div className="relative z-10 bg-white dark:bg-black w-8 h-8 rounded-full border border-gray-200 dark:border-gray-800 flex items-center justify-center mx-auto">
                                        <ArrowLeft className="w-4 h-4 text-gray-400 rotate-[-90deg]" />
                                    </div>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Optimized Size</p>
                                    <div className="flex items-end gap-3">
                                        <p className="text-4xl font-black text-blue-600">
                                            {compressedFile ? formatSize(compressedFile.size) : '-'}
                                        </p>
                                        {compressedFile && (
                                            <span className="mb-1.5 px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 text-xs font-bold rounded-lg">
                                                -{calculateSavings()}%
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {originalFile && (
                                <div className="mt-8 pt-8 border-t border-gray-100 dark:border-gray-900">
                                    <label className="block text-sm font-bold text-gray-900 dark:text-white mb-4">
                                        Quality: {(compressionLevel * 100).toFixed(0)}%
                                    </label>
                                    <input
                                        type="range"
                                        min="0.1"
                                        max="1"
                                        step="0.1"
                                        value={compressionLevel}
                                        onChange={handleQualityChange}
                                        className="w-full h-2 bg-gray-200 dark:bg-gray-800 rounded-lg appearance-none cursor-pointer accent-blue-600"
                                    />
                                    <div className="flex justify-between text-xs text-gray-400 mt-2 font-medium">
                                        <span>Max Compression</span>
                                        <span>Best Quality</span>
                                    </div>
                                </div>
                            )}

                            <button
                                onClick={downloadImage}
                                disabled={!compressedFile}
                                className="w-full mt-8 py-4 bg-black text-white dark:bg-white dark:text-black rounded-2xl font-bold text-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Download className="w-5 h-5 mr-2" /> Download
                            </button>
                        </div>

                        {/* SEO / Trust Box */}
                        <div className="bg-blue-50 dark:bg-blue-900/10 rounded-3xl p-6 border border-blue-100 dark:border-blue-900/20">
                            <div className="flex items-start">
                                <AlertCircle className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
                                <div>
                                    <h4 className="font-bold text-blue-900 dark:text-blue-100 text-sm mb-1">Privacy First</h4>
                                    <p className="text-xs text-blue-700 dark:text-blue-300 leading-relaxed">
                                        Your images are compressed locally in your browser. They are never uploaded to our servers, ensuring 100% privacy.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>



                {/* SEO & Conversion Content */}
                <div className="mt-24 max-w-4xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                                Why Compress Images?
                            </h2>
                            <div className="space-y-4 text-gray-500 dark:text-gray-400 leading-relaxed">
                                <p>
                                    Large images slow down your website, hurt your SEO rankings, and frustrate users. Compressing them is the easiest way to speed up your site.
                                </p>
                                <ul className="space-y-3 mt-4">
                                    <li className="flex items-start">
                                        <CheckCircle2 className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
                                        <span><strong>Faster Loading:</strong> Smaller files load instantly, keeping visitors engaged.</span>
                                    </li>
                                    <li className="flex items-start">
                                        <CheckCircle2 className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
                                        <span><strong>Better SEO:</strong> Google ranks fast websites higher in search results.</span>
                                    </li>
                                    <li className="flex items-start">
                                        <CheckCircle2 className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
                                        <span><strong>Save Bandwidth:</strong> Reduce hosting costs by serving optimized images.</span>
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
                                        <HelpCircle className="w-4 h-4 mr-2 text-gray-400" /> Is my data safe?
                                    </h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Yes! All compression happens locally in your browser. Your images are never uploaded to our servers.
                                    </p>
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center">
                                        <HelpCircle className="w-4 h-4 mr-2 text-gray-400" /> Will I lose quality?
                                    </h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Our smart compression algorithm reduces file size significantly while maintaining visual quality. You can adjust the quality slider to find the perfect balance.
                                    </p>
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center">
                                        <HelpCircle className="w-4 h-4 mr-2 text-gray-400" /> What formats are supported?
                                    </h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        We support JPG, PNG, and WebP formats.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* CTA Card */}
                    <div className="bg-black dark:bg-white rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
                        <div className="relative z-10">
                            <h2 className="text-3xl font-black text-white dark:text-black mb-4">
                                Building a website?
                            </h2>
                            <p className="text-lg text-gray-400 dark:text-gray-600 mb-8 max-w-2xl mx-auto">
                                Once your site is fast and optimized, consider listing it on Websites Arena. We connect builders with buyers looking for high-quality digital assets.
                            </p>
                            <Link
                                href="/sell"
                                className="inline-flex items-center px-8 py-4 bg-white text-black dark:bg-black dark:text-white rounded-full font-bold text-lg hover:scale-105 transition-transform"
                            >
                                List Your Website <ArrowRight className="ml-2 w-5 h-5" />
                            </Link>
                        </div>

                        {/* Decorative Background */}
                        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                            <div className="absolute top-[-50%] left-[-20%] w-[500px] h-[500px] rounded-full bg-blue-600 blur-[100px]"></div>
                            <div className="absolute bottom-[-50%] right-[-20%] w-[500px] h-[500px] rounded-full bg-cyan-600 blur-[100px]"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
