
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { PageTransitionWrapper } from '@/components/page-transition-wrapper';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Mail, Phone, MapPin } from 'lucide-react';
import * as React from 'react';
import Image from 'next/image';

export default function ContactPage() {
    const { toast } = useToast();
    const [isLoading, setIsLoading] = React.useState(false);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setIsLoading(true);

        // Simulate sending a message
        await new Promise(resolve => setTimeout(resolve, 1500));

        setIsLoading(false);
        toast({
            title: 'Správa odoslaná!',
            description: "Odpovieme vám čo najskôr.",
        });
        
        // Reset form - for a real app, you'd use react-hook-form
        (event.target as HTMLFormElement).reset();
    };

    return (
        <PageTransitionWrapper>
            <main className="container mx-auto px-4 py-12 md:py-24">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold font-headline">Kontaktujte nás</h1>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Máte otázky? Radi si vás vypočujeme.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
                    <div className="space-y-8">
                        <Card>
                            <CardHeader>
                                <CardTitle>Pošlite nám správu</CardTitle>
                                <CardDescription>Vyplňte formulár a náš tím sa vám ozve.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="name">Meno</Label>
                                            <Input id="name" placeholder="Ján Vzor" required />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="email">Email</Label>
                                            <Input id="email" type="email" placeholder="jan@example.com" required />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="subject">Predmet</Label>
                                        <Input id="subject" placeholder="Otázka o pluginoch" required />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="message">Správa</Label>
                                        <Textarea id="message" placeholder="Vaša správa..." required />
                                    </div>
                                    <Button type="submit" className="w-full" disabled={isLoading}>
                                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                        Odoslať správu
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </div>

                     <div className="space-y-8">
                        <Card className="bg-secondary/50 dark:bg-secondary/20 border-primary/20">
                            <CardHeader>
                                <CardTitle>Naše kontaktné údaje</CardTitle>
                                <CardDescription>Kontaktujte nás priamo.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4 text-lg">
                                <div className="flex items-center gap-4">
                                    <Mail className="h-6 w-6 text-primary" />
                                    <a href="mailto:info@seo4web.sk" className="hover:underline">info@seo4web.sk</a>
                                </div>
                                <div className="flex items-center gap-4">
                                    <Phone className="h-6 w-6 text-primary" />
                                    <a href="tel:+421950491856" className="hover:underline">+421 950 491 856</a>
                                </div>
                                 <div className="flex items-center gap-4">
                                    <MapPin className="h-6 w-6 text-primary" />
                                    <span>Bratislava, Slovakia</span>
                                </div>
                            </CardContent>
                        </Card>

                        <div className="relative h-64 w-full rounded-lg overflow-hidden shadow-lg">
                             <Image src="https://images.unsplash.com/photo-1599209248411-188c1cb83a48?q=80&w=600&h=400&fit=crop" alt="Bratislava" fill style={{objectFit: 'cover'}} data-ai-hint="Bratislava city" />
                        </div>
                    </div>
                </div>
            </main>
        </PageTransitionWrapper>
    );
}
