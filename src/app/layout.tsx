
'use client';

import { Poppins, PT_Sans } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from "@/components/ui/toaster"
import { CartProvider } from '@/context/cart-context';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { AuthProvider } from '@/context/auth-context';
import { DashboardProvider } from '@/context/dashboard-context';
import { AdaptiveUiProvider, useAdaptiveUi } from '@/context/adaptive-ui-context';
import React from 'react';

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

const AdaptiveStyles = () => {
  const { fontSize, elementSpacing } = useAdaptiveUi();
  
  const css = `
    :root {
      --adaptive-font-size: ${fontSize};
      --adaptive-spacing-unit: ${parseFloat(elementSpacing)}px;
    }
  `;

  return <style>{css}</style>
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Freeplugins.org</title>
        <meta name="description" content="The ultimate marketplace for software plugins and tools." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className={`text-base-adaptive ${poppins.variable} ${ptSans.variable} font-body antialiased flex flex-col min-h-screen`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <CartProvider>
              <DashboardProvider>
                 <AdaptiveUiProvider>
                  <AdaptiveStyles />
                  <Header />
                  <main className="flex-grow">
                    {children}
                  </main>
                  <Footer />
                  <Toaster />
                </AdaptiveUiProvider>
              </DashboardProvider>
            </CartProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
