'use client';

import * as React from 'react';
import { getPluginData, Plugin } from '@/components/plugin-list';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Sparkles, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '@/context/cart-context';
import { useToast } from '@/hooks/use-toast';
import { PageTransitionWrapper } from '@/components/page-transition-wrapper';
import { generatePluginMarketingCopy } from '@/ai/flows/generate-plugin-marketing-copy';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function PluginDetailPage({ params }: { params: { slug: string } }) {
  const plugin = getPluginData(params.slug);
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [marketingCopy, setMarketingCopy] = React.useState('');

  if (!plugin) {
    notFound();
  }

  const handleAddToCart = () => {
    addToCart(plugin as Plugin);
    toast({
      title: "Added to cart",
      description: `${plugin.name} has been added to your cart.`,
    })
  };

  const handleGenerateCopy = async () => {
    if (!plugin) return;
    setIsGenerating(true);
    setMarketingCopy('');
    try {
      const result = await generatePluginMarketingCopy({
        name: plugin.name,
        description: plugin.description,
        category: plugin.category,
      });
      setMarketingCopy(result.copy);
    } catch (error) {
      console.error('Failed to generate marketing copy:', error);
      toast({
        variant: 'destructive',
        title: 'An error occurred',
        description: 'Failed to generate marketing copy. Please try again.',
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <PageTransitionWrapper>
      <main className="container mx-auto px-4 py-8 flex-grow">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Link href="/" passHref>
               <Button variant="outline">
                  <ArrowLeft className="mr-2" />
                  Back to Marketplace
               </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            <div className="relative h-80 w-full rounded-lg overflow-hidden shadow-lg">
              <Image
                src={plugin.imageUrl}
                alt={plugin.name}
                fill
                style={{objectFit: "cover"}}
                data-ai-hint={plugin.dataAiHint}
              />
            </div>
            <div className="flex flex-col justify-center">
              <Badge variant="secondary" className="w-fit mb-2">{plugin.category}</Badge>
              <h1 className="text-4xl font-bold font-headline mb-4">{plugin.name}</h1>
              <p className="text-2xl font-semibold mb-6">{plugin.price}</p>
              <p className="text-lg text-muted-foreground mb-6">{plugin.description}</p>
              <Button size="lg" onClick={handleAddToCart}>Add to Cart</Button>
            </div>
          </div>

          <div className="mt-16">
            <h2 className="text-3xl font-bold font-headline mb-4">Product Details</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground mb-8">
              <p>{plugin.longDescription}</p>
            </div>
          </div>

          <Card className="mt-12 bg-secondary/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="text-primary" />
                <span>AI-Powered Marketing Assistant</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">Generate engaging marketing copy for this plugin with a single click.</p>
              <Button onClick={handleGenerateCopy} disabled={isGenerating}>
                {isGenerating ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Sparkles className="mr-2 h-4 w-4" />
                )}
                Generate Marketing Copy
              </Button>

              {isGenerating && (
                 <div className="mt-4 text-muted-foreground">Generating...</div>
              )}

              {marketingCopy && (
                <div className="mt-6 p-4 border rounded-lg bg-background">
                    <p className="whitespace-pre-wrap font-mono text-sm">{marketingCopy}</p>
                </div>
              )}
            </CardContent>
          </Card>

        </div>
      </main>
    </PageTransitionWrapper>
  );
}
