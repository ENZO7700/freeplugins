
'use client';

import * as React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2, Lightbulb, Sparkles, User, Tag, DollarSign, Target } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { generatePluginIdea, type GeneratePluginIdeaOutput } from '@/ai/flows/generate-plugin-idea';
import { generatePluginLogo } from '@/ai/flows/generate-plugin-logo';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';

export function PluginIdeaGenerator() {
    const [concept, setConcept] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);
    const [isLogoLoading, setIsLogoLoading] = React.useState(false);
    const [idea, setIdea] = React.useState<GeneratePluginIdeaOutput | null>(null);
    const [logoUrl, setLogoUrl] = React.useState<string | null>(null);
    const { toast } = useToast();

    const handleIdeaSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!concept.trim()) return;

        setIsLoading(true);
        setIdea(null);
        setLogoUrl(null);

        try {
            const response = await generatePluginIdea({ concept });
            setIdea(response);
            
            // Now, generate the logo
            setIsLogoLoading(true);
            try {
                const logoResponse = await generatePluginLogo({ 
                    name: response.name, 
                    description: response.description 
                });
                setLogoUrl(logoResponse);
            } catch (logoError) {
                console.error('Plugin Logo Generation Error:', logoError);
                // Non-critical error, so we just toast without failing the whole process
                toast({
                    variant: 'destructive',
                    title: 'Chyba pri generovaní loga',
                    description: 'Nepodarilo sa vygenerovať logo, ale detaily nápadu sú pripravené.',
                });
            } finally {
                setIsLogoLoading(false);
            }

        } catch (error) {
            console.error('Plugin Idea Generator Error:', error);
            toast({
                variant: 'destructive',
                title: 'Vyskytla sa chyba',
                description: 'Nepodarilo sa vygenerovať nápad. Skúste to prosím znova.',
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section className="py-12 md:py-24 bg-secondary/30 rounded-lg my-12">
             <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-12">
                     <div className="flex justify-center items-center gap-2 mb-2">
                        <Lightbulb className="h-8 w-8 text-primary" />
                        <h2 className="text-3xl md:text-4xl font-bold font-headline">Generátor nápadov na pluginy</h2>
                    </div>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Máte nápad, ale neviete, ako ďalej? Nechajte si pomôcť od AI a rozpracujte svoj koncept!
                    </p>
                </div>
                
                <Card className="max-w-3xl mx-auto shadow-lg">
                    <form onSubmit={handleIdeaSubmit}>
                        <CardHeader>
                            <CardTitle>Váš koncept</CardTitle>
                            <CardDescription>Stručne opíšte, čo by mal váš plugin robiť (napr. "nástroj na správu projektov pre dizajnérov").</CardDescription>
                        </CardHeader>
                        <CardContent>
                             <div className="flex gap-2">
                                <Input
                                    value={concept}
                                    onChange={(e) => setConcept(e.target.value)}
                                    placeholder="Napr. 'Nástroj na optimalizáciu obrázkov pre WordPress'"
                                    disabled={isLoading}
                                />
                                <Button type="submit" disabled={isLoading || !concept.trim()}>
                                    {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4"/>}
                                    Generovať
                                </Button>
                            </div>
                        </CardContent>
                    </form>
                    
                    <AnimatePresence>
                    {idea && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                        >
                        <CardFooter className="flex flex-col items-start gap-6 pt-6 border-t">
                            <div className="flex flex-col sm:flex-row items-center gap-4">
                                {isLogoLoading ? (
                                    <div className="w-24 h-24 bg-muted rounded-md flex items-center justify-center">
                                        <Loader2 className="w-8 h-8 animate-spin text-primary"/>
                                    </div>
                                ) : logoUrl ? (
                                    <Image src={logoUrl} alt={`${idea.name} logo`} width={96} height={96} className="rounded-md shadow-md"/>
                                ) : (
                                    <div className="w-24 h-24 bg-muted rounded-md flex items-center justify-center">
                                         <Lightbulb className="w-8 h-8 text-muted-foreground"/>
                                    </div>
                                )}
                                <h3 className="text-2xl font-bold font-headline text-primary text-center sm:text-left">{idea.name}</h3>
                            </div>

                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                                 <div className="flex items-start gap-3">
                                    <Target className="h-6 w-6 text-muted-foreground mt-1 flex-shrink-0" />
                                    <div>
                                        <h4 className="font-semibold">Cieľová skupina</h4>
                                        <p className="text-muted-foreground">{idea.targetAudience}</p>
                                    </div>
                                 </div>
                                 <div className="flex items-start gap-3">
                                    <DollarSign className="h-6 w-6 text-muted-foreground mt-1 flex-shrink-0" />
                                    <div>
                                        <h4 className="font-semibold">Cenová stratégia</h4>
                                        <p className="text-muted-foreground">{idea.pricingStrategy}</p>
                                    </div>
                                 </div>
                             </div>

                             <div>
                                <h4 className="font-semibold mb-2">Popis a funkcie</h4>
                                <p className="text-muted-foreground whitespace-pre-wrap">{idea.description}</p>
                             </div>
                        </CardFooter>
                         </motion.div>
                    )}
                    </AnimatePresence>
                </Card>
            </div>
        </section>
    );
}
