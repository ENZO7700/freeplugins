
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

export interface Plugin {
  slug: string;
  name: string;
  category: string;
  description: string;
  longDescription: string;
  price: string;
  imageUrl: string;
  dataAiHint: string;
}

export interface Category {
  name: string;
  description: string;
}

const categories: Category[] = [
    { name: 'SEO', description: 'Boost your search rankings.' },
    { name: 'E-commerce', description: 'Power up your online store.' },
    { name: 'Social Media', description: 'Automate social interactions.' },
    { name: 'Analytics', description: 'Visualize and understand data.' },
    { name: 'Security', description: 'Protect your application.' },
    { name: 'Utilities', description: 'Tools to simplify your workflow.' },
];

const plugins: Plugin[] = [
  {
    slug: 'seo-optimizer-pro',
    name: 'SEO Optimizer Pro',
    category: 'SEO',
    description: 'Boost your search engine rankings with our advanced SEO toolkit.',
    longDescription: 'Our SEO Optimizer Pro offers a complete suite of tools including keyword research, backlink analysis, on-page optimization, and performance tracking. Ideal for businesses of all sizes looking to improve their online visibility.',
    price: '$49',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'chart graph',
  },
  {
    slug: 'ecommerceify',
    name: 'E-commerceify',
    category: 'E-commerce',
    description: 'Turn your website into a powerful online store in minutes.',
    longDescription: 'E-commerceify provides everything you need to start selling online. Features include product management, secure payment gateways, inventory tracking, and customer management. Fully customizable to match your brand.',
    price: '$99',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'shopping cart',
  },
  {
    slug: 'socialconnect',
    name: 'SocialConnect',
    category: 'Social Media',
    description: 'Automate your social media posts and grow your audience.',
    longDescription: 'With SocialConnect, you can schedule posts across multiple platforms, track engagement, and analyze your social media performance. Save time and grow your online presence effectively.',
    price: '$29',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'social network',
  },
  {
    slug: 'datavisualizer',
    name: 'DataVisualizer',
    category: 'Analytics',
    description: 'Create stunning charts and graphs from your data effortlessly.',
    longDescription: 'DataVisualizer connects to your data sources and allows you to build interactive dashboards with a simple drag-and-drop interface. Make data-driven decisions with beautiful and insightful visualizations.',
    price: '$39',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'data analytics',
  },
  {
    slug: 'codeguardian',
    name: 'CodeGuardian',
    category: 'Security',
    description: 'Protect your website from malware and security threats.',
    longDescription: 'CodeGuardian offers real-time threat detection, malware scanning, and a powerful firewall to protect your application. Get peace of mind with 24/7 security monitoring.',
    price: '$59',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'security shield',
  },
  {
    slug: 'formbuilder-plus',
    name: 'FormBuilder+',
    category: 'Utilities',
    description: 'Build custom forms with advanced logic and integrations.',
    longDescription: 'Create any type of form, from simple contact forms to complex surveys with conditional logic. FormBuilder+ integrates with your favorite apps to streamline your data collection process.',
    price: '$19',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'form survey',
  },
];

export function getPluginCategories() {
    return categories;
}

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

  const allCategories = ['All', ...getPluginCategories().map(c => c.name)];

  const handleCategoryChange = (category: string | null) => {
    const newCategory = category === 'All' ? null : category;
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
      title: "Added to cart",
      description: `${plugin.name} has been added to your cart.`,
    })
  };

  return (
    <section className="py-12 md:py-24">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-3xl md:text-4xl font-bold font-headline">Featured Plugins</h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Discover tools that will supercharge your workflow.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <Input 
          placeholder="Search plugins..."
          className="flex-grow"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {allCategories.map(category => (
                <Button 
                    key={category}
                    variant={selectedCategory === (category === 'All' ? null : category) ? "default" : "outline"}
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
            <Card key={plugin.slug} className="flex flex-col overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-transform duration-300 ease-in-out">
              <Link href={`/plugins/${plugin.slug}`} passHref>
                <div className="relative h-48 w-full cursor-pointer">
                  <Image
                    src={plugin.imageUrl}
                    alt={plugin.name}
                    fill
                    style={{objectFit: "cover"}}
                    dataAiHint={plugin.dataAiHint}
                    className="hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </Link>
              <CardContent className="p-6 flex-grow">
                <Badge variant="secondary" className="mb-2">{plugin.category}</Badge>
                <Link href={`/plugins/${plugin.slug}`} passHref>
                  <h3 className="text-xl font-bold font-headline mb-2 cursor-pointer hover:underline">{plugin.name}</h3>
                </Link>
                <p className="text-muted-foreground text-sm">{plugin.description}</p>
              </CardContent>
              <CardFooter className="p-6 pt-0 flex justify-between items-center">
                <p className="text-lg font-semibold">{plugin.price}</p>
                <Button onClick={() => handleAddToCart(plugin)}>Add to Cart</Button>
              </CardFooter>
            </Card>
        ))}
      </div>
      {filteredPlugins.length === 0 && (
        <div className="text-center py-16">
            <h3 className="text-2xl font-bold font-headline">No Plugins Found</h3>
            <p className="text-muted-foreground mt-2">Try adjusting your search or filters.</p>
        </div>
      )}
    </section>
  );
}

export const getPluginData = (slug: string) => {
  return plugins.find(p => p.slug === slug);
}
