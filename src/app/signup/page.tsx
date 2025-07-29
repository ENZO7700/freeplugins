'use client';

import { SignupForm } from '@/components/auth/signup-form';
import { PageTransitionWrapper } from '@/components/page-transition-wrapper';

export default function SignupPage() {
  return (
    <PageTransitionWrapper>
      <main className="container mx-auto flex h-full items-center justify-center px-4 py-8">
        <SignupForm />
      </main>
    </PageTransitionWrapper>
  );
}
