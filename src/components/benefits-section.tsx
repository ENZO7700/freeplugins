'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BadgePercent, ShieldCheck, RefreshCw, Star, ArrowDownCircle, Info } from 'lucide-react';

const benefits = [
  {
    icon: <BadgePercent className="w-8 h-8 text-primary" />,
    title: 'Najlepšie Ceny',
    description: 'Poskytujeme originálne témy a pluginy za bezkonkurenčné ceny.',
  },
  {
    icon: <Info className="w-8 h-8 text-primary" />,
    title: 'Originálne Produkty',
    description: 'Všetky témy a pluginy sú zakúpené priamo od oficiálnych autorov.',
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-primary" />,
    title: 'Bezpečné Použitie',
    description: 'Všetky produkty sú pred pridaním dôkladne skenované a overené.',
  },
  {
    icon: <ArrowDownCircle className="w-8 h-8 text-primary" />,
    title: 'Garancia Vrátenia Peňazí',
    description: 'Ponúkame 7-dňovú garanciu vrátenia peňazí podľa našich podmienok.',
  },
  {
    icon: <RefreshCw className="w-8 h-8 text-primary" />,
    title: 'Najrýchlejšie Aktualizácie',
    description: 'Denné aktualizácie všetkých produktov priamo od vývojárov.',
  },
  {
    icon: <Star className="w-8 h-8 text-primary" />,
    title: '100% Spokojnosť',
    description: 'Našim cieľom je 100% spokojnosť každého zákazníka.',
  },
];

export function BenefitsSection() {
  return (
    <section className="bg-secondary/50 dark:bg-secondary/20 py-12 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">Prečo si vybrať nás?</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Získajte prístup k najlepším nástrojom s garanciou kvality a bezpečnosti.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit) => (
            <Card key={benefit.title} className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="flex flex-col items-center">
                <div className="p-4 bg-primary/10 rounded-full mb-4 border border-primary/20">
                  {benefit.icon}
                </div>
                <CardTitle className="font-headline text-xl">{benefit.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
