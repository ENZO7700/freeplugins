'use client';

import { ThemeToggle } from './theme-toggle';
import { Cart } from './cart';
import Link from 'next/link';
import { Button } from './ui/button';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import * as React from 'react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"

export function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const navLinks = [
    { href: '/', label: 'Marketplace' },
    { href: '/blog', label: 'Blog' },
  ];

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-sm"
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" passHref>
          <div className="text-xl font-bold font-headline text-primary cursor-pointer hover:animate-glow">
            Expresívny Navigátor
          </div>
        </Link>
        
        <nav className="hidden md:flex items-center gap-2">
          {navLinks.map((link) => (
            <Button 
              key={link.href}
              variant={pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href)) ? 'secondary' : 'ghost'} 
              asChild
            >
              <Link href={link.href}>{link.label}</Link>
            </Button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Cart />
          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="flex flex-col gap-4 py-6">
                   <Link href="/" passHref>
                    <div className="mb-4 text-lg font-bold font-headline text-primary cursor-pointer">
                      Expresívny Navigátor
                    </div>
                  </Link>
                  <nav className="flex flex-col gap-2">
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={cn(
                          "text-lg p-2 rounded-md",
                          pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href)) 
                            ? 'bg-secondary text-secondary-foreground' 
                            : 'text-muted-foreground hover:bg-muted'
                        )}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
