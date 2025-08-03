
'use client';

import * as React from 'react';
import { PageTransitionWrapper } from '@/components/page-transition-wrapper';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Image from 'next/image';
import { Balancer } from 'react-wrap-balancer';
import { Users, Rocket, Target } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

const teamMembers = [
    {
        name: 'Alex Schwarz',
        role: 'CEO & Founder',
        bio: 'Alex je vizionárom stojacim za SOFTW4R3. Jeho cieľom je vytvoriť najlepší a najinovatívnejší trh pre softvérové nástroje.',
        imageUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=150&h=150&fit=crop',
    },
    {
        name: 'Eva Coder',
        role: 'Lead Developer',
        bio: 'Eva je mozgom celej operácie. S vášňou pre čistý kód a najnovšie technológie zabezpečuje, aby platforma bežala ako hodinky.',
        imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&h=150&fit=crop',
    },
    {
        name: 'Peter Designer',
        role: 'Head of Design',
        bio: 'Peter je umelcom, ktorý dáva SOFTW4R3 jeho jedinečný vzhľad. Zodpovedá za to, aby bol používateľský zážitok nielen funkčný, ale aj krásny.',
        imageUrl: 'https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=150&h=150&fit=crop',
    }
];

function ParallaxImage() {
    const ref = React.useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });
    const y = useTransform(scrollYProgress, [0, 1], ['-20%', '20%']);

    return (
        <div ref={ref} className="relative h-96 w-full rounded-lg overflow-hidden shadow-lg mb-24">
            <motion.div className="absolute inset-0" style={{ y }}>
                <Image src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&h=600&fit=crop" alt="Tím pri práci" fill style={{objectFit: 'cover', height: '140%'}} data-ai-hint="team working" />
            </motion.div>
        </div>
    )
}


export default function AboutPage() {
    return (
        <PageTransitionWrapper>
            <main className="container mx-auto px-4 py-12 md:py-24">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold font-headline">
                        <Balancer>O SOFTW4R3</Balancer>
                    </h1>
                    <p className="mt-4 text-lg text-muted-foreground">
                        <Balancer>
                           Sme inovátori, tvorcovia a technologickí nadšenci, ktorí menia spôsob, akým ľudia objavujú a používajú softvér.
                        </Balancer>
                    </p>
                </div>

                <ParallaxImage />

                <div className="grid md:grid-cols-3 gap-8 text-center max-w-5xl mx-auto mb-24">
                    <Card>
                        <CardHeader>
                            <div className="flex justify-center mb-4">
                                <Target className="h-12 w-12 text-primary" />
                            </div>
                            <CardTitle>Naša misia</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">
                                Zjednodušiť prístup ku kvalitným softvérovým nástrojom pre tvorcov a vývojárov po celom svete a podporovať inovácie.
                            </p>
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader>
                            <div className="flex justify-center mb-4">
                                <Rocket className="h-12 w-12 text-primary" />
                            </div>
                            <CardTitle>Naša vízia</CardTitle>
                        </CardHeader>
                        <CardContent>
                             <p className="text-muted-foreground">
                                Stať sa najdôveryhodnejšou a najdynamickejšou platformou, kde sa najlepšie nápady menia na skutočný softvér.
                            </p>
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader>
                           <div className="flex justify-center mb-4">
                                <Users className="h-12 w-12 text-primary" />
                            </div>
                            <CardTitle>Naše hodnoty</CardTitle>
                        </CardHeader>
                        <CardContent>
                             <p className="text-muted-foreground">
                               Kvalita, inovácia, komunita a transparentnosť. Tieto princípy sú jadrom všetkého, čo robíme.
                            </p>
                        </CardContent>
                    </Card>
                </div>


                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold font-headline text-center mb-12">
                        Zoznámte sa s tímom
                    </h2>
                    <div className="space-y-8">
                        {teamMembers.map((member) => (
                             <Card key={member.name} className="flex flex-col md:flex-row items-center gap-6 p-6">
                                <Avatar className="h-24 w-24 border-4 border-primary">
                                    <AvatarImage src={member.imageUrl} alt={member.name} />
                                    <AvatarFallback>{member.name.substring(0, 2)}</AvatarFallback>
                                </Avatar>
                                <div className="text-center md:text-left">
                                    <h3 className="text-xl font-bold">{member.name}</h3>
                                    <p className="text-primary font-semibold mb-2">{member.role}</p>
                                    <p className="text-muted-foreground">{member.bio}</p>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>

            </main>
        </PageTransitionWrapper>
    )
}
