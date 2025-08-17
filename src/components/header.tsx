
'use client';

import { ThemeToggle } from './theme-toggle';
import { Cart } from './cart';
import { Button } from './ui/button';
import { useAuth } from '@/context/auth-context';
import { Loader2, User, LogOut } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import Link from 'next/link';
import { SidebarTrigger } from './ui/sidebar';
import { MainNav } from './main-nav';

export function Header() {
  const { user, loading, logout } = useAuth();
  
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
        <Button variant="ghost" asChild>
          <Link href="/login">Prihlásiť sa</Link>
        </Button>
    );
  }

  return (
    <header 
      className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-sm"
    >
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        <div className='flex items-center gap-2'>
           <SidebarTrigger className="md:hidden" />
           <Link href="/" passHref>
              <div className="hidden sm:block text-xl font-bold font-headline text-primary cursor-pointer hover:animate-text-glow">
                FreePlugins
              </div>
            </Link>
        </div>
        
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Cart />
          {renderAuthSection()}
        </div>
      </div>
    </header>
  );
}
