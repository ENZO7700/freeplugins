
'use client';

import * as React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2, Sparkles, User, Bot } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { aiAssistant } from '@/ai/flows/ai-assistant';

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

export function AiAssistant() {
    const [query, setQuery] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);
    const [messages, setMessages] = React.useState<Message[]>([]);
    const { toast } = useToast();

    const handleQuerySubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;

        const userMessage: Message = { role: 'user', content: query };
        setMessages(prev => [...prev, userMessage]);
        setIsLoading(true);
        const currentQuery = query;
        setQuery('');

        try {
            const response = await aiAssistant(currentQuery); 
            const assistantMessage: Message = { role: 'assistant', content: response.answer };
            setMessages(prev => [...prev, assistantMessage]);
        } catch (error) {
            console.error('AI Assistant Error:', error);
            toast({
                variant: 'destructive',
                title: 'Vyskytla sa chyba',
                description: 'Nepodarilo sa získať odpoveď. Skúste to prosím znova.',
            });
             const assistantMessage: Message = { role: 'assistant', content: "Ospravedlňujeme sa, momentálne mám problém s pripojením. Skúste to prosím neskôr." };
             setMessages(prev => [...prev, assistantMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card className="mb-12 bg-secondary/30 border-primary/20 shadow-lg">
            <CardHeader className="text-center">
                <div className="flex justify-center items-center gap-2 mb-2">
                    <Sparkles className="h-8 w-8 text-primary" />
                    <CardTitle className="font-headline text-3xl">AI asistent pre pluginy</CardTitle>
                </div>
                <CardDescription className="text-lg">
                    Povedzte mi, čo potrebujete, a ja vám odporučím perfektný plugin alebo nájdem užitočný článok!
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="max-w-3xl mx-auto">
                    <div className="h-80 overflow-y-auto p-4 border rounded-lg bg-background/50 mb-4 space-y-4">
                        {messages.length === 0 ? (
                             <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                                <Bot className="h-12 w-12 mb-2"/>
                                <p>napr. "Nájdi mi dobrý nástroj na tvorbu formulárov" alebo "Ako môžem zlepšiť svoje SEO?"</p>
                            </div>
                        ) : (
                            messages.map((msg, index) => (
                                <div key={index} className={`flex items-start gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                   {msg.role === 'assistant' && <AvatarIcon><Bot className="h-5 w-5"/></AvatarIcon>}
                                    <div className={`rounded-lg px-4 py-2 max-w-lg ${msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                                        <p className="whitespace-pre-wrap">{msg.content}</p>
                                    </div>
                                    {msg.role === 'user' && <AvatarIcon><User className="h-5 w-5"/></AvatarIcon>}
                                </div>
                            ))
                        )}
                        {isLoading && (
                            <div className="flex items-start gap-3 justify-start">
                                <AvatarIcon><Bot className="h-5 w-5"/></AvatarIcon>
                                <div className="rounded-lg px-4 py-2 bg-muted flex items-center">
                                    <Loader2 className="h-5 w-5 animate-spin"/>
                                </div>
                            </div>
                        )}
                    </div>
                    <form onSubmit={handleQuerySubmit} className="flex gap-2">
                        <Input
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Opíšte, čo hľadáte..."
                            disabled={isLoading}
                        />
                        <Button type="submit" disabled={isLoading || !query.trim()}>
                            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Odoslať'}
                        </Button>
                    </form>
                </div>
            </CardContent>
        </Card>
    );
}

const AvatarIcon = ({ children }: { children: React.ReactNode }) => (
    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-secondary flex items-center justify-center border">
        {children}
    </div>
);
