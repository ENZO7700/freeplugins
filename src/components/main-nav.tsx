import React, { Suspense } from 'react';
import { MainNavClient } from './main-nav-client';
import { SidebarContent, SidebarHeader, SidebarFooter, SidebarTrigger } from './ui/sidebar';
import { cn } from '@/lib/utils';
import { Skeleton } from './ui/skeleton';

const NavSkeleton = () => (
  <div className="flex flex-col gap-1 p-2">
    <Skeleton className="h-9 w-full" />
    <div className="ml-4 mt-1 space-y-1 border-l pl-4">
        <Skeleton className="h-7 w-full" />
        <Skeleton className="h-7 w-full" />
        <Skeleton className="h-7 w-full" />
    </div>
     <Skeleton className="h-9 w-full mt-1" />
     <Skeleton className="h-9 w-full" />
     <Skeleton className="h-9 w-full" />
  </div>
);


export function MainNav() {
  return (
    <>
      <Suspense fallback={
        <>
            <SidebarHeader>
                <div className={cn("text-2xl font-bold font-headline text-primary cursor-pointer hover:animate-text-glow p-2 transition-opacity duration-300")}>
                    FreePlugins
                </div>
                <SidebarTrigger />
            </SidebarHeader>
            <SidebarContent>
                <NavSkeleton/>
            </SidebarContent>
            <SidebarFooter>
                <p className={cn("text-xs text-muted-foreground p-2 text-center transition-opacity duration-300")}>
                    &copy; {new Date().getFullYear()} FreePlugins
                </p>
            </SidebarFooter>
        </>
      }>
        <MainNavClient />
      </Suspense>
    </>
  );
}