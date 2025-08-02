
'use client';

import { ThemeToggle } from './theme-toggle';
import { Cart } from './cart';
import Link from 'next/link';
import { Button } from './ui/button';
import { usePathname, useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Menu, User, LogOut, Loader2, ChevronDown } from 'lucide-react';
import * as React from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetDescription
} from "@/components/ui/sheet"
import { useAuth } from '@/context/auth-context';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { getPluginCategories } from './plugin-list';


export function Header() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const { user, loading, logout } = useAuth();

  const categories = getPluginCategories();

  const navLinks = [
    { href: '/blog', label: 'Blog' },
    { href: '/about', label: 'O nás' },
    { href: '/contact', label: 'Kontakt' },
  ];
  
  const getInitials = (email?: string | null) => {
    if (!email) return 'U';
    return email.substring(0, 2).toUpperCase();
  }

  const renderAuthSection = () => {
    if (loading) {
      return <Loader2 className="h-6 w-6 animate-spin" />;
    }
    if (user) {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user.photoURL || undefined} alt={user.email || ''} />
                <AvatarFallback>{getInitials(user.email)}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">Môj účet</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/dashboard"><User className="mr-2 h-4 w-4" />Panel</Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={logout}>
              <LogOut className="mr-2 h-4 w-4" />
              Odhlásiť sa
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }
    return (
      <div className='hidden md:flex'>
        <Button variant="ghost" asChild>
          <Link href="/login">Prihlásiť sa</Link>
        </Button>
        <Button asChild>
          <Link href="/signup">Zaregistrovať sa</Link>
        </Button>
      </div>
    );
  }

  const isMarketplaceActive = pathname === '/' || pathname.startsWith('/plugins');

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
            Freeplugins.org
          </div>
        </Link>
        
        <nav className="hidden md:flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant={isMarketplaceActive ? 'secondary' : 'ghost'}>
                  Trhovisko
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem asChild>
                  <Link href="/">Všetky pluginy</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {categories.map((category) => (
                  <DropdownMenuItem key={category.name} asChild>
                    <Link href={`/?category=${encodeURIComponent(category.name)}`}>{category.name}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

          {navLinks.map((link) => (
            <Button 
              key={link.href}
              variant={pathname === link.href ? 'secondary' : 'ghost'} 
              asChild
            >
              <Link href={link.href}>{link.label}</Link>
            </Button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Cart />
          {renderAuthSection()}

          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu />
                  <span className="sr-only">Otvoriť menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle className="sr-only">Menu</SheetTitle>
                  <SheetDescription className="sr-only">Hlavné navigačné menu</SheetDescription>
                </SheetHeader>
                <div className="flex flex-col gap-4 py-6">
                   <Link href="/" passHref>
                    <div className="mb-4 text-lg font-bold font-headline text-primary cursor-pointer" onClick={() => setIsMobileMenuOpen(false)}>
                      Freeplugins.org
                    </div>
                  </Link>
                  <nav className="flex flex-col gap-2">
                    <p className="px-2 text-sm font-semibold text-muted-foreground">Trhovisko</p>
                    <Link
                      href="/"
                      className={cn(
                        "text-lg p-2 rounded-md ml-2",
                        isMarketplaceActive && !searchParams.get('category') ? 'bg-secondary text-secondary-foreground' : 'text-muted-foreground hover:bg-muted'
                      )}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Všetky pluginy
                    </Link>
                    {categories.map((category) => (
                       <Link
                        key={category.name}
                        href={`/?category=${encodeURIComponent(category.name)}`}
                        className={cn(
                          "text-lg p-2 rounded-md ml-2",
                          searchParams.get('category') === category.name ? 'bg-secondary text-secondary-foreground' : 'text-muted-foreground hover:bg-muted'
                        )}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {category.name}
                      </Link>
                    ))}
                    <DropdownMenuSeparator className="my-2"/>
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={cn(
                          "text-lg p-2 rounded-md",
                          pathname === link.href
                            ? 'bg-secondary text-secondary-foreground' 
                            : 'text-muted-foreground hover:bg-muted'
                        )}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </nav>
                  <div className='pt-4 border-t'>
                    {loading ? (
                      <Loader2 className="h-6 w-6 animate-spin" />
                    ) : !user ? (
                       <div className="flex flex-col gap-2">
                          <Link href="/login" className="text-lg p-2 rounded-md text-muted-foreground hover:bg-muted" onClick={() => setIsMobileMenuOpen(false)}>Prihlásiť sa</Link>
                          <Link href="/signup" className="text-lg p-2 rounded-md text-muted-foreground hover:bg-muted" onClick={() => setIsMobileMenuOpen(false)}>Zaregistrovať sa</Link>
                       </div>
                    ) : null }
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
