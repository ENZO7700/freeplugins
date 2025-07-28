'use client';

import { ThemeToggle } from './theme-toggle';
import { Cart } from './cart';
import Link from 'next/link';
import { Button } from './ui/button';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export function Header() {
  const pathname = usePathname();

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-sm"
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" passHref>
          <div className="text-xl font-bold font-headline text-primary cursor-pointer">
            Expresívny Navigátor
          </div>
        </Link>
        <div className="flex items-center gap-4">
          <nav className="hidden md:flex gap-2">
            <Button variant={pathname === '/' ? 'secondary' : 'ghost'} asChild>
              <Link href="/">Marketplace</Link>
            </Button>
            <Button variant={pathname.startsWith('/blog') ? 'secondary' : 'ghost'} asChild>
              <Link href="/blog">Blog</Link>
            </Button>
          </nav>
          <ThemeToggle />
          <Cart />
        </div>
      </div>
    </motion.header>
  );
}
