
'use client';

import * as React from 'react';
import { HeroSection } from '@/components/hero-section';
import { PageTransitionWrapper } from '@/components/page-transition-wrapper';
import { CategoryGrid } from '@/components/category-grid';
import { PluginList } from '@/components/plugin-list';
import { useSearchParams } from 'next/navigation';

export default function Home() {
  const searchParams = useSearchParams();
  const category = searchParams.get('category');
  const [showPlugins, setShowPlugins] = React.useState(false);

  // When category changes, decide whether to show plugins
  React.useEffect(() => {
    // Show PluginList if a category is present in the URL
    setShowPlugins(!!category);
  }, [category]);
  
  return (
    <PageTransitionWrapper>
      <>
        <HeroSection />
        <div className="container mx-auto px-4 py-8">
          {showPlugins ? <PluginList /> : <CategoryGrid />}
        </div>
      </>
    </PageTransitionWrapper>
  );
}
