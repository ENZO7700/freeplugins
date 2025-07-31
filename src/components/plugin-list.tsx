
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
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Star, StarHalf } from 'lucide-react';

export interface Review {
  author: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Plugin {
  slug: string;
  name: string;
  category: string;
  description: string;
  longDescription: string;
  price: string;
  imageUrl: string;
  dataAiHint: string;
  rating: number;
  reviews: Review[];
}

export interface Category {
  name: string;
  description: string;
}

const categories: Category[] = [
    { name: 'Wordpress', description: 'Pluginy a nástroje pre WordPress.' },
    { name: 'Plugins', description: 'Rozšírte funkcionalitu vašich aplikácií.' },
    { name: 'Downloads', description: 'Stiahnite si užitočné nástroje.' },
    { name: 'Windows', description: 'Aplikácie a utility pre Windows.' },
    { name: 'Linux', description: 'Softvér pre distribúcie Linuxu.' },
    { name: 'macOS', description: 'Nástroje a aplikácie pre macOS.' },
    { name: 'Android', description: 'Aplikácie pre vaše Android zariadenia.' },
    { name: 'iPhone', description: 'Aplikácie pre váš iPhone.' },
];

export const plugins: Plugin[] = [
  {
    slug: 'seo-optimizer-pro',
    name: 'SEO Optimizer Pro',
    category: 'Plugins',
    description: 'Zvýšte svoje pozície vo vyhľadávačoch s naším pokročilým SEO nástrojom.',
    longDescription: 'Náš SEO Optimizer Pro ponúka kompletnú sadu nástrojov vrátane výskumu kľúčových slov, analýzy spätných odkazov, on-page optimalizácie a sledovania výkonu. Ideálne pre firmy všetkých veľkostí, ktoré chcú zlepšiť svoju online viditeľnosť.',
    price: '$49',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'chart graph',
    rating: 4.5,
    reviews: [
      { author: 'Alice', rating: 5, comment: 'Absolútne zmenilo návštevnosť mojej stránky!', date: '2024-07-20' },
      { author: 'Bob', rating: 4, comment: 'Skvelý nástroj, trochu strmá krivka učenia.', date: '2024-07-18' },
    ],
  },
  {
    slug: 'ecommerceify',
    name: 'E-commerceify',
    category: 'Plugins',
    description: 'Premeňte svoju webovú stránku na výkonný online obchod v priebehu niekoľkých minút.',
    longDescription: 'E-commerceify poskytuje všetko, čo potrebujete na začatie online predaja. Medzi funkcie patrí správa produktov, bezpečné platobné brány, sledovanie zásob a správa zákazníkov. Plne prispôsobiteľné, aby zodpovedalo vašej značke.',
    price: '$99',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'shopping cart',
    rating: 5,
    reviews: [
       { author: 'Charlie', rating: 5, comment: 'Super jednoduché na nastavenie a funguje bezchybne.', date: '2024-07-22' },
    ],
  },
  {
    slug: 'socialconnect',
    name: 'SocialConnect',
    category: 'Plugins',
    description: 'Automatizujte svoje príspevky na sociálnych sieťach a rozšírte svoje publikum.',
    longDescription: 'So SocialConnect môžete plánovať príspevky na viacerých platformách, sledovať zapojenie a analyzovať svoj výkon na sociálnych sieťach. Ušetrite čas a efektívne rozširujte svoju online prítomnosť.',
    price: '$29',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'social network',
    rating: 4,
    reviews: [],
  },
  {
    slug: 'datavisualizer',
    name: 'DataVisualizer',
    category: 'Windows',
    description: 'Vytvárajte úžasné grafy a diagramy z vašich dát bez námahy.',
    longDescription: 'DataVisualizer sa pripája k vašim dátovým zdrojom a umožňuje vám vytvárať interaktívne dashboardy pomocou jednoduchého rozhrania drag-and-drop. Robte rozhodnutia založené na dátach s krásnymi a prehľadnými vizualizáciami.',
    price: '$39',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'data analytics',
    rating: 4.5,
    reviews: [],
  },
  {
    slug: 'codeguardian',
    name: 'CodeGuardian',
    category: 'Bezpečnosť',
    description: 'Chráňte svoju webovú stránku pred malware a bezpečnostnými hrozbami.',
    longDescription: 'CodeGuardian ponúka detekciu hrozieb v reálnom čase, skenovanie malware a výkonný firewall na ochranu vašej aplikácie. Získajte pokoj v duši s 24/7 bezpečnostným monitorovaním.',
    price: '$59',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'security shield',
    rating: 5,
    reviews: [],
  },
  {
    slug: 'formbuilder-plus',
    name: 'FormBuilder+',
    category: 'Wordpress',
    description: 'Vytvárajte vlastné formuláre s pokročilou logikou a integráciami.',
    longDescription: 'Vytvorte akýkoľvek typ formulára, od jednoduchých kontaktných formulárov až po zložité prieskumy s podmienenou logikou. FormBuilder+ sa integruje s vašimi obľúbenými aplikáciami na zefektívnenie procesu zberu dát.',
    price: '$19',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'form survey',
    rating: 3.5,
    reviews: [],
  },
];

export function getPluginCategories() {
    return categories;
}

export const StarRating = ({ rating, className }: { rating: number; className?: string }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
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
};


export function PluginList() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(searchParams.get('category'));
  const { addToCart } = useCart();
  const { toast } = useToast();
  
