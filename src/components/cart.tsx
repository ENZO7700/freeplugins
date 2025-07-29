
'use client';

import { useCart } from '@/context/cart-context';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetFooter } from '@/components/ui/sheet';
import { ShoppingCart, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export function Cart() {
  const { cart, removeFromCart, total } = useCart();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <ShoppingCart />
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {cart.length}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Your Cart</SheetTitle>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto py-6">
          {cart.length === 0 ? (
            <p className="text-center text-muted-foreground">Your cart is empty.</p>
          ) : (
            <ul className="divide-y divide-border">
              {cart.map(item => (
                <li key={item.slug} className="flex py-6">
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border">
                    <Image src={item.imageUrl} alt={item.name} width={96} height={96} style={{objectFit: "cover"}} data-ai-hint={item.dataAiHint} />
                  </div>
                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium">
                        <h3>{item.name}</h3>
                        <p className="ml-4">{item.price}</p>
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">{item.category}</p>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm">
                      <p className="text-muted-foreground">Qty 1</p>
                      <div className="flex">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeFromCart(item.slug)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        {cart.length > 0 && (
            <SheetFooter>
                <div className='w-full space-y-4'>
                    <div className="flex justify-between text-base font-medium">
                        <p>Subtotal</p>
                        <p>${total.toFixed(2)}</p>
                    </div>
                    <p className="mt-0.5 text-sm text-muted-foreground">Shipping and taxes calculated at checkout.</p>
                    <Button className='w-full' asChild>
                      <Link href="/checkout">Checkout</Link>
                    </Button>
                </div>
            </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}
