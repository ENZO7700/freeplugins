
'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/context/cart-context';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { plugins, Plugin, StarRating } from './plugin-list';

export function FeaturedPlugins() {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const featuredPlugins = [...plugins]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4);

  const handleAddToCart = (plugin: Plugin) => {
    addToCart(plugin);
    toast({
      title: 'Pridané do košíka',
      description: `${plugin.name} bol pridaný do vášho košíka.`,
    });
  };

  return (
    <section className="py-12 md:py-24">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-3xl md:text-4xl font-bold font-headline">
          Najlepšie hodnotené pluginy
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Objavte nástroje, ktoré miluje naša komunita.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {featuredPlugins.map((plugin) => (
          <motion.div
            key={plugin.slug}
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Card className="flex flex-col overflow-hidden h-full shadow-md hover:shadow-xl transition-shadow">
              <Link href={`/plugins/${plugin.slug}`} passHref>
                <div className="relative h-48 w-full cursor-pointer">
                  {plugin.imageUrl && (
                    <Image
                      src={plugin.imageUrl}
                      alt={plugin.name}
                      fill
                      style={{ objectFit: 'cover' }}
                      data-ai-hint={plugin.dataAiHint}
                      className="transition-transform duration-300"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  )}
                </div>
              </Link>
              <CardContent className="p-6 flex-grow">
                <Badge variant="secondary" className="mb-2">
                  {plugin.category}
                </Badge>
                <Link href={`/plugins/${plugin.slug}`} passHref>
                  <h3 className="text-xl font-bold font-headline mb-2 cursor-pointer hover:underline">
                    {plugin.name}
                  </h3>
                </Link>
                <div className="flex items-center gap-2 mb-2">
                  <StarRating rating={plugin.rating} />
                   <span className="text-sm text-muted-foreground">(pozri recenzie)</span>
                </div>
                <p className="text-muted-foreground text-sm">
                  {plugin.description}
                </p>
              </CardContent>
              <CardFooter className="p-6 pt-0 flex justify-between items-center">
                <p className="text-lg font-semibold">{plugin.price}</p>
                <Button onClick={() => handleAddToCart(plugin)}>
                  Pridať do košíka
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

    