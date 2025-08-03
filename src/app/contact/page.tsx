
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
            title: 'Message Sent!',
            description: "We'll get back to you as soon as possible.",
        });
        
        // Reset form - for a real app, you'd use react-hook-form
        (event.target as HTMLFormElement).reset();
    };

    return (
        <PageTransitionWrapper>
            <main className="container mx-auto px-4 py-12 md:py-24">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold font-headline">Contact Us</h1>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Have questions? We'd love to hear from you.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
                    <div className="space-y-8">
                        <Card>
                            <CardHeader>
                                <CardTitle>Send us a message</CardTitle>
                                <CardDescription>Fill out the form and our team will get back to you.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="name">Name</Label>
                                            <Input id="name" placeholder="John Doe" required />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="email">Email</Label>
                                            <Input id="email" type="email" placeholder="john@example.com" required />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="subject">Subject</Label>
                                        <Input id="subject" placeholder="Question about plugins" required />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="message">Message</Label>
                                        <Textarea id="message" placeholder="Your message..." required />
                                    </div>
                                    <Button type="submit" className="w-full" disabled={isLoading}>
                                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                        Send Message
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </div>

                     <div className="space-y-8">
                        <Card className="bg-secondary/50 dark:bg-secondary/20 border-primary/20">
                            <CardHeader>
                                <CardTitle>Our Contact Details</CardTitle>
                                <CardDescription>Get in touch with us directly.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4 text-lg">
                                <div className="flex items-center gap-4">
                                    <Mail className="h-6 w-6 text-primary" />
                                    <a href="mailto:info@softw4re.com" className="hover:underline">info@softw4re.com</a>
                                </div>
                                <div className="flex items-center gap-4">
                                    <Phone className="h-6 w-6 text-primary" />
                                    <a href="tel:+1234567890" className="hover:underline">+1 (234) 567-890</a>
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
