
'use client';

import * as React from 'react';
import Link from 'next/link';
import { getPluginCategories, Category } from '@/components/plugin-list';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { AppWindow, Download, ToyBrick, Smartphone, LucideIcon, Code, Monitor, Wind } from 'lucide-react';

const categoryVisuals: { [key: string]: { icon: LucideIcon, gradient: string } } = {
  Wordpress: { icon: Code, gradient: 'from-blue-400 to-cyan-300' },
  Plugins: { icon: ToyBrick, gradient: 'from-green-400 to-teal-300' },
  Downloads: { icon: Download, gradient: 'from-purple-400 to-pink-400' },
  Windows: { icon: Monitor, gradient: 'from-sky-400 to-blue-500' },
  Linux: { icon: Wind, gradient: 'from-yellow-400 to-orange-300' },
  macOS: { icon: AppWindow, gradient: 'from-gray-400 to-slate-300' },
  Android: { icon: Smartphone, gradient: 'from-lime-400 to-green-500' },
  iPhone: { icon: Smartphone, gradient: 'from-red-500 to-rose-400' },
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
            const visual = categoryVisuals[category.name] || { icon: Code, gradient: 'from-gray-400 to-slate-300' };
            const Icon = visual.icon;
            
            return (
                <Link key={category.name} href={`/?category=${encodeURIComponent(category.name)}`} passHref>
                    <div className={cn(
                        "relative p-0.5 rounded-xl bg-gradient-to-br transition-all duration-300 group overflow-hidden",
                        visual.gradient,
                        "hover:shadow-xl hover:shadow-primary/20"
                    )}>
                        <div className="bg-card rounded-lg p-6 h-64 flex flex-col justify-between items-start cursor-pointer">
                            <motion.div
                                className="z-10"
                                whileHover={{ scale: 1.2, rotate: -15 }}
                                transition={{ type: 'spring', stiffness: 300 }}
                            >
                                <Icon className="h-12 w-12 text-foreground/80" />
                            </motion.div>
                             <div className="relative z-10">
                                <h3 className="text-2xl font-bold font-headline text-foreground">
                                    {category.name}
                                </h3>
                                <p className="text-muted-foreground mt-1">{category.description}</p>
                            </div>
                        </div>
                    </div>
                </Link>
            )
        })}
      </div>
    </section>
  );
}
