'use client';

import { LoginForm } from '@/components/auth/login-form';
import { PageTransitionWrapper } from '@/components/page-transition-wrapper';

export default function LoginPage() {
  return (
    <PageTransitionWrapper>
      <main className="container mx-auto flex h-full items-center justify-center px-4 py-8">
        <LoginForm />
      </main>
    </PageTransitionWrapper>
  );
}
