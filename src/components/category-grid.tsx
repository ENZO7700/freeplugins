
'use client';

import * as React from 'react';
import Link from 'next/link';
import { getPluginCategories } from '@/components/plugin-list';
import { AppWindow, Download, ToyBrick, Smartphone, LucideIcon, Code, Monitor, Wind } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Balancer } from 'react-wrap-balancer';


const categoryVisuals: { [key: string]: { icon: LucideIcon, color: string, shadow: string } } = {
  Wordpress: { icon: Code, color: 'hover:border-blue-400', shadow: 'hover:shadow-glow-blue' },
  Plugins: { icon: ToyBrick, color: 'hover:border-purple-400', shadow: 'hover:shadow-glow-purple' },
  Downloads: { icon: Download, color: 'hover:border-green-400', shadow: 'hover:shadow-glow-green' },
  Windows: { icon: Monitor, color: 'hover:border-sky-400', shadow: 'hover:shadow-glow-sky' },
  Linux: { icon: Wind, color: 'hover:border-orange-400', shadow: 'hover:shadow-glow-orange' },
  macOS: { icon: AppWindow, color: 'hover:border-gray-400', shadow: 'hover:shadow-glow-gray' },
  Android: { icon: Smartphone, color: 'hover:border-emerald-400', shadow: 'hover:shadow-glow-emerald' },
  iPhone: { icon: Smartphone, color: 'hover:border-indigo-400', shadow: 'hover:shadow-glow-indigo' },
};

export function CategoryGrid() {
  const categories = getPluginCategories();

  return (
    <section className="py-12 md:py-24">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-3xl md:text-4xl font-bold font-headline">
          <Balancer>Archív produktov</Balancer>
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          <Balancer>
            Preskúmajte naše pluginy podľa kategórie a nájdite presne to, čo potrebujete pre svoj ďalší projekt.
          </Balancer>
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {categories.map((category) => {
            const visual = categoryVisuals[category.name] || { icon: Code, color: 'hover:border-primary', shadow: 'hover:shadow-glow-primary' };
            const Icon = visual.icon;
            
            return (
                <Link key={category.name} href={`/?category=${encodeURIComponent(category.name)}`} passHref>
                    <motion.div 
                        className={cn("bg-card border-2 border-transparent rounded-lg p-6 h-64 flex flex-col justify-between items-start cursor-pointer transition-all duration-300", visual.color, visual.shadow)}
                        whileHover={{ y: -5 }}
                    >
                        <div>
                            <motion.div whileHover={{ scale: 1.1, rotate: 5 }}>
                                <Icon className="h-12 w-12 text-foreground/80" />
                            </motion.div>
                        </div>
                         <div>
                            <h3 className="text-2xl font-bold font-headline text-foreground">
                                {category.name}
                            </h3>
                            <p className="text-muted-foreground mt-1">{category.description}</p>
                        </div>
                    </motion.div>
                </Link>
            )
        })}
      </div>
    </section>
  );
}
