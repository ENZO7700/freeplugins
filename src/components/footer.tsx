
'use client';

import Link from 'next/link';
import { getPluginCategories } from './plugin-list';
import { Twitter, Github, Linkedin } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const categories = getPluginCategories().slice(0, 4); // Zobrazíme prvé 4 kategórie

  return (
    <footer className="border-t bg-background/80 backdrop-blur-sm mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-muted-foreground">
          
          {/* O Nás */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-bold font-headline text-primary mb-4">SOFTW4R3</h3>
            <p className="text-sm max-w-md">
              Vaše centrum pre objavovanie, nákup a predaj najlepších softvérových pluginov a nástrojov. Podporujeme inovácie a pomáhame tvorcom uspieť.
            </p>
          </div>

          {/* Navigácia */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Navigácia</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-primary transition-colors">Trhovisko</Link></li>
              <li><Link href="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
              <li><Link href="/about" className="hover:text-primary transition-colors">O nás</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Kontakt</Link></li>
            </ul>
          </div>

          {/* Kategórie */}
          <div>
             <h3 className="text-lg font-semibold text-foreground mb-4">Kategórie</h3>
              <ul className="space-y-2 text-sm">
                {categories.map(category => (
                   <li key={category.name}><Link href={`/?category=${encodeURIComponent(category.name)}`} className="hover:text-primary transition-colors">{category.name}</Link></li>
                ))}
              </ul>
          </div>

        </div>
        <div className="flex flex-col sm:flex-row justify-between items-center text-sm mt-8 pt-8 border-t">
          <p>&copy; {currentYear} SOFTW4R3. Všetky práva vyhradené.</p>
          <div className="flex space-x-4 mt-4 sm:mt-0">
            <Link href="#" aria-label="Twitter" className="hover:text-primary transition-colors"><Twitter /></Link>
            <Link href="#" aria-label="GitHub" className="hover:text-primary transition-colors"><Github /></Link>
            <Link href="#" aria-label="LinkedIn" className="hover:text-primary transition-colors"><Linkedin /></Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
