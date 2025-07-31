
'use client';

import * as React from 'react';
import { getPluginData, Plugin, StarRating } from '@/components/plugin-list';
import { notFound } from 'next/navigation';
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

export default function PluginDetailPage({ params }: { params: { slug: string } }) {
  const { user } = useAuth();
  const [plugin, setPlugin] = React.useState(getPluginData(params.slug));
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [marketingCopy, setMarketingCopy] = React.useState('');
  const [reviewRating, setReviewRating] = React.useState(0);
  const [reviewComment, setReviewComment] = React.useState('');
  const [isSubmittingReview, setIsSubmittingReview] = React.useState(false);

  if (!plugin) {
    notFound();
  }

  const handleAddToCart = () => {
    addToCart(plugin as Plugin);
    toast({
      title: "Added to cart",
      description: `${plugin.name} has been added to your cart.`,
    })
  };

  const handleGenerateCopy = async () => {
    if (!plugin) return;
    setIsGenerating(true);
    setMarketingCopy('');
    try {
      const result = await generatePluginMarketingCopy({
        name: plugin.name,
        description: plugin.description,
        category: plugin.category,
      });
      setMarketingCopy(result.copy);
    } catch (error) {
      console.error('Failed to generate marketing copy:', error);
      toast({
        variant: 'destructive',
        title: 'An error occurred',
        description: 'Failed to generate marketing copy. Please try again.',
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
            title: "Incomplete Review",
            description: "Please provide a rating and a comment.",
        });
        return;
    }
    
    setIsSubmittingReview(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newReview = {
        author: user?.displayName || user?.email || 'Anonymous',
        rating: reviewRating,
        comment: reviewComment,
        date: new Date().toISOString().split('T')[0],
    };
    
    // This update is local to the client. In a real app, you'd send this to a backend.
    setPlugin(prevPlugin => {
      if (!prevPlugin) return null;
      const updatedReviews = [...prevPlugin.reviews, newReview];
      const newAverageRating = updatedReviews.reduce((sum, r) => sum + r.rating, 0) / updatedReviews.length;
      return {
        ...prevPlugin,
        reviews: updatedReviews,
        rating: parseFloat(newAverageRating.toFixed(1)),
      };
    });

    setIsSubmittingReview(false);
    setReviewRating(0);
    setReviewComment('');
    toast({
        title: "Review Submitted!",
        description: "Thank you for your feedback.",
    });
  };

  return (
    <PageTransitionWrapper>
      <main className="container mx-auto px-4 py-8 flex-grow">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Link href="/" passHref>
               <Button variant="outline">
                  <ArrowLeft className="mr-2" />
                  Back to Marketplace
               </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            <div className="relative h-80 w-full rounded-lg overflow-hidden shadow-lg">
              <Image
                src={plugin.imageUrl}
                alt={plugin.name}
                fill
                style={{objectFit: "cover"}}
                data-ai-hint={plugin.dataAiHint}
              />
            </div>
            <div className="flex flex-col justify-center">
              <Badge variant="secondary" className="w-fit mb-2">{plugin.category}</Badge>
              <h1 className="text-4xl font-bold font-headline mb-4">{plugin.name}</h1>
              <div className="flex items-center gap-2 mb-4">
                  <StarRating rating={plugin.rating} />
                  <span className="text-muted-foreground">
                    {plugin.rating.toFixed(1)} ({plugin.reviews.length} reviews)
                  </span>
              </div>
              <p className="text-2xl font-semibold mb-6">{plugin.price}</p>
              <p className="text-lg text-muted-foreground mb-6">{plugin.description}</p>
              <Button size="lg" onClick={handleAddToCart}>Add to Cart</Button>
            </div>
          </div>

          <div className="mt-16">
            <h2 className="text-3xl font-bold font-headline mb-4">Product Details</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground mb-8">
              <p>{plugin.longDescription}</p>
            </div>
          </div>

          <Separator className="my-12" />

          {/* Reviews Section */}
          <div className="mt-12">
             <h2 className="text-3xl font-bold font-headline mb-8">Ratings & Reviews</h2>

             {/* Review Form */}
            {user ? (
                 <Card className="mb-8 bg-secondary/30">
                    <CardHeader>
                        <CardTitle>Write a Review</CardTitle>
                        <CardDescription>Share your experience with this plugin.</CardDescription>
                    </CardHeader>
                    <form onSubmit={handleReviewSubmit}>
                      <CardContent className="space-y-4">
                          <div>
                              <Label className="mb-2 block">Your Rating</Label>
                              <div className="flex gap-1">
                                  {[1, 2, 3, 4, 5].map((star) => (
                                      <Star
                                          key={star}
                                          className={`w-8 h-8 cursor-pointer transition-colors ${reviewRating >= star ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                                          onClick={() => setReviewRating(star)}
                                      />
                                  ))}
                              </div>
                          </div>
                          <div>
                              <Label htmlFor="review-comment">Your Comment</Label>
                              <Textarea 
                                  id="review-comment" 
                                  placeholder="What did you like or dislike?" 
                                  value={reviewComment}
                                  onChange={(e) => setReviewComment(e.target.value)}
                                  required
                              />
                          </div>
                      </CardContent>
                      <CardFooter>
                           <Button type="submit" disabled={isSubmittingReview}>
                              {isSubmittingReview && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                              Submit Review
                           </Button>
                      </CardFooter>
                    </form>
                </Card>
            ) : (
                 <Card className="mb-8 text-center p-8 bg-secondary/30">
                    <CardTitle>Want to leave a review?</CardTitle>
                    <CardDescription className="mt-2">Please log in to share your thoughts with the community.</CardDescription>
                    <Button asChild className="mt-4">
                        <Link href="/login">Login to Review</Link>
                    </Button>
                </Card>
            )}

             {/* Existing Reviews */}
             <div className="space-y-6">
                {plugin.reviews.length > 0 ? (
                    plugin.reviews.map((review, index) => (
                        <Card key={index} className="p-6">
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="font-semibold">{review.author}</p>
                                    <p className="text-sm text-muted-foreground">{new Date(review.date).toLocaleDateString()}</p>
                                </div>
                                <StarRating rating={review.rating} />
                            </div>
                            <p className="mt-4 text-muted-foreground">{review.comment}</p>
                        </Card>
                    ))
                ) : (
                    <p className="text-center text-muted-foreground py-8">Be the first to review this plugin!</p>
                )}
             </div>
          </div>


          <Card className="mt-12 bg-secondary/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="text-primary" />
                <span>AI-Powered Marketing Assistant</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">Generate engaging marketing copy for this plugin with a single click.</p>
              <Button onClick={handleGenerateCopy} disabled={isGenerating}>
                {isGenerating ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Sparkles className="mr-2 h-4 w-4" />
                )}
                Generate Marketing Copy
              </Button>

              {isGenerating && (
                 <div className="mt-4 text-muted-foreground">Generating...</div>
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
