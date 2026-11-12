import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });

export const metadata: Metadata = {
  title: 'cURL to Fetch, Axios & TanStack Query Converter',
  description:
    'Convert cURL commands to JavaScript Fetch API, Axios, and React Query hooks instantly. 100% client-side and privacy-safe.',
  keywords: [
    'curl to fetch',
    'curl to axios',
    'curl to javascript',
    'curl to typescript',
    'curl to react query',
    'curl converter',
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <body className="bg-slate-950 text-slate-100 antialiased font-sans" suppressHydrationWarning>{children}</body>
    </html>
  );
}