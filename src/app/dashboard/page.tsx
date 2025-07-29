'use client';

import { useAuth } from '@/context/auth-context';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTransitionWrapper } from '@/components/page-transition-wrapper';

export default function DashboardPage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <PageTransitionWrapper>
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Welcome to your Dashboard</CardTitle>
              <CardDescription>
                This is your personal space. More features coming soon!
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Hello, <strong>{user.email}</strong>!
              </p>
              <p>
                Your user ID is: <code className="bg-muted p-1 rounded-sm">{user.uid}</code>
              </p>
              <Button onClick={logout} variant="destructive">
                Log Out
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </PageTransitionWrapper>
  );
}
