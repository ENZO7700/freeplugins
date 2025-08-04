
'use client';

import * as React from 'react';
import { HeroSection } from '@/components/hero-section';
import { PageTransitionWrapper } from '@/components/page-transition-wrapper';
import { CategoryGrid } from '@/components/category-grid';
import { PluginList } from '@/components/plugin-list';
import { FeaturedPlugins } from '@/components/featured-plugins';
import { PluginIdeaGenerator } from '@/components/plugin-idea-generator';

export default function Home() {
  return (
    <PageTransitionWrapper>
        <HeroSection />
        <div className="container mx-auto px-4 py-8">
          <FeaturedPlugins />
          <PluginIdeaGenerator />
          <CategoryGrid />
          <PluginList />
        </div>
    </PageTransitionWrapper>
  );
}
