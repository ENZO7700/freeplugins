'use client';

import { LoginForm } from '@/components/auth/login-form';
import { PageTransitionWrapper } from '@/components/page-transition-wrapper';
import { Suspense } from 'react';

function LoginPageContent() {
  return (
    <PageTransitionWrapper>
      <main className="container mx-auto flex h-full items-center justify-center px-4 py-8">
        <LoginForm />
      </main>
    </PageTransitionWrapper>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginPageContent />
    </Suspense>
  )
}
