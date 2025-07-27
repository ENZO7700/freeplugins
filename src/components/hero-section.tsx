'use client';

import * as React from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap, Wind, Eye } from 'lucide-react';

interface StyleProps {
  animationStyle?: { [key: string]: string };
  uiStyle?: { [key: string]: string };
}

export function HeroSection({ animationStyle, uiStyle }: StyleProps) {
  const [offsetY, setOffsetY] = React.useState(0);
  const handleScroll = () => setOffsetY(window.pageYOffset);

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const featureCards = [
    {
      icon: <Zap className="w-8 h-8 text-primary" />,
      title: 'Vast Plugin Library',
      description: 'Access a wide variety of plugins for any need.',
      dataAiHint: 'software code',
    },
    {
      icon: <Wind className="w-8 h-8 text-primary" />,
      title: 'Easy Integration',
      description: 'Integrate our plugins seamlessly into your projects.',
      dataAiHint: 'puzzle connect',
    },
    {
      icon: <Eye className="w-8 h-8 text-primary" />,
      title: 'Community Reviewed',
      description: 'Reliable and reviewed plugins by our community.',
      dataAiHint: 'people community',
    },
  ];

  const getTransitionDuration = () => {
    if (animationStyle?.animationSpeed === 'fast') return '0.2s';
    if (animationStyle?.animationSpeed === 'slow') return '1s';
    return '0.5s';
  };

  const dynamicCardStyle = {
    transition: `transform ${getTransitionDuration()} ease-out, box-shadow ${getTransitionDuration()} ease-out`,
    fontSize: uiStyle?.fontSize || 'inherit',
    padding: uiStyle?.elementSpacing || '1.5rem',
  };

  return (
    <section className="py-12 md:py-24">
      <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in-up">
        <h2 className="text-4xl md:text-6xl font-bold font-headline tracking-tighter">
          The Ultimate Software Marketplace
        </h2>
        <p className="mt-4 text-lg text-muted-foreground" style={{ fontSize: uiStyle?.fontSize }}>
          Find, share, and sell software plugins and tools that power your projects.
        </p>
        <Button size="lg" className="mt-8">
          Explore Plugins <ArrowRight className="ml-2" />
        </Button>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {featureCards.map((feature, index) => (
          <div
            key={feature.title}
            style={{ transform: `translateY(${offsetY * (0.05 * (index + 1))}px)` }}
          >
            <Card
              className="h-full hover:shadow-primary/20 hover:shadow-2xl hover:-translate-y-2"
              style={dynamicCardStyle}
            >
              <CardHeader className="flex flex-col items-center text-center">
                <div className="p-4 bg-primary/10 rounded-full mb-4">{feature.icon}</div>
                <CardTitle className="font-headline">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

      <div className="mt-24 grid md:grid-cols-2 gap-12 items-center">
        <div style={{ transform: `translateX(${offsetY * -0.1}px)` }}>
            <h3 className="text-3xl font-bold font-headline">Power Up Your Workflow</h3>
            <p className="mt-4 text-muted-foreground">
                Streamline your development process with high-quality plugins. From small utilities to large-scale integrations, find the tools you need to build better and faster.
            </p>
        </div>
        <div className="relative h-80 rounded-xl overflow-hidden shadow-2xl" style={{ transform: `translateX(${offsetY * 0.1}px)` }}>
            <Image src="https://placehold.co/600x400.png" layout="fill" objectFit="cover" alt="Abstract visual of code" data-ai-hint="digital code" />
        </div>
      </div>
    </section>
  );
}
