'use client';

import * as React from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { adaptAnimationsToUserBehavior, type AdaptAnimationsToUserBehaviorInput, type AdaptAnimationsToUserBehaviorOutput } from '@/ai/flows/adapt-animations-to-user-behavior';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Wand2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const adaptationSchema = z.object({
  userActions: z.string().min(10, 'Please describe user actions in more detail.'),
  deviceType: z.enum(['desktop', 'tablet', 'mobile']),
  networkSpeed: z.enum(['fast', 'medium', 'slow']),
});

type AdaptationFormValues = z.infer<typeof adaptationSchema>;

interface AdaptiveUiControllerProps {
  onAdapt: (result: AdaptAnimationsToUserBehaviorOutput) => void;
}

export function AdaptiveUiController({ onAdapt }: AdaptiveUiControllerProps) {
  const [isPending, startTransition] = React.useTransition();
  const { toast } = useToast();

  const form = useForm<AdaptationFormValues>({
    resolver: zodResolver(adaptationSchema),
    defaultValues: {
      userActions: 'User scrolls quickly, frequently uses keyboard shortcuts, and prefers detailed views.',
      deviceType: 'desktop',
      networkSpeed: 'fast',
    },
  });

  const onSubmit: SubmitHandler<AdaptationFormValues> = (data) => {
    startTransition(async () => {
      try {
        const result = await adaptAnimationsToUserBehavior(data as AdaptAnimationsToUserBehaviorInput);
        onAdapt(result);
      } catch (error) {
        console.error('AI adaptation failed:', error);
        toast({
          variant: 'destructive',
          title: 'AI Error',
          description: error instanceof Error ? error.message : 'Could not adapt UI. Please try again.',
        });
      }
    });
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Card className="w-96 shadow-2xl bg-background/80 backdrop-blur-sm">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Wand2 className="text-primary" />
                <CardTitle className="font-headline">Adaptive UI Controller</CardTitle>
              </div>
              <CardDescription>Simulate user behavior to see the UI adapt in real-time.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="userActions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>User Actions</FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g., Scrolls fast, clicks often..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="deviceType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Device</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select device" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="desktop">Desktop</SelectItem>
                          <SelectItem value="tablet">Tablet</SelectItem>
                          <SelectItem value="mobile">Mobile</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="networkSpeed"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Network</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select speed" />
                          </Trigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="fast">Fast</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="slow">Slow</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? 'Adapting...' : 'Adapt UI with AI'}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
