import { ThemeToggle } from './theme-toggle';
import { Cart } from './cart';
import Link from 'next/link';
import { Button } from './ui/button';

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" passHref>
          <h1 className="text-xl font-bold font-headline text-primary cursor-pointer">
            freeplugins.org
          </h1>
        </Link>
        <div className="flex items-center gap-4">
          <nav className="hidden md:flex gap-2">
            <Button variant="ghost" asChild>
              <Link href="/">Marketplace</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/blog">Blog</Link>
            </Button>
          </nav>
          <ThemeToggle />
          <Cart />
        </div>
      </div>
    </header>
  );
}
