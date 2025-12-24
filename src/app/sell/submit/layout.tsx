import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Submit Your Project | Websites Arena',
    description: 'List your SaaS, website, or digital asset for sale on Websites Arena. Reach thousands of potential buyers instantly.',
}

export default function SubmitLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
