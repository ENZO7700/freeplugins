'use client';

import * as React from 'react';
import { BlogPost } from '@/lib/blog-posts';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Loader2, Volume2 } from 'lucide-react';
import Link from 'next/link';
import { PageTransitionWrapper } from '@/components/page-transition-wrapper';
import { useToast } from '@/hooks/use-toast';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface BlogPostClientProps {
    post: BlogPost;
}

export default function BlogPostClient({ post }: BlogPostClientProps) {
  const [isGeneratingAudio, setIsGeneratingAudio] = React.useState(false);
  const [audioUrl, setAudioUrl] = React.useState<string | null>(null);
  const { toast } = useToast();

  const handleListen = async () => {
    setIsGeneratingAudio(true);
    setAudioUrl(null);
    toast({
        variant: "destructive",
        title: "Funkcia nie je k dispozícii",
        description: "Generovanie audia bolo v tejto verzii aplikácie odstránené.",
      });
    setIsGeneratingAudio(false);
  };

  return (
    <PageTransitionWrapper>
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
                fill
                style={{objectFit: "cover"}}
                data-ai-hint={post.dataAiHint}
                priority
              />
            </div>
            
            <Card className="my-8 p-6 bg-secondary/30 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="font-bold text-lg">Radšej počúvate ako čítate?</h3>
                <p className="text-muted-foreground">Kliknite na tlačidlo a nechajte si článok prečítať umelou inteligenciou.</p>
              </div>
              <Button onClick={handleListen} disabled={isGeneratingAudio || !!audioUrl} aria-label="Vypočuť článok">
                {isGeneratingAudio ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Generujem...
                  </>
                ) : (
                  <>
                    <Volume2 className="mr-2 h-5 w-5" />
                    Vypočuť článok
                  </>
                )}
              </Button>
            </Card>

            {isGeneratingAudio && !audioUrl && <Skeleton className="w-full h-14 rounded-md" />}

            {audioUrl && (
              <div className="my-8">
                <audio controls src={audioUrl} className="w-full" autoPlay>
                  Váš prehliadač nepodporuje audio element.
                </audio>
              </div>
            )}

            <div 
              className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground"
            >
              {post.content.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </article>
        </div>
      </main>
    </PageTransitionWrapper>
  );
}
