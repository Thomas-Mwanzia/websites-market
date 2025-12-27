import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: "class",
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
            },
            fontFamily: {
                'sans': ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
                'serif': ['Georgia', 'Garamond', 'serif'],
                'display': ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
                'mono': ['Menlo', 'Monaco', 'Courier New', 'monospace'],
            },
            typography: {
                DEFAULT: {
                    css: {
                        maxWidth: 'none',
                        color: '#374151',
                        h1: {
                            color: '#111827',
                            fontSize: '3.75rem',
                            fontWeight: '700',
                            lineHeight: '1.1',
                            letterSpacing: '-0.02em',
                            marginBottom: '2rem',
                            fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                        },
                        h2: {
                            color: '#111827',
                            fontSize: '2.25rem',
                            fontWeight: '600',
                            lineHeight: '1.33',
                            letterSpacing: '-0.01em',
                            marginTop: '3rem',
                            marginBottom: '1rem',
                            fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                        },
                        h3: {
                            color: '#111827',
                            fontSize: '1.875rem',
                            fontWeight: '600',
                            lineHeight: '1.4',
                            marginTop: '2rem',
                            marginBottom: '0.75rem',
                            fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                        },
                        h4: {
                            color: '#111827',
                            fontSize: '1.5rem',
                            fontWeight: '600',
                            marginTop: '1.5rem',
                            marginBottom: '0.5rem',
                            fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                        },
                        p: {
                            fontSize: '1.125rem',
                            lineHeight: '1.75',
                            marginBottom: '1.5rem',
                            color: '#374151',
                            fontFamily: 'Georgia, Garamond, serif',
                        },
                        strong: {
                            color: '#111827',
                            fontWeight: '700',
                        },
                        em: {
                            color: '#1f2937',
                            fontStyle: 'italic',
                        },
                        a: {
                            color: '#2563eb',
                            textDecoration: 'none',
                            '&:hover': {
                                textDecoration: 'underline',
                            },
                        },
                        blockquote: {
                            borderLeftWidth: '4px',
                            borderLeftColor: '#2563eb',
                            paddingLeft: '1.5rem',
                            paddingTop: '1rem',
                            paddingBottom: '1rem',
                            fontStyle: 'italic',
                            fontSize: '1.25rem',
                            color: '#1f2937',
                            backgroundColor: '#eff6ff',
                            borderRadius: '0.5rem',
                            marginBottom: '2rem',
                            fontFamily: 'Georgia, Garamond, serif',
                        },
                        code: {
                            backgroundColor: '#1f2937',
                            color: '#f3f4f6',
                            paddingLeft: '0.5rem',
                            paddingRight: '0.5rem',
                            paddingTop: '0.25rem',
                            paddingBottom: '0.25rem',
                            borderRadius: '0.375rem',
                            fontSize: '0.9em',
                            fontFamily: 'Menlo, Monaco, Courier New, monospace',
                        },
                        pre: {
                            backgroundColor: '#111827',
                            color: '#f3f4f6',
                            paddingLeft: '1.5rem',
                            paddingRight: '1.5rem',
                            paddingTop: '1rem',
                            paddingBottom: '1rem',
                            borderRadius: '0.75rem',
                            overflowX: 'auto',
                            fontSize: '0.875rem',
                            lineHeight: '1.5',
                            borderWidth: '1px',
                            borderColor: '#374151',
                            marginBottom: '2rem',
                        },
                        'pre code': {
                            backgroundColor: 'transparent',
                            color: 'inherit',
                            padding: '0',
                            borderRadius: '0',
                            fontSize: 'inherit',
                        },
                        ul: {
                            listStyleType: 'disc',
                            paddingLeft: '1.5rem',
                            marginBottom: '1.5rem',
                        },
                        ol: {
                            listStyleType: 'decimal',
                            paddingLeft: '1.5rem',
                            marginBottom: '1.5rem',
                        },
                        li: {
                            marginBottom: '0.75rem',
                            color: '#374151',
                            fontSize: '1.125rem',
                            lineHeight: '1.75',
                        },
                        hr: {
                            borderColor: '#e5e7eb',
                            marginTop: '3rem',
                            marginBottom: '3rem',
                        },
                        img: {
                            borderRadius: '1rem',
                            marginTop: '2rem',
                            marginBottom: '2rem',
                            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
                        },
                        table: {
                            marginBottom: '2rem',
                            borderCollapse: 'collapse',
                            width: '100%',
                        },
                        thead: {
                            backgroundColor: '#f9fafb',
                            borderBottomWidth: '2px',
                            borderBottomColor: '#e5e7eb',
                        },
                        'thead th': {
                            paddingLeft: '1rem',
                            paddingRight: '1rem',
                            paddingTop: '0.75rem',
                            paddingBottom: '0.75rem',
                            textAlign: 'left',
                            fontWeight: '600',
                            color: '#111827',
                        },
                        'tbody td': {
                            paddingLeft: '1rem',
                            paddingRight: '1rem',
                            paddingTop: '0.75rem',
                            paddingBottom: '0.75rem',
                            borderBottomWidth: '1px',
                            borderBottomColor: '#e5e7eb',
                        },
                        'tbody tr:last-child td': {
                            borderBottomWidth: '0',
                        },
                    },
                },
                dark: {
                    css: {
                        color: '#d1d5db',
                        h1: {
                            color: '#ffffff',
                        },
                        h2: {
                            color: '#ffffff',
                        },
                        h3: {
                            color: '#ffffff',
                        },
                        h4: {
                            color: '#ffffff',
                        },
                        p: {
                            color: '#d1d5db',
                        },
                        strong: {
                            color: '#ffffff',
                        },
                        em: {
                            color: '#e5e7eb',
                        },
                        a: {
                            color: '#60a5fa',
                            '&:hover': {
                                color: '#93c5fd',
                            },
                        },
                        blockquote: {
                            borderLeftColor: '#60a5fa',
                            color: '#e5e7eb',
                            backgroundColor: '#1e3a8a',
                        },
                        code: {
                            backgroundColor: '#374151',
                            color: '#f3f4f6',
                        },
                        pre: {
                            backgroundColor: '#1f2937',
                            color: '#f3f4f6',
                            borderColor: '#4b5563',
                        },
                        li: {
                            color: '#d1d5db',
                        },
                        hr: {
                            borderColor: '#374151',
                        },
                        thead: {
                            backgroundColor: '#374151',
                            borderBottomColor: '#4b5563',
                        },
                        'thead th': {
                            color: '#f3f4f6',
                        },
                        'tbody td': {
                            borderBottomColor: '#4b5563',
                        },
                    },
                },
            },
        },
    },
    plugins: [require('@tailwindcss/typography')],
};
export default config;
