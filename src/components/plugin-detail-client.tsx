'use client';

import * as React from 'react';
import { Plugin, StarRating, Review } from '@/components/plugin-list';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Sparkles, Loader2, Star } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '@/context/cart-context';
import { useToast } from '@/hooks/use-toast';
import { PageTransitionWrapper } from '@/components/page-transition-wrapper';
import { generatePluginMarketingCopy } from '@/ai/flows/generate-plugin-marketing-copy';
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from '@/components/ui/card';
import { useAuth } from '@/context/auth-context';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { format } from 'date-fns';
import { sk } from 'date-fns/locale';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp, query, onSnapshot, orderBy } from 'firebase/firestore';
import { Skeleton } from '@/components/ui/skeleton';

interface PluginDetailClientProps {
    pluginData: Plugin;
}

export default function PluginDetailClient({ pluginData }: PluginDetailClientProps) {
  const { user } = useAuth();
  const { addToCart } = useCart();
  const { toast } = useToast();
  
  const [reviews, setReviews] = React.useState<Review[]>([]);
  const [averageRating, setAverageRating] = React.useState(pluginData.rating);
  const [isReviewsLoading, setIsReviewsLoading] = React.useState(true);
  
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [marketingCopy, setMarketingCopy] = React.useState('');
  const [reviewRating, setReviewRating] = React.useState(0);
  const [reviewComment, setReviewComment] = React.useState('');
  const [isSubmittingReview, setIsSubmittingReview] = React.useState(false);

  React.useEffect(() => {
    if (!pluginData) return;
    
    const reviewsColRef = collection(db, "plugins", pluginData.slug, "reviews");
    const q = query(reviewsColRef, orderBy("date", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedReviews: Review[] = [];
      snapshot.forEach(doc => {
        const data = doc.data();
        fetchedReviews.push({
          author: data.author,
          rating: data.rating,
          comment: data.comment,
          date: data.date?.toDate().toISOString() || new Date().toISOString(),
        });
      });
      setReviews(fetchedReviews);
      
      if (fetchedReviews.length > 0) {
        const totalRating = fetchedReviews.reduce((sum, r) => sum + r.rating, 0);
        setAverageRating(parseFloat((totalRating / fetchedReviews.length).toFixed(1)));
      } else {
        setAverageRating(pluginData.rating); // Fallback to static rating
      }
      
      setIsReviewsLoading(false);
    }, (error) => {
      console.error("Chyba pri načítaní recenzií: ", error);
      toast({
          variant: "destructive",
          title: "Chyba pri načítaní recenzií",
          description: "Nepodarilo sa načítať recenzie z databázy. Skúste to prosím znova.",
      });
      setIsReviewsLoading(false);
    });

    return () => unsubscribe();
  }, [pluginData, toast]);

  const handleAddToCart = () => {
    addToCart(pluginData);
    toast({
      title: "Pridané do košíka",
      description: `${pluginData.name} bol pridaný do vášho košíka.`,
    })
  };

  const handleGenerateCopy = async () => {
    setIsGenerating(true);
    setMarketingCopy('');
    try {
      const result = await generatePluginMarketingCopy({
        name: pluginData.name,
        description: pluginData.description,
        category: pluginData.category,
      });
      setMarketingCopy(result.copy);
    } catch (error) {
      console.error('Nepodarilo sa vygenerovať marketingový text:', error);
      toast({
        variant: 'destructive',
        title: 'Vyskytla sa chyba',
        description: 'Nepodarilo sa vygenerovať marketingový text. Skúste to znova.',
      });
    } finally {
      setIsGenerating(false);
    }
  };
  
  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (reviewRating === 0 || !reviewComment.trim()) {
        toast({
            variant: "destructive",
            title: "Neúplná recenzia",
            description: "Prosím, zadajte hodnotenie a komentár.",
        });
        return;
    }
     if (!user) {
        toast({
            variant: "destructive",
            title: "Nie ste prihlásený",
            description: "Na odoslanie recenzie sa musíte prihlásiť.",
        });
        return;
    }
    
    setIsSubmittingReview(true);
    
    try {
        const reviewsColRef = collection(db, "plugins", pluginData.slug, "reviews");
        await addDoc(reviewsColRef, {
            author: user?.displayName || user?.email || 'Anonym',
            authorId: user.uid,
            rating: reviewRating,
            comment: reviewComment,
            date: serverTimestamp(),
        });

        
        setReviewRating(0);
        setReviewComment('');
        toast({
            title: "Recenzia odoslaná!",
            description: "Ďakujeme za vašu spätnú väzbu.",
        });
    } catch (error) {
         console.error("Error submitting review: ", error);
         toast({
            variant: "destructive",
            title: "Odoslanie zlyhalo",
            description: "Vyskytla sa chyba pri odosielaní vašej recenzie. Skúste to prosím znova.",
        });
    } finally {
        setIsSubmittingReview(false);
    }
  };

  return (
    <PageTransitionWrapper>
      <main className="container mx-auto px-4 py-8 flex-grow">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Link href="/" passHref>
               <Button variant="outline">
                  <ArrowLeft className="mr-2" />
                  Späť na trhovisko
               </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            <div className="relative h-80 w-full rounded-lg overflow-hidden shadow-lg">
              {pluginData.imageUrl && (
                <Image
                  src={pluginData.imageUrl}
                  alt={pluginData.name}
                  fill
                  style={{objectFit: "cover"}}
                  data-ai-hint={pluginData.dataAiHint}
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              )}
            </div>
            <div className="flex flex-col justify-center">
              <Badge variant="secondary" className="w-fit mb-2">{pluginData.category}</Badge>
              <h1 className="text-4xl font-bold font-headline mb-4">{pluginData.name}</h1>
              <div className="flex items-center gap-2 mb-4">
                  <StarRating rating={averageRating} />
                  <span className="text-muted-foreground">
                    {averageRating.toFixed(1)} ({reviews.length} {reviews.length === 1 ? 'recenzia' : reviews.length >=2 && reviews.length <=4 ? 'recenzie' : 'recenzií'})
                  </span>
              </div>
              <p className="text-2xl font-semibold mb-6">{pluginData.price}</p>
              <p className="text-lg text-muted-foreground mb-6">{pluginData.description}</p>
              <Button size="lg" onClick={handleAddToCart}>Pridať do košíka</Button>
            </div>
          </div>

          <div className="mt-16">
            <h2 className="text-3xl font-bold font-headline mb-4">Detaily produktu</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground mb-8">
              <p>{pluginData.longDescription}</p>
            </div>
          </div>

          <Separator className="my-12" />

          {/* Reviews Section */}
          <div className="mt-12">
             <h2 className="text-3xl font-bold font-headline mb-8">Hodnotenia a recenzie</h2>

            {user ? (
                 <Card className="mb-8 bg-secondary/30">
                    <CardHeader>
                        <CardTitle>Napísať recenziu</CardTitle>
                        <CardDescription>Podeľte sa o svoje skúsenosti s týmto pluginom.</CardDescription>
                    </CardHeader>
                    <form onSubmit={handleReviewSubmit}>
                      <CardContent className="space-y-4">
                          <div>
                              <Label className="mb-2 block">Vaše hodnotenie</Label>
                              <div className="flex gap-1">
                                  {[1, 2, 3, 4, 5].map((star) => (
                                      <Star
                                          key={star}
                                          className={`w-8 h-8 cursor-pointer transition-colors ${reviewRating >= star ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                                          onClick={() => setReviewRating(star)}
                                          aria-label={`Hodnotenie ${star} z 5`}
                                      />
                                  ))}
                              </div>
                          </div>
                          <div>
                              <Label htmlFor="review-comment">Váš komentár</Label>
                              <Textarea 
                                  id="review-comment" 
                                  placeholder="Čo sa vám páčilo alebo nepáčilo?" 
                                  value={reviewComment}
                                  onChange={(e) => setReviewComment(e.target.value)}
                                  required
                                  aria-required="true"
                              />
                          </div>
                      </CardContent>
                      <CardFooter>
                           <Button type="submit" disabled={isSubmittingReview}>
                              {isSubmittingReview && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                              Odoslať recenziu
                           </Button>
                      </CardFooter>
                    </form>
                </Card>
            ) : (
                 <Card className="mb-8 text-center p-8 bg-secondary/30">
                    <CardTitle>Chcete zanechať recenziu?</CardTitle>
                    <CardDescription className="mt-2">Prosím, prihláste sa, aby ste sa mohli podeliť o svoje myšlienky s komunitou.</CardDescription>
                    <Button asChild className="mt-4">
                        <Link href={`/login?redirect=/plugins/${pluginData.slug}`}>Prihlásiť sa a hodnotiť</Link>
                    </Button>
                </Card>
            )}

             <div className="space-y-6">
                {isReviewsLoading ? (
                    <div className="space-y-6">
                        <Skeleton className="h-24 w-full" />
                        <Skeleton className="h-24 w-full" />
                    </div>
                ) : reviews.length > 0 ? (
                    reviews.map((review, index) => (
                        <Card key={index} className="p-6">
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="font-semibold">{review.author}</p>
                                    <p className="text-sm text-muted-foreground">{format(new Date(review.date), "d. M. yyyy", { locale: sk })}</p>
                                </div>
                                <StarRating rating={review.rating} />
                            </div>
                            <p className="mt-4 text-muted-foreground">{review.comment}</p>
                        </Card>
                    ))
                ) : (
                    <p className="text-center text-muted-foreground py-8">Buďte prvý, kto ohodnotí tento plugin!</p>
                )}
             </div>
          </div>

          <Card className="mt-12 bg-secondary/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="text-primary" />
                <span>Marketingový asistent s AI</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">Vygenerujte pútavý marketingový text pre tento plugin jediným kliknutím.</p>
              <Button onClick={handleGenerateCopy} disabled={isGenerating}>
                {isGenerating ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Sparkles className="mr-2 h-4 w-4" />
                )}
                Generovať marketingový text
              </Button>

              {isGenerating && (
                 <div className="mt-4">
                    <Skeleton className="h-20 w-full" />
                 </div>
              )}

              {marketingCopy && (
                <div className="mt-6 p-4 border rounded-lg bg-background">
                    <p className="whitespace-pre-wrap font-mono text-sm">{marketingCopy}</p>
                </div>
              )}
            </CardContent>
          </Card>

        </div>
      </main>
    </PageTransitionWrapper>
  );
}
