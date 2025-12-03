'use client';

import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from "@/components/ui/toaster";
import { CartProvider } from '@/context/cart-context';
import { AuthProvider } from '@/context/auth-context';
import { DashboardProvider } from '@/context/dashboard-context';
import React from 'react';
import { Sidebar, SidebarProvider } from '@/components/ui/sidebar';
import { MainNav } from '@/components/main-nav';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export function ClientProviders({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <CartProvider>
              <DashboardProvider>
                  <SidebarProvider>
                    <div className="flex min-h-screen flex-row">
                      <Sidebar>
                        <MainNav />
                      </Sidebar>
                      <div className="flex flex-1 flex-col">
                        <Header />
                        <main className="flex-grow">
                          {children}
                        </main>
                        <Footer />
                      </div>
                    </div>
                  </SidebarProvider>
                  <Toaster />
              </DashboardProvider>
            </CartProvider>
          </AuthProvider>
        </ThemeProvider>
    )
}
