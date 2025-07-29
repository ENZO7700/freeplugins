'use client';

import * as React from 'react';
import { useAuth } from '@/context/auth-context';
import { useCart } from '@/context/cart-context';
import { useDashboard } from '@/context/dashboard-context';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { PageTransitionWrapper } from '@/components/page-transition-wrapper';
import { Loader2, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function CheckoutPage() {
  const { user, loading } = useAuth();
  const { cart, total, clearCart } = useCart();
  const { addOrder } = useDashboard();
  const router = useRouter();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = React.useState(false);

  React.useEffect(() => {
    if (!loading && !user) {
      router.push('/login?redirect=/checkout');
    }
    if (!loading && user && cart.length === 0) {
        router.push('/');
    }
  }, [user, loading, cart, router]);

  const handlePlaceOrder = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsProcessing(true);
    
    // Simulate API call to process payment and create order
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Add order to dashboard context (which saves to localStorage)
    addOrder({
      id: new Date().toISOString(), // simple unique id
      date: new Date().toLocaleDateString(),
      items: cart,
      total: total,
    });

    setIsProcessing(false);
    clearCart();
    toast({
      title: 'Order Successful!',
      description: 'Your plugins are on their way. Thank you for your purchase.',
    });
    router.push('/dashboard');
  };

  if (loading || !user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <PageTransitionWrapper>
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
           <div className="mb-8">
            <Link href="/" passHref>
               <Button variant="outline">
                  <ArrowLeft className="mr-2" />
                  Continue Shopping
               </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            
            <Card>
                <CardHeader>
                    <CardTitle>Billing Information</CardTitle>
                    <CardDescription>Enter your details to complete the purchase.</CardDescription>
                </CardHeader>
                <form onSubmit={handlePlaceOrder}>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input id="name" defaultValue={user.displayName || ''} required />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            <Input id="email" type="email" defaultValue={user.email || ''} required disabled />
                        </div>
                    </CardContent>
                    <CardFooter>
                         <Button type="submit" className="w-full" size="lg" disabled={isProcessing || cart.length === 0}>
                            {isProcessing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Place Order
                        </Button>
                    </CardFooter>
                </form>
            </Card>

            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Order Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {cart.length > 0 ? (
                           <ul className="divide-y divide-border">
                                {cart.map(item => (
                                    <li key={item.slug} className="flex justify-between items-center py-3">
                                        <span>{item.name}</span>
                                        <span className="font-medium">{item.price}</span>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-muted-foreground">Your cart is empty.</p>
                        )}
                    </CardContent>
                    <CardFooter className="flex justify-between font-bold text-lg border-t pt-4">
                        <p>Total</p>
                        <p>${total.toFixed(2)}</p>
                    </CardFooter>
                </Card>
            </div>

          </div>
        </div>
      </main>
    </PageTransitionWrapper>
  );
}
