
'use client';

import * as React from 'react';
import { useAuth } from '@/context/auth-context';
import { useCart } from '@/context/cart-context';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { PageTransitionWrapper } from '@/components/page-transition-wrapper';
import { Loader2, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { onOrderPaid } from '@/ai/flows/on-order-paid';

export default function CheckoutPage() {
  const { user, loading } = useAuth();
  const { cart, total, clearCart } = useCart();
  const router = useRouter();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = React.useState(false);

  React.useEffect(() => {
    if (loading) return;

    if (!user) {
      router.push('/login?redirect=/checkout');
    } else if (cart.length === 0) {
        router.push('/');
    }
  }, [user, loading, cart, router]);

  const handlePlaceOrder = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!user) {
      toast({
        variant: "destructive",
        title: "Chyba",
        description: "Na zadanie objednávky musíte byť prihlásený.",
      });
      return;
    }
    setIsProcessing(true);

    try {
      // 1. Create the order document in Firestore
      const orderRef = await addDoc(collection(db, "orders"), {
        userId: user.uid,
        userEmail: user.email,
        items: cart,
        total: total,
        orderDate: serverTimestamp(),
        status: 'paid' // Simulate successful payment
      });

      console.log("Order created with ID: ", orderRef.id);

      // 2. Trigger the onOrderPaid Genkit flow
      await onOrderPaid({
        orderId: orderRef.id,
        userId: user.uid,
        userEmail: user.email || '',
        items: cart.map(item => ({ pluginId: item.slug, name: item.name })),
      });
      
      setIsProcessing(false);
      clearCart();
      toast({
        title: 'Objednávka úspešná!',
        description: 'Vaše pluginy sú na ceste. Ďakujeme za nákup.',
      });
      router.push('/dashboard');

    } catch (error) {
        console.error("Error placing order: ", error);
        toast({
          variant: "destructive",
          title: "Spracovanie objednávky zlyhalo",
          description: "Vyskytla sa chyba. Skúste to znova.",
        });
        setIsProcessing(false);
    }
  };

  if (loading || !user || cart.length === 0) {
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
                  Pokračovať v nákupe
               </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            
            <Card>
                <CardHeader>
                    <CardTitle>Fakturačné údaje</CardTitle>
                    <CardDescription>Zadajte svoje údaje na dokončenie nákupu.</CardDescription>
                </CardHeader>
                <form onSubmit={handlePlaceOrder}>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Celé meno</Label>
                            <Input id="name" defaultValue={user.displayName || ''} required />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="email">E-mailová adresa</Label>
                            <Input id="email" type="email" defaultValue={user.email || ''} required disabled />
                        </div>
                    </CardContent>
                    <CardFooter>
                         <Button type="submit" className="w-full" size="lg" disabled={isProcessing || cart.length === 0}>
                            {isProcessing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Zadať objednávku
                        </Button>
                    </CardFooter>
                </form>
            </Card>

            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Súhrn objednávky</CardTitle>
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
                            <p className="text-muted-foreground">Váš košík je prázdny.</p>
                        )}
                    </CardContent>
                    <CardFooter className="flex justify-between font-bold text-lg border-t pt-4">
                        <p>Celkom</p>
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
