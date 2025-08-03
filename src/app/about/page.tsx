
'use client';

import { PageTransitionWrapper } from '@/components/page-transition-wrapper';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Image from 'next/image';
import { Balancer } from 'react-wrap-balancer';
import { Users, Rocket, Target } from 'lucide-react';

const teamMembers = [
    {
        name: 'Alex Schwarz',
        role: 'CEO & Founder',
        bio: 'Alex is the visionary behind SOFTW4R3. His goal is to create the best and most innovative marketplace for software tools.',
        imageUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=150&h=150&fit=crop',
    },
    {
        name: 'Eva Coder',
        role: 'Lead Developer',
        bio: 'Eva is the brain behind the entire operation. With a passion for clean code and the latest technologies, she ensures the platform runs like clockwork.',
        imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&h=150&fit=crop',
    },
    {
        name: 'Peter Designer',
        role: 'Head of Design',
        bio: 'Peter is the artist who gives SOFTW4R3 its unique look. He is responsible for making the user experience not only functional but also beautiful.',
        imageUrl: 'https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=150&h=150&fit=crop',
    }
];

export default function AboutPage() {
    return (
        <PageTransitionWrapper>
            <main className="container mx-auto px-4 py-12 md:py-24">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold font-headline">
                        <Balancer>About SOFTW4R3</Balancer>
                    </h1>
                    <p className="mt-4 text-lg text-muted-foreground">
                        <Balancer>
                           We are innovators, creators, and technology enthusiasts changing the way people discover and use software.
                        </Balancer>
                    </p>
                </div>

                <div className="relative h-96 w-full rounded-lg overflow-hidden shadow-lg mb-24">
                  <Image src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&h=600&fit=crop" alt="Team at work" fill style={{objectFit: 'cover'}} data-ai-hint="team working" />
                </div>


                <div className="grid md:grid-cols-3 gap-8 text-center max-w-5xl mx-auto mb-24">
                    <Card>
                        <CardHeader>
                            <div className="flex justify-center mb-4">
                                <Target className="h-12 w-12 text-primary" />
                            </div>
                            <CardTitle>Our Mission</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">
                                To simplify access to high-quality software tools for creators and developers worldwide and to foster innovation.
                            </p>
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader>
                            <div className="flex justify-center mb-4">
                                <Rocket className="h-12 w-12 text-primary" />
                            </div>
                            <CardTitle>Our Vision</CardTitle>
                        </CardHeader>
                        <CardContent>
                             <p className="text-muted-foreground">
                                To become the most trusted and dynamic platform where the best ideas turn into real software.
                            </p>
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader>
                           <div className="flex justify-center mb-4">
                                <Users className="h-12 w-12 text-primary" />
                            </div>
                            <CardTitle>Our Values</CardTitle>
                        </CardHeader>
                        <CardContent>
                             <p className="text-muted-foreground">
                               Quality, innovation, community, and transparency. These principles are at the core of everything we do.
                            </p>
                        </CardContent>
                    </Card>
                </div>


                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold font-headline text-center mb-12">
                        Meet the Team
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
