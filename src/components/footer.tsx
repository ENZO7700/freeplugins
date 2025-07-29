'use client';

import Link from 'next/link';
import { Button } from './ui/button';
import { Github, Twitter, Linkedin } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div>
            <h3 className="text-lg font-bold font-headline text-primary mb-4">FreePlugins</h3>
            <p className="text-muted-foreground">The Ultimate Software Marketplace for creators and developers.</p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <nav className="flex flex-col gap-2">
              <Link href="/" passHref><Button variant="link" className="text-muted-foreground justify-center md:justify-start p-0">Marketplace</Button></Link>
              <Link href="/blog" passHref><Button variant="link" className="text-muted-foreground justify-center md:justify-start p-0">Blog</Button></Link>
            </nav>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Connect With Us</h3>
            <div className="flex justify-center md:justify-start gap-4">
              <Button variant="ghost" size="icon" asChild>
                <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                  <Twitter />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href="#" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <Github />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href="#" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <Linkedin />
                </a>
              </Button>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-muted-foreground text-sm">
          <p>&copy; {currentYear} FreePlugins. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
