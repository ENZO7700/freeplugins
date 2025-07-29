'use client';

import { useAuth } from '@/context/auth-context';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTransitionWrapper } from '@/components/page-transition-wrapper';
import { Loader2, Sparkles } from 'lucide-react';
import { adaptAnimationsToUserBehavior, AdaptAnimationsToUserBehaviorOutput } from '@/ai/flows/adapt-animations-to-user-behavior';
import { useToast } from '@/hooks/use-toast';

export default function DashboardPage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const [isAdapting, setIsAdapting] = React.useState(false);
  const [adaptationResult, setAdaptationResult] = React.useState<AdaptAnimationsToUserBehaviorOutput | null>(null);

  React.useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);
  
  const handleAdaptUi = async () => {
    setIsAdapting(true);
    setAdaptationResult(null);
    try {
      // In a real app, you'd collect real user actions.
      const simulatedUserActions = "User clicked on 3 plugins, scrolled through the marketplace, spent 5 minutes on the blog, uses a high-end desktop.";
      
      const result = await adaptAnimationsToUserBehavior({
        userActions: simulatedUserActions,
        deviceType: 'desktop',
        networkSpeed: 'fast',
      });
      setAdaptationResult(result);
      toast({
        title: 'Personalization Complete',
        description: 'AI has analyzed your behavior and suggested UI adaptations.',
      });
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Adaptation Failed',
        description: 'Could not get UI adaptation suggestions from AI.',
      });
    } finally {
      setIsAdapting(false);
    }
  };


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
        <div className="max-w-4xl mx-auto space-y-8">
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

          <Card>
            <CardHeader>
              <div className='flex items-center gap-2'>
                <Sparkles className="text-primary" />
                <CardTitle>AI-Powered Personalization</CardTitle>
              </div>
              <CardDescription>
                Let our AI adapt the interface to your personal usage style for a better experience.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={handleAdaptUi} disabled={isAdapting}>
                {isAdapting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Personalize My Experience
              </Button>

              {isAdapting && (
                 <div className="mt-6 text-center">
                    <p className="text-muted-foreground">Our AI is analyzing your interaction patterns...</p>
                 </div>
              )}

              {adaptationResult && (
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Animation Settings</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm space-y-2">
                       <p><strong>Speed:</strong> <span className="capitalize bg-secondary text-secondary-foreground px-2 py-1 rounded-md">{adaptationResult.animationSettings.animationSpeed}</span></p>
                       <p><strong>Transitions:</strong> <span className="capitalize bg-secondary text-secondary-foreground px-2 py-1 rounded-md">{adaptationResult.animationSettings.transitionEffect}</span></p>
                       <p><strong>Element Visibility:</strong> <span className="capitalize bg-secondary text-secondary-foreground px-2 py-1 rounded-md">{adaptationResult.animationSettings.elementVisibility}</span></p>
                    </CardContent>
                  </Card>
                   <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">UI Element Adjustments</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm space-y-2">
                       <p><strong>Font Size:</strong> <span className="capitalize bg-secondary text-secondary-foreground px-2 py-1 rounded-md">{adaptationResult.uiElementAdjustments.fontSize}</span></p>
                       <p><strong>Spacing:</strong> <span className="capitalize bg-secondary text-secondary-foreground px-2 py-1 rounded-md">{adaptationResult.uiElementAdjustments.elementSpacing}</span></p>
                       <p><strong>Color Scheme:</strong> <span className="capitalize bg-secondary text-secondary-foreground px-2 py-1 rounded-md">{adaptationResult.uiElementAdjustments.colorScheme}</span></p>
                    </CardContent>
                  </Card>
                </div>
              )}
            </CardContent>
          </Card>

        </div>
      </main>
    </PageTransitionWrapper>
  );
}