  React.useEffect(() => {
    setSelectedCategory(searchParams.get('category'));
  }, [searchParams]);

  const allCategories = ['Všetko', ...getPluginCategories().map(c => c.name)];

  const handleCategoryChange = (category: string | null) => {
    const newCategory = category === 'Všetko' ? null : category;
    setSelectedCategory(newCategory);
    const params = new URLSearchParams(window.location.search);
    if (newCategory) {
      params.set('category', newCategory);
    } else {
      params.delete('category');
    }
    router.push(`?${params.toString()}`);
  };

  const filteredPlugins = plugins.filter(plugin => {
    const matchesCategory = !selectedCategory || plugin.category === selectedCategory;
    const matchesSearch = plugin.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddToCart = (plugin: Plugin) => {
    addToCart(plugin);
    toast({
      title: "Pridané do košíka",
      description: `${plugin.name} bol pridaný do vášho košíka.`,
    })
  };

  return (
    <section className="py-12 md:py-24">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-3xl md:text-4xl font-bold font-headline">Odporúčané pluginy</h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Objavte nástroje, ktoré vylepšia váš pracovný postup.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <Input 
          placeholder="Hľadať pluginy..."
          className="flex-grow"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {allCategories.map(category => (
                <Button 
                    key={category}
                    variant={selectedCategory === (category === 'Všetko' ? null : category) ? "default" : "outline"}
                    onClick={() => handleCategoryChange(category)}
                    className="whitespace-nowrap"
                >
                    {category}
                </Button>
            ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPlugins.map((plugin) => (
          <motion.div
            key={plugin.slug}
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Card className="flex flex-col overflow-hidden h-full shadow-md hover:shadow-xl transition-shadow">
              <Link href={`/plugins/${plugin.slug}`} passHref>
                <div className="relative h-48 w-full cursor-pointer">
                  <Image
                    src={plugin.imageUrl}
                    alt={plugin.name}
                    fill
                    style={{objectFit: "cover"}}
                    data-ai-hint={plugin.dataAiHint}
                    className="transition-transform duration-300"
                  />
                </div>
              </Link>
              <CardContent className="p-6 flex-grow">
                <Badge variant="secondary" className="mb-2">{plugin.category}</Badge>
                <Link href={`/plugins/${plugin.slug}`} passHref>
                  <h3 className="text-xl font-bold font-headline mb-2 cursor-pointer hover:underline">{plugin.name}</h3>
                </Link>
                <div className="flex items-center gap-2 mb-2">
                  <StarRating rating={plugin.rating} />
                  <span className="text-sm text-muted-foreground">({plugin.reviews.length} recenzií)</span>
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
      {filteredPlugins.length === 0 && (
        <div className="text-center py-16">
            <h3 className="text-2xl font-bold font-headline">Nenašli sa žiadne pluginy</h3>
            <p className="text-muted-foreground mt-2">Skúste upraviť vyhľadávanie alebo filtre.</p>
        </div>
      )}
    </section>
  );
}

export const getPluginData = (slug: string) => {
  return plugins.find(p => p.slug === slug);
}
