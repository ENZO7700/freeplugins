'use client';

import { getPluginData, Plugin } from '@/components/plugin-list';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '@/context/cart-context';
import { useToast } from '@/hooks/use-toast';
import { PageTransitionWrapper } from '@/components/page-transition-wrapper';

export default function PluginDetailPage({ params }: { params: { slug: string } }) {
  const plugin = getPluginData(params.slug);
  const { addToCart } = useCart();
  const { toast } = useToast();

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
            <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground">
              <p>{plugin.longDescription}</p>
            </div>
          </div>
        </div>
      </main>
    </PageTransitionWrapper>
  );
}
