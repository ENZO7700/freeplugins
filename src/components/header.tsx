import { ThemeToggle } from './theme-toggle';
import { Cart } from './cart';

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <h1 className="text-xl font-bold font-headline text-primary">
          freeplugins.org
        </h1>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Cart />
        </div>
      </div>
    </header>
  );
}
