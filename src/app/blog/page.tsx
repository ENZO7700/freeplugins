
'use client';

import { getAllPosts } from '@/lib/blog-posts';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { PageTransitionWrapper } from '@/components/page-transition-wrapper';

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <PageTransitionWrapper>
      <main className="container mx-auto px-4 py-8 flex-grow">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-headline">Blog</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Tipy, triky a novinky zo sveta softvérových pluginov a SEO.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} passHref>
                <Card className="flex flex-col overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-transform duration-300 ease-in-out h-full cursor-pointer">
                    <div className="relative h-48 w-full">
                    <Image
                        src={post.imageUrl}
                        alt={post.title}
                        fill
                        style={{objectFit: "cover"}}
                        data-ai-hint={post.dataAiHint}
                        className="hover:scale-105 transition-transform duration-300"
                    />
                    </div>
                    <CardHeader>
                        <CardTitle className="font-headline text-xl">{post.title}</CardTitle>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground pt-2">
                            <span>{post.author}</span>
                            <span>&bull;</span>
                            <span>{post.date}</span>
                        </div>
                    </CardHeader>
                    <CardContent className="flex-grow">
                        <CardDescription>{post.summary}</CardDescription>
                    </CardContent>
                </Card>
            </Link>
          ))}
        </div>
      </main>
    </PageTransitionWrapper>
  );
}
