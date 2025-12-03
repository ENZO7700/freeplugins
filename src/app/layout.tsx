import { Poppins, PT_Sans } from 'next/font/google';
import './globals.css';
import React from 'react';
import { ClientProviders } from '@/components/client-providers';


const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-poppins',
});

const ptSans = PT_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-pt-sans',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sk" suppressHydrationWarning>
      <head>
        <title>FreePlugins</title>
        <meta name="description" content="The ultimate marketplace for software plugins and tools." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className={`${poppins.variable} ${ptSans.variable} font-body antialiased`}>
        <ClientProviders>
            {children}
        </ClientProviders>
      </body>
    </html>
  );
}
