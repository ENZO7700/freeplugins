
'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useCart } from '@/context/cart-context';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { Star, StarHalf } from 'lucide-react';
import { Balancer } from 'react-wrap-balancer';
import { ShoppingBag } from 'lucide-react';
import { plugins, Plugin } from '@/lib/plugins';

export const StarRating = React.memo(function StarRating({ rating, className }: { rating: number; className?: string }) {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className={`flex items-center ${className}`}>
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
      ))}
      {halfStar && <StarHalf className="w-5 h-5 fill-yellow-400 text-yellow-400" />}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`empty-${i}`} className="w-5 h-5 text-gray-300" />
      ))}
    </div>
  );
});

export function PluginList({ category }: { category: string | null }) {
  const [searchQuery, setSearchQuery] = React.useState('');
  const { addToCart } = useCart();
  const { toast } = useToast();
  
  const filteredPlugins = React.useMemo(() => plugins.filter(plugin => {
    const matchesCategory = !category || plugin.category === category;
    const matchesSearch = plugin.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  }), [category, searchQuery]);

  const handleAddToCart = (plugin: Plugin) => {
    addToCart(plugin);
    toast({
      title: "Pridané do košíka",
      description: `${plugin.name} bol pridaný do vášho košíka.`,
    })
  };

  return (
    <section className="py-12 md:py-24" id="plugin-list">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-3xl md:text-4xl font-bold font-headline">
          <Balancer>
            {category ? `${category} pluginy` : 'Všetky pluginy'}
          </Balancer>
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          <Balancer>
            Objavte nástroje, ktoré vylepšia váš pracovný postup a posunú vaše projekty na novú úroveň.
          </Balancer>
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8 max-w-lg mx-auto">
        <Input 
          placeholder="Hľadať v kategórii..."
          className="flex-grow"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          aria-label="Vyhľadať pluginy"
        />
      </div>

      {filteredPlugins.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredPlugins.map((plugin) => (
            <motion.div
              key={plugin.slug}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
              layout
            >
              <Card className="flex flex-col overflow-hidden h-full shadow-md hover:shadow-xl transition-shadow">
                <Link href={`/plugins/${plugin.slug}`} passHref>
                  <div className="relative h-48 w-full cursor-pointer">
                    {plugin.imageUrl && (
                      <Image
                        src={plugin.imageUrl}
                        alt={plugin.name}
                        fill
                        style={{objectFit: "cover"}}
                        data-ai-hint={plugin.dataAiHint}
                        className="transition-transform duration-300"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                      />
                    )}
                  </div>
                </Link>
                <CardContent className="p-6 flex-grow">
                  <Badge variant="secondary" className="mb-2">{plugin.category}</Badge>
                  <Link href={`/plugins/${plugin.slug}`} passHref>
                    <h3 className="text-xl font-bold font-headline mb-2 cursor-pointer hover:underline">{plugin.name}</h3>
                  </Link>
                  <div className="flex items-center gap-2 mb-2">
                    <StarRating rating={plugin.rating} />
                    <span className="text-sm text-muted-foreground">(pozri recenzie)</span>
                  </div>
                  <p className="text-muted-foreground text-sm">{plugin.description}</p>
                </CardContent>
                <CardFooter className="p-6 pt-0 flex justify-between items-center">
                  <p className="text-lg font-semibold">{plugin.price}</p>
                  <Button onClick={() => handleAddToCart(plugin)}>Pridať do košíka</Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 flex flex-col items-center gap-4">
            <ShoppingBag className="w-16 h-16 text-muted-foreground/50" />
            <h3 className="text-2xl font-bold font-headline">Nenašli sa žiadne pluginy</h3>
            <p className="text-muted-foreground mt-2">Skúste upraviť vyhľadávanie alebo filtre.</p>
            <Button asChild variant="outline">
              <Link href="/">Zobraziť všetky pluginy</Link>
            </Button>
        </div>
      )}
    </section>
  );
}
