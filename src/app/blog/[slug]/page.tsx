'use client';

import { getPostBySlug } from '@/lib/blog-posts';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8 flex-grow">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Link href="/blog" passHref>
               <Button variant="outline">
                  <ArrowLeft className="mr-2" />
                  Späť na blog
               </Button>
            </Link>
          </div>
          
          <article>
            <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4">{post.title}</h1>
            <div className="flex items-center gap-4 mb-8 text-muted-foreground">
                <div className="flex items-center gap-2">
                    <Image src={post.authorImageUrl} alt={post.author} width={40} height={40} className="rounded-full" data-ai-hint="person portrait" />
                    <span>{post.author}</span>
                </div>
                <span>&bull;</span>
                <span>{post.date}</span>
            </div>
            
            <div className="relative h-96 w-full rounded-lg overflow-hidden shadow-lg mb-8">
              <Image
                src={post.imageUrl}
                alt={post.title}
                layout="fill"
                objectFit="cover"
                data-ai-hint={post.dataAiHint}
              />
            </div>

            <div 
              className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </article>
        </div>
      </main>
    </div>
  );
}
