
'use client';

import * as React from 'react';
import { getAllPosts, getBlogCategories } from '@/lib/blog-posts';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { PageTransitionWrapper } from '@/components/page-transition-wrapper';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { sk } from 'date-fns/locale';

export default function BlogPage() {
  const allPosts = getAllPosts();
  const allCategories = ['All', ...getBlogCategories()];

  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('All');

  const filteredPosts = allPosts.filter(post => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <PageTransitionWrapper>
      <main className="container mx-auto px-4 py-8 flex-grow">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-headline">Blog</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Tipy, triky a novinky zo sveta softvérových pluginov a SEO.
          </p>
        </div>

        {/* Filter and Search Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-10 max-w-4xl mx-auto">
          <Input 
            placeholder="Hľadať články..."
            className="flex-grow"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
              {allCategories.map(category => (
                  <Button 
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      onClick={() => setSelectedCategory(category)}
                      className="whitespace-nowrap"
                  >
                      {category}
                  </Button>
              ))}
          </div>
        </div>


        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <motion.div
                key={post.slug}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <Link href={`/blog/${post.slug}`} passHref>
                    <Card className="flex flex-col overflow-hidden h-full cursor-pointer shadow-md hover:shadow-xl transition-shadow">
                        <div className="relative h-48 w-full">
                        <Image
                            src={post.imageUrl}
                            alt={post.title}
                            fill
                            style={{objectFit: "cover"}}
                            data-ai-hint={post.dataAiHint}
                            className="transition-transform duration-300"
                        />
                        </div>
                        <CardHeader>
                            <CardDescription>{post.category}</CardDescription>
                            <CardTitle className="font-headline text-xl">{post.title}</CardTitle>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground pt-2">
                                <span>{post.author}</span>
                                <span>&bull;</span>
                                <span>{format(new Date(post.date), "d. M. yyyy", { locale: sk })}</span>
                            </div>
                        </CardHeader>
                        <CardContent className="flex-grow">
                            <CardDescription>{post.summary}</CardDescription>
                        </CardContent>
                    </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
              <h3 className="text-2xl font-bold font-headline">Nenašli sa žiadne články</h3>
              <p className="text-muted-foreground mt-2">Skúste upraviť vyhľadávanie alebo filtre.</p>
          </div>
        )}
      </main>
    </PageTransitionWrapper>
  );
}
