
'use client';

import * as React from 'react';
import { HeroSection } from '@/components/hero-section';
import { PageTransitionWrapper } from '@/components/page-transition-wrapper';
import { CategoryGrid } from '@/components/category-grid';
import { PluginList } from '@/components/plugin-list';
import { useSearchParams } from 'next/navigation';
import { AiAssistant } from '@/components/ai-assistant';
import { FeaturedPlugins } from '@/components/featured-plugins';
import { PluginIdeaGenerator } from '@/components/plugin-idea-generator';

export default function Home() {
  const searchParams = useSearchParams();
  const category = searchParams.get('category');
  const [showPlugins, setShowPlugins] = React.useState(false);
  const [key, setKey] = React.useState(Date.now());

  // When category changes, decide whether to show plugins
  React.useEffect(() => {
    // Show PluginList if a category is present in the URL
    setShowPlugins(!!category);
    setKey(Date.now()); // Force re-render of PluginList when category changes
  }, [category]);
  
  return (
    <PageTransitionWrapper>
      <>
        {!category && (
          <>
            <HeroSection />
            <div className="container mx-auto px-4 py-8">
              <AiAssistant />
              <FeaturedPlugins />
              <PluginIdeaGenerator />
              <CategoryGrid />
            </div>
          </>
        )}
        {category && (
          <div className="container mx-auto px-4 py-8">
            <PluginList key={key} />
          </div>
        )}
      </>
    </PageTransitionWrapper>
  );
}
