'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { FileText, Shield, FileCheck, DollarSign, Download, Printer, Copy, Check, ChevronRight, PenLine, ArrowLeft } from 'lucide-react'
import { cn } from '@/lib/utils'
import toast from 'react-hot-toast'

type ToolType = 'contract' | 'nda' | 'invoice' | 'policy'

const TOOLS = [
    { id: 'contract', label: 'Asset Sale Agreement', icon: FileText, desc: 'Transfer ownership of domains or projects.' },
    { id: 'nda', label: 'Non-Disclosure Agreement', icon: Shield, desc: 'Protect your confidential information.' },
    { id: 'invoice', label: 'Professional Invoice', icon: DollarSign, desc: 'Bill clients for services or products.' },
    { id: 'policy', label: 'Privacy Policy', icon: FileCheck, desc: 'Standard policy for SaaS applications.' },
]

export default function SuiteClient() {
    const [activeTool, setActiveTool] = useState<ToolType>('contract')
    const [formData, setFormData] = useState<any>({
        // Common
        date: new Date().toISOString().split('T')[0],
        sellerName: '',
        buyerName: '',
        // Contract
        assetName: '',
        price: '',
        transferDate: '',
        // Invoice
        invoiceNumber: 'INV-001',
        items: [{ desc: 'Web Development Services', qty: 1, rate: 1000 }],
        // Policy
        appName: '',
        email: '',
        websiteUrl: '',
    })

    const previewRef = useRef<HTMLDivElement>(null)

    const handlePrint = () => {
        window.print()
    }

    const handleSavePdf = () => {
        toast('Select "Save as PDF" in the print dialog destination.', {
            icon: '📄',
            duration: 4000
        })
        window.print()
    }

    const copyToClipboard = () => {
        if (previewRef.current) {
            navigator.clipboard.writeText(previewRef.current.innerText)
            toast.success('Copied to clipboard!')
        }
    }

    const renderForm = () => {
        switch (activeTool) {
            case 'contract':
                return (
                    <div className="space-y-4">
                        <Input label="Date" type="date" value={formData.date} onChange={v => setFormData({ ...formData, date: v })} />
                        <Input label="Seller Name (You)" value={formData.sellerName} onChange={v => setFormData({ ...formData, sellerName: v })} />
                        <Input label="Buyer Name" value={formData.buyerName} onChange={v => setFormData({ ...formData, buyerName: v })} />
                        <Input label="Asset Name (Domain/Project)" value={formData.assetName} onChange={v => setFormData({ ...formData, assetName: v })} />
                        <Input label="Sale Price ($)" type="number" value={formData.price} onChange={v => setFormData({ ...formData, price: v })} />
                        <Input label="Transfer Date" type="date" value={formData.transferDate} onChange={v => setFormData({ ...formData, transferDate: v })} />
                    </div>
                )
            case 'nda':
                return (
                    <div className="space-y-4">
                        <Input label="Date" type="date" value={formData.date} onChange={v => setFormData({ ...formData, date: v })} />
                        <Input label="Disclosing Party (You)" value={formData.sellerName} onChange={v => setFormData({ ...formData, sellerName: v })} />
                        <Input label="Receiving Party" value={formData.buyerName} onChange={v => setFormData({ ...formData, buyerName: v })} />
                    </div>
                )
            case 'invoice':
                return (
                    <div className="space-y-4">
                        <Input label="Invoice Date" type="date" value={formData.date} onChange={v => setFormData({ ...formData, date: v })} />
                        <Input label="Invoice #" value={formData.invoiceNumber} onChange={v => setFormData({ ...formData, invoiceNumber: v })} />
                        <Input label="Your Name/Business" value={formData.sellerName} onChange={v => setFormData({ ...formData, sellerName: v })} />
                        <Input label="Client Name" value={formData.buyerName} onChange={v => setFormData({ ...formData, buyerName: v })} />
                        <div className="border-t pt-4">
                            <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Line Items</label>
                            {formData.items.map((item: any, idx: number) => (
                                <div key={idx} className="grid grid-cols-12 gap-2 mb-2">
                                    <div className="col-span-6">
                                        <input className="w-full p-2 border rounded" placeholder="Description" value={item.desc} onChange={e => {
                                            const newItems = [...formData.items]
                                            newItems[idx].desc = e.target.value
                                            setFormData({ ...formData, items: newItems })
                                        }} />
                                    </div>
                                    <div className="col-span-2">
                                        <input className="w-full p-2 border rounded" type="number" placeholder="Qty" value={item.qty} onChange={e => {
                                            const newItems = [...formData.items]
                                            newItems[idx].qty = Number(e.target.value)
                                            setFormData({ ...formData, items: newItems })
                                        }} />
                                    </div>
                                    <div className="col-span-3">
                                        <input className="w-full p-2 border rounded" type="number" placeholder="Rate" value={item.rate} onChange={e => {
                                            const newItems = [...formData.items]
                                            newItems[idx].rate = Number(e.target.value)
                                            setFormData({ ...formData, items: newItems })
                                        }} />
                                    </div>
                                    <div className="col-span-1 flex items-center justify-center">
                                        <button onClick={() => {
                                            const newItems = formData.items.filter((_: any, i: number) => i !== idx)
                                            setFormData({ ...formData, items: newItems })
                                        }} className="text-red-500 hover:text-red-700">×</button>
                                    </div>
                                </div>
                            ))}
                            <button onClick={() => setFormData({ ...formData, items: [...formData.items, { desc: '', qty: 1, rate: 0 }] })} className="text-sm text-blue-600 font-bold hover:underline">+ Add Item</button>
                        </div>
                    </div>
                )
            case 'policy':
                return (
                    <div className="space-y-4">
                        <Input label="Effective Date" type="date" value={formData.date} onChange={v => setFormData({ ...formData, date: v })} />
                        <Input label="App/Company Name" value={formData.appName} onChange={v => setFormData({ ...formData, appName: v })} />
                        <Input label="Website URL" value={formData.websiteUrl} onChange={v => setFormData({ ...formData, websiteUrl: v })} />
                        <Input label="Contact Email" type="email" value={formData.email} onChange={v => setFormData({ ...formData, email: v })} />
                    </div>
                )
        }
    }

    const renderPreview = () => {
        const commonStyles = "font-serif text-gray-900 leading-relaxed max-w-[210mm] mx-auto bg-white p-[20mm] shadow-2xl min-h-[297mm] outline-none"

        // We add a key to the returned div to ensure React remounts it when the tool changes.
        // This prevents "Failed to execute 'removeChild' on 'Node'" errors caused by contentEditable.

        switch (activeTool) {
            case 'contract':
                return (
                    <div key="contract" className={commonStyles} contentEditable suppressContentEditableWarning>
                        <h1 className="text-2xl font-bold text-center mb-8 uppercase tracking-widest">Asset Sale Agreement</h1>
                        <p className="mb-6">This Asset Sale Agreement (the "Agreement") is entered into as of <strong>{formData.date}</strong> by and between:</p>

                        <div className="mb-6 pl-4 border-l-4 border-gray-200">
                            <p><strong>Seller:</strong> {formData.sellerName || '[Seller Name]'}</p>
                            <p><strong>Buyer:</strong> {formData.buyerName || '[Buyer Name]'}</p>
                        </div>

                        <p className="mb-4"><strong>1. Sale of Assets.</strong> Seller agrees to sell, and Buyer agrees to purchase, all rights, title, and interest in and to the following asset(s) (the "Asset"):</p>
                        <p className="mb-6 pl-4 italic">{formData.assetName || '[Domain Name / Project Name]'}</p>

                        <p className="mb-4"><strong>2. Purchase Price.</strong> The total purchase price for the Asset shall be <strong>${formData.price || '0.00'}</strong> USD.</p>

                        <p className="mb-4"><strong>3. Transfer.</strong> Seller shall transfer all control, credentials, and files related to the Asset to Buyer on or before <strong>{formData.transferDate || '[Date]'}</strong>.</p>

                        <p className="mb-4"><strong>4. Representations.</strong> Seller represents that they are the sole owner of the Asset and have the full right and authority to sell it.</p>

                        <p className="mb-8"><strong>5. Governing Law.</strong> This Agreement shall be governed by the laws of [Jurisdiction].</p>

                        <div className="grid grid-cols-2 gap-12 mt-12 pt-12">
                            <div className="border-t border-black pt-2">
                                <p className="font-bold">Seller Signature</p>
                                <p className="text-sm text-gray-500 mt-1">{formData.sellerName}</p>
                            </div>
                            <div className="border-t border-black pt-2">
                                <p className="font-bold">Buyer Signature</p>
                                <p className="text-sm text-gray-500 mt-1">{formData.buyerName}</p>
                            </div>
                        </div>
                    </div>
                )
            case 'nda':
                return (
                    <div key="nda" className={commonStyles} contentEditable suppressContentEditableWarning>
                        <h1 className="text-2xl font-bold text-center mb-8 uppercase tracking-widest">Non-Disclosure Agreement</h1>
                        <p className="mb-6">This Non-Disclosure Agreement (the "Agreement") is entered into as of <strong>{formData.date}</strong> by and between:</p>

                        <div className="mb-6 pl-4 border-l-4 border-gray-200">
                            <p><strong>Disclosing Party:</strong> {formData.sellerName || '[Disclosing Party]'}</p>
                            <p><strong>Receiving Party:</strong> {formData.buyerName || '[Receiving Party]'}</p>
                        </div>

                        <p className="mb-4"><strong>1. Confidential Information.</strong> The Disclosing Party may share certain proprietary and confidential information ("Confidential Information") with the Receiving Party for the purpose of evaluating a potential business relationship.</p>

                        <p className="mb-4"><strong>2. Obligations.</strong> The Receiving Party agrees to hold all Confidential Information in strict confidence and not to disclose it to any third party without the prior written consent of the Disclosing Party.</p>

                        <p className="mb-4"><strong>3. Exclusions.</strong> Confidential Information shall not include information that is or becomes publicly known through no act or omission of the Receiving Party.</p>

                        <p className="mb-8"><strong>4. Term.</strong> This Agreement shall remain in effect for a period of 2 years from the date hereof.</p>

                        <div className="grid grid-cols-2 gap-12 mt-12 pt-12">
                            <div className="border-t border-black pt-2">
                                <p className="font-bold">Disclosing Party</p>
                                <p className="text-sm text-gray-500 mt-1">{formData.sellerName}</p>
                            </div>
                            <div className="border-t border-black pt-2">
                                <p className="font-bold">Receiving Party</p>
                                <p className="text-sm text-gray-500 mt-1">{formData.buyerName}</p>
                            </div>
                        </div>
                    </div>
                )
            case 'invoice':
                const total = formData.items.reduce((acc: number, item: any) => acc + (item.qty * item.rate), 0)
                return (
                    <div key="invoice" className={commonStyles} contentEditable suppressContentEditableWarning>
                        <div className="flex justify-between items-start mb-12">
                            <div>
                                <h1 className="text-4xl font-bold text-gray-900 mb-2">INVOICE</h1>
                                <p className="text-gray-500">#{formData.invoiceNumber}</p>
                            </div>
                            <div className="text-right">
                                <h2 className="font-bold text-xl">{formData.sellerName || '[Your Business]'}</h2>
                                <p className="text-gray-500">{formData.date}</p>
                            </div>
                        </div>

                        <div className="mb-12">
                            <p className="text-gray-500 uppercase text-xs font-bold mb-2">Bill To:</p>
                            <h3 className="text-xl font-bold">{formData.buyerName || '[Client Name]'}</h3>
                        </div>

                        <table className="w-full mb-12">
                            <thead>
                                <tr className="border-b-2 border-black">
                                    <th className="text-left py-2">Description</th>
                                    <th className="text-right py-2">Qty</th>
                                    <th className="text-right py-2">Rate</th>
                                    <th className="text-right py-2">Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {formData.items.map((item: any, idx: number) => (
                                    <tr key={idx} className="border-b border-gray-200">
                                        <td className="py-4">{item.desc || 'Item Description'}</td>
                                        <td className="text-right py-4">{item.qty}</td>
                                        <td className="text-right py-4">${item.rate}</td>
                                        <td className="text-right py-4 font-bold">${item.qty * item.rate}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <div className="flex justify-end">
                            <div className="w-1/2">
                                <div className="flex justify-between py-2 border-b border-gray-200">
                                    <span className="font-bold">Total</span>
                                    <span className="font-bold text-xl">${total.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-24 text-center text-gray-500 text-sm">
                            <p>Thank you for your business!</p>
                        </div>
                    </div>
                )
            case 'policy':
                return (
                    <div key="policy" className={commonStyles} contentEditable suppressContentEditableWarning>
                        <h1 className="text-2xl font-bold text-center mb-8 uppercase tracking-widest">Privacy Policy</h1>
                        <p className="text-center text-gray-500 mb-8">Effective Date: {formData.date}</p>

                        <p className="mb-4"><strong>1. Introduction.</strong> Welcome to {formData.appName || '[App Name]'}. We respect your privacy and are committed to protecting your personal data.</p>

                        <p className="mb-4"><strong>2. Data We Collect.</strong> We may collect personal identification information (Name, Email address, etc.) when you visit our website {formData.websiteUrl && `(${formData.websiteUrl})`} or use our services.</p>

                        <p className="mb-4"><strong>3. How We Use Your Data.</strong> We collect your data to provide and improve our services, process payments, and communicate with you.</p>

                        <p className="mb-4"><strong>4. Data Security.</strong> We implement appropriate security measures to protect your personal information.</p>

                        <p className="mb-8"><strong>5. Contact Us.</strong> If you have any questions about this Privacy Policy, please contact us at: <strong>{formData.email || '[Email Address]'}</strong>.</p>
                    </div>
                )
            default:
                return <div className={commonStyles}>Select a tool to generate a document.</div>
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black pt-24 pb-12 print:bg-white print:pt-0 print:pb-0">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 print:max-w-none print:px-0">
                <Link href="/tools" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900 dark:hover:text-white mb-8 transition-colors print:hidden">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Armory
                </Link>

                <div className="mb-12 text-center print:hidden">
                    <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-4">Seller Business Suite</h1>
                    <p className="text-xl text-gray-500">Free professional tools to run your digital business.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 print:block">
                    {/* Sidebar */}
                    <div className="lg:col-span-2 grid grid-cols-2 lg:grid-cols-1 gap-3 h-fit print:hidden">
                        {TOOLS.map((tool) => {
                            const Icon = tool.icon
                            return (
                                <button
                                    key={tool.id}
                                    onClick={() => setActiveTool(tool.id as ToolType)}
                                    className={cn(
                                        "w-full p-3 rounded-xl border transition-all flex flex-col items-center justify-center text-center hover:scale-[1.02]",
                                        activeTool === tool.id
                                            ? "bg-white dark:bg-gray-900 border-blue-600 shadow-md ring-1 ring-blue-600"
                                            : "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 hover:border-blue-400"
                                    )}
                                >
                                    <div className={cn("p-2 rounded-lg mb-2", activeTool === tool.id ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-500")}>
                                        <Icon className="w-5 h-5" />
                                    </div>
                                    <div className="font-bold text-gray-900 dark:text-white text-xs leading-tight">{tool.label}</div>
                                </button>
                            )
                        })}
                    </div>

                    {/* Editor Area */}
                    <div className="lg:col-span-4 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 h-fit sticky top-24 print:hidden">
                        <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">Details</h2>
                        {renderForm()}

                        <div className="mt-8 pt-8 border-t border-gray-100 dark:border-gray-800 space-y-3">
                            <div className="grid grid-cols-2 gap-3">
                                <button onClick={handlePrint} className="flex items-center justify-center px-4 py-3 bg-black text-white dark:bg-white dark:text-black rounded-xl font-bold hover:opacity-90 transition-opacity">
                                    <Printer className="w-4 h-4 mr-2" /> Print
                                </button>
                                <button onClick={handleSavePdf} className="flex items-center justify-center px-4 py-3 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl font-bold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                                    <Download className="w-4 h-4 mr-2" /> Save PDF
                                </button>
                            </div>
                            <button onClick={copyToClipboard} className="w-full flex items-center justify-center px-4 py-3 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl font-bold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                                <Copy className="w-4 h-4 mr-2" /> Copy Text
                            </button>
                        </div>
                    </div>

                    {/* Preview Area */}
                    <div className="lg:col-span-6 bg-gray-200 dark:bg-gray-800 rounded-2xl p-8 overflow-auto max-h-[calc(100vh-100px)] print:col-span-12 print:shadow-none print:p-0 print:m-0 print:bg-white print:w-full print:absolute print:top-0 print:left-0 print:max-h-none print:overflow-visible">
                        <div className="flex items-center justify-between mb-4 px-2 print:hidden">
                            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Live Preview (Editable)</span>
                            <PenLine className="w-4 h-4 text-gray-400" />
                        </div>
                        <div ref={previewRef} className="origin-top scale-90 sm:scale-100 transition-transform print:scale-100 print:transform-none">
                            {renderPreview()}
                        </div>
                        <div className="mt-8 text-center print:hidden">
                            <p className="text-sm text-gray-500 mb-2">Ready to sell your asset?</p>
                            <a href="/sell/submit" className="inline-flex items-center text-blue-600 font-bold hover:underline">
                                List on Websites Arena <ChevronRight className="w-4 h-4 ml-1" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function Input({ label, type = "text", value, onChange }: { label: string, type?: string, value: any, onChange: (v: any) => void }) {
    return (
        <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">{label}</label>
            <input
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none transition-all text-sm"
            />
        </div>
    )
}
