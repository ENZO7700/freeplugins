'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

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
    dataAiHint: 'people network',
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

export function PluginList() {
  return (
    <section className="py-12 md:py-24">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-3xl md:text-4xl font-bold font-headline">Featured Plugins</h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Discover tools that will supercharge your workflow.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {plugins.map((plugin) => (
            <Card key={plugin.name} className="flex flex-col overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="relative h-48 w-full">
                <Image
                  src={plugin.imageUrl}
                  alt={plugin.name}
                  layout="fill"
                  objectFit="cover"
                  data-ai-hint={plugin.dataAiHint}
                />
              </div>
              <CardContent className="p-6 flex-grow">
                <Badge variant="secondary" className="mb-2">{plugin.category}</Badge>
                <h3 className="text-xl font-bold font-headline mb-2">{plugin.name}</h3>
                <p className="text-muted-foreground text-sm">{plugin.description}</p>
              </CardContent>
              <CardFooter className="p-6 pt-0 flex justify-between items-center">
                <p className="text-lg font-semibold">{plugin.price}</p>
                <Link href={`/plugins/${plugin.slug}`} passHref>
                  <Button asChild>
                    <a>View</a>
                  </Button>
                </Link>
              </CardFooter>
            </Card>
        ))}
      </div>
    </section>
  );
}

export const getPluginData = (slug: string) => {
  return plugins.find(p => p.slug === slug);
}
