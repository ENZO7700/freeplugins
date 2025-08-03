
'use client';

import Link from 'next/link';
import { Button } from './ui/button';
import { Github, Twitter, Linkedin } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-8">
        <div className="mt-8 pt-8 border-t text-center text-muted-foreground text-sm">
          <p>&copy; {currentYear} SOFTW4R3. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}

