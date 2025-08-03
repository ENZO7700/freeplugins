
'use client';

import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-background/80 backdrop-blur-sm mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-muted-foreground text-sm">
          <p>&copy; {currentYear} SOFTW4R3. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
