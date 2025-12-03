import React, { Suspense } from 'react';
import HomePageContent from './home-page-content';
import { Loader2 } from 'lucide-react';
import { PageTransitionWrapper } from '@/components/page-transition-wrapper';

const HomePageLoading = () => {
    return (
        <PageTransitionWrapper>
            <div className="flex justify-center items-center h-[80vh]">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
            </div>
        </PageTransitionWrapper>
    )
}

export default function Home() {
  return (
    <Suspense fallback={<HomePageLoading />}>
      <HomePageContent />
    </Suspense>
  );
}
