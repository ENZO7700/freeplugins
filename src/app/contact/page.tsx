
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { PageTransitionWrapper } from '@/components/page-transition-wrapper';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Mail, Phone, MapPin, UploadCloud, X } from 'lucide-react';
import * as React from 'react';
import Image from 'next/image';

export default function ContactPage() {
    const { toast } = useToast();
    const [isLoading, setIsLoading] = React.useState(false);
    const [preview, setPreview] = React.useState<string | null>(null);
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setIsLoading(true);

        // Simulácia odosielania
        await new Promise(resolve => setTimeout(resolve, 1500));

        setIsLoading(false);
        toast({
            title: 'Správa odoslaná!',
            description: "Odpovieme vám čo najskôr.",
        });
        
        // Reset formulára a náhľadu
        (event.target as HTMLFormElement).reset();
        handleRemovePreview();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            setPreview(null);
            if (file) {
                 toast({
                    variant: 'destructive',
                    title: 'Neplatný súbor',
                    description: 'Prosím, vyberte platný obrázkový súbor.',
                });
            }
        }
    };
    
    const handleRemovePreview = () => {
        setPreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    }

    return (
        <PageTransitionWrapper>
            <main className="container mx-auto px-4 py-12 md:py-24">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold font-headline">Kontaktujte nás</h1>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Máte otázky? Radi vám na ne odpovieme.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
                    <div className="space-y-8">
                        <Card>
                            <CardHeader>
                                <CardTitle>Napíšte nám správu</CardTitle>
                                <CardDescription>Vyplňte formulár a náš tím sa vám čo najskôr ozve.</CardDescription>
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
                                        <Input id="subject" placeholder="Otázka ohľadom pluginov" required />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="message">Správa</Label>
                                        <Textarea id="message" placeholder="Vaša správa..." required />
                                    </div>
                                     <Card>
                                        <CardHeader>
                                            <CardTitle>Nahrajte prílohu</CardTitle>
                                            <CardDescription>Ukážte nám problém nahraním obrázka (max 5MB).</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            {preview ? (
                                                <div className="relative group">
                                                    <Image src={preview} alt="Náhľad obrázka" width={500} height={300} className="rounded-md object-cover w-full h-auto" />
                                                    <Button
                                                        variant="destructive"
                                                        size="icon"
                                                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                                                        onClick={handleRemovePreview}
                                                        aria-label="Odstrániť obrázok"
                                                    >
                                                        <X className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            ) : (
                                                <div 
                                                    className="border-2 border-dashed border-muted-foreground/50 rounded-lg p-12 text-center cursor-pointer hover:border-primary hover:bg-accent transition-colors"
                                                    onClick={() => fileInputRef.current?.click()}
                                                >
                                                    <div className="flex flex-col items-center gap-2 text-muted-foreground">
                                                        <UploadCloud className="h-10 w-10" />
                                                        <span className="font-medium">Kliknite pre nahratie súboru</span>
                                                        <span className="text-sm">alebo ho sem presuňte myšou</span>
                                                    </div>
                                                    <Input 
                                                        ref={fileInputRef}
                                                        type="file" 
                                                        className="hidden" 
                                                        accept="image/*"
                                                        onChange={handleFileChange} 
                                                    />
                                                </div>
                                            )}
                                        </CardContent>
                                     </Card>

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
                                <CardDescription>Spojte sa s nami priamo.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4 text-lg">
                                <div className="flex items-center gap-4">
                                    <Mail className="h-6 w-6 text-primary" />
                                    <a href="mailto:info@freeplugins.com" className="hover:underline">info@freeplugins.com</a>
                                </div>
                                <div className="flex items-center gap-4">
                                    <Phone className="h-6 w-6 text-primary" />
                                    <a href="tel:+421900123456" className="hover:underline">+421 900 123 456</a>
                                </div>
                                 <div className="flex items-center gap-4">
                                    <MapPin className="h-6 w-6 text-primary" />
                                    <span>Bratislava, Slovensko</span>
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
