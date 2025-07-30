
'use client';

import * as React from 'react';
import Link from 'next/link';
import { getPluginCategories, Category } from '@/components/plugin-list';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { GridPattern } from '@/components/ui/grid-pattern';
import { BarChart, ShoppingCart, Share2, LineChart, Shield, Wrench, LucideIcon } from 'lucide-react';

// Let's define some specific images and hints for our categories
const categoryVisuals: { [key: string]: { icon: LucideIcon, colors: string } } = {
  SEO: { icon: BarChart, colors: 'from-green-500 to-cyan-500' },
  'E-commerce': { icon: ShoppingCart, colors: 'from-blue-500 to-indigo-500' },
  'Social Media': { icon: Share2, colors: 'from-purple-500 to-pink-500' },
  Analytics: { icon: LineChart, colors: 'from-yellow-500 to-orange-500' },
  Security: { icon: Shield, colors: 'from-red-500 to-rose-500' },
  Utilities: { icon: Wrench, colors: 'from-gray-500 to-slate-500' },
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((category) => {
            const visual = categoryVisuals[category.name] || { icon: Wrench, colors: 'from-gray-500 to-slate-500' };
            const Icon = visual.icon;
            
            return (
                <Link key={category.name} href={`/?category=${encodeURIComponent(category.name)}`} passHref>
                    <div className="relative group rounded-xl">
                        <div
                            className={cn(
                                "absolute -inset-0.5 rounded-xl blur-lg opacity-50 group-hover:opacity-100 transition duration-300 animate-border-spin",
                                visual.colors
                            )}
                            style={{
                                background: `linear-gradient(120deg, var(--tw-gradient-from), var(--tw-gradient-to))`,
                                backgroundSize: '400% 400%'
                            }}
                        />
                        <div className="relative bg-card rounded-xl p-6 h-64 flex flex-col justify-between items-start overflow-hidden cursor-pointer shadow-lg">
                            <GridPattern className="absolute inset-0 w-full h-full" />
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
