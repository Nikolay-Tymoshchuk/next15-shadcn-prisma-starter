import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';

import { CONFIG } from '@/config/config';
import t from '@/dictionary/en.json';
import '@/styles/globals.css';

const poppins = Poppins({
    weight: ['300', '400', '500', '600', '700'],
    variable: '--font-poppins',
    subsets: ['latin-ext']
});

export const metadata: Metadata = {
    openGraph: {
        title: t.pages.homePage.seo.title,
        type: 'website',
        images: [
            {
                url: '/android-chrome-512x512.png',
                width: 512,
                height: 512,
                alt: t.pages.homePage.seo.title
            }
        ],
        url: CONFIG.NEXTAUTH_URL,
        locale: 'en',
        description: t.pages.homePage.seo.description
    },
    title: { default: t.pages.homePage.seo.title, template: '%s | Nextjs 15' },
    description: t.pages.homePage.seo.description,
    metadataBase: new URL(CONFIG.NEXTAUTH_URL),
    icons: [
        {
            url: '/favicon/apple-touch-icon.png',
            sizes: '180x180',
            type: 'image/png',
            rel: 'apple-touch-icon'
        },
        {
            url: '/favicon/favicon-96x96.png',
            sizes: '96x96',
            type: 'image/png',
            rel: 'icon'
        },
        {
            url: '/favicon/web-app-manifest-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            rel: 'maskable'
        },
        {
            url: '/favicon/web-app-manifest-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            rel: 'maskable'
        }
    ]
};

export const viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: 'no',
    themeColor: '#2079f6'
};

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en'>
            <body className={`${poppins.variable} antialiased`}>{children}</body>
        </html>
    );
}
