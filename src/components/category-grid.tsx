
'use client';

import * as React from 'react';
import Link from 'next/link';
import { getPluginCategories } from '@/components/plugin-list';
import { AppWindow, Download, ToyBrick, Smartphone, LucideIcon, Code, Monitor, Wind } from 'lucide-react';

const categoryVisuals: { [key: string]: { icon: LucideIcon } } = {
  Wordpress: { icon: Code },
  Plugins: { icon: ToyBrick },
  Downloads: { icon: Download },
  Windows: { icon: Monitor },
  Linux: { icon: Wind },
  macOS: { icon: AppWindow },
  Android: { icon: Smartphone },
  iPhone: { icon: Smartphone },
};


export function CategoryGrid() {
  const categories = getPluginCategories();

  return (
    <section className="py-12 md:py-24">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-3xl md:text-4xl font-bold font-headline">Product Archive</h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Explore our plugins by category.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {categories.map((category) => {
            const visual = categoryVisuals[category.name] || { icon: Code };
            const Icon = visual.icon;
            
            return (
                <Link key={category.name} href={`/?category=${encodeURIComponent(category.name)}`} passHref>
                    <div className="bg-card rounded-lg p-6 h-64 flex flex-col justify-between items-start cursor-pointer">
                        <div>
                            <Icon className="h-12 w-12 text-foreground/80" />
                        </div>
                         <div>
                            <h3 className="text-2xl font-bold font-headline text-foreground">
                                {category.name}
                            </h3>
                            <p className="text-muted-foreground mt-1">{category.description}</p>
                        </div>
                    </div>
                </Link>
            )
        })}
      </div>
    </section>
  );
}
