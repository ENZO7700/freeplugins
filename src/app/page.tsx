
'use client';

import * as React from 'react';
import { HeroSection } from '@/components/hero-section';
import { PageTransitionWrapper } from '@/components/page-transition-wrapper';
import { CategoryGrid } from '@/components/category-grid';
import { PluginList } from '@/components/plugin-list';
import { FeaturedPlugins } from '@/components/featured-plugins';
import { PluginIdeaGenerator } from '@/components/plugin-idea-generator';
import { useSearchParams } from 'next/navigation';

export default function Home() {
  const searchParams = useSearchParams();
  const category = searchParams.get('category');

  return (
    <PageTransitionWrapper>
      {!category && <HeroSection />}
      <div className="container mx-auto px-4 py-8">
        {!category && (
          <>
            <FeaturedPlugins />
            <PluginIdeaGenerator />
            <CategoryGrid />
          </>
        )}
        {category && <PluginList />}
      </div>
    </PageTransitionWrapper>
  );
}
