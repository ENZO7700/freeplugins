
'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useCart } from '@/context/cart-context';
import { useToast } from '@/hooks/use-toast';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Star, StarHalf } from 'lucide-react';
import { Balancer } from 'react-wrap-balancer';

export interface Review {
  author: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Plugin {
  slug: string;
  name: string;
  category: string;
  description: string;
  longDescription: string;
  price: string;
  imageUrl: string;
  dataAiHint: string;
  rating: number; // This will now serve as the initial/default rating
  reviews: Review[]; // This will likely be empty, as reviews are fetched from DB
}

export interface Category {
  name: string;
  description: string;
}

const categories: Category[] = [
    { name: 'Wordpress', description: 'Pluginy a nástroje pre WordPress.' },
    { name: 'Plugins', description: 'Rozšírte funkcionalitu vašich aplikácií.' },
    { name: 'Downloads', description: 'Stiahnite si užitočné nástroje.' },
    { name: 'Windows', description: 'Aplikácie a utility pre Windows.' },
    { name: 'Linux', description: 'Softvér pre distribúcie Linuxu.' },
    { name: 'macOS', description: 'Nástroje a aplikácie pre macOS.' },
    { name: 'Android', description: 'Aplikácie pre vaše Android zariadenia.' },
    { name: 'iPhone', description: 'Aplikácie pre váš iPhone.' },
];

export const plugins: Plugin[] = [
  // Wordpress (Original 4 + New 8 = 12)
  {
    slug: 'elementor-pro',
    name: 'Elementor Pro',
    category: 'Wordpress',
    description: 'Vizuálny drag-and-drop tvorca stránok pre WordPress.',
    longDescription: 'Vytvárajte profesionálne webové stránky s pixelovou presnosťou pomocou intuitívneho vizuálneho editora Elementor Pro. Získajte prístup k desiatkam widgetov, šablón a nástrojov na tvorbu webu bez znalosti kódu.',
    price: '$59',
    imageUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=600&h=400&fit=crop',
    dataAiHint: 'website builder',
    rating: 4.9,
    reviews: [],
  },
  {
    slug: 'wp-rocket',
    name: 'WP Rocket',
    category: 'Wordpress',
    description: 'Výkonný caching plugin na zrýchlenie vášho WordPress webu.',
    longDescription: 'WP Rocket okamžite zlepší výkon a rýchlosť vášho webu. Ponúka caching stránok, kompresiu súborov, odložené načítanie obrázkov a optimalizáciu databázy, všetko v jednoduchom rozhraní.',
    price: '$59',
    imageUrl: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?q=80&w=600&h=400&fit=crop',
    dataAiHint: 'rocket speed',
    rating: 4.9,
    reviews: [],
  },
  {
    slug: 'yoast-seo-premium',
    name: 'Yoast SEO Premium',
    category: 'Wordpress',
    description: 'Kompletné SEO riešenie pre váš WordPress web.',
    longDescription: 'Yoast SEO Premium vám pomôže získať viac návštevníkov z Google a Bing. Ponúka analýzu kľúčových slov, správcu presmerovaní, interné prelinkovanie a náhľady na sociálnych sieťach.',
    price: '$99',
    imageUrl: 'https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?q=80&w=600&h=400&fit=crop',
    dataAiHint: 'seo optimization',
    rating: 4.7,
    reviews: [],
  },
   {
    slug: 'wordfence-security',
    name: 'Wordfence Security',
    category: 'Wordpress',
    description: 'Firewall a skener malware na ochranu vášho webu.',
    longDescription: 'Wordfence Security zahŕňa firewall pre webové aplikácie (WAF) a skener malware, ktoré chránia váš web pred hrozbami. Poskytuje tiež zabezpečenie prihlásenia a monitorovanie živého prenosu.',
    price: '$119',
    imageUrl: 'https://images.unsplash.com/photo-1614064548237-096537d0224d?q=80&w=600&h=400&fit=crop',
    dataAiHint: 'digital security',
    rating: 4.8,
    reviews: [],
  },
  {
    slug: 'gravity-forms',
    name: 'Gravity Forms',
    category: 'Wordpress',
    description: 'Tvorba pokročilých formulárov, ankiet a kvízov.',
    longDescription: 'Gravity Forms je najdôveryhodnejší nástroj na tvorbu formulárov pre WordPress. Vytvárajte komplexné formuláre s podmienenou logikou, nahrávaním súborov a integráciami s desiatkami služieb.',
    price: '$59/year',
    imageUrl: 'https://images.unsplash.com/photo-1586769852836-bc069f19e1b6?q=80&w=600&h=400&fit=crop',
    dataAiHint: 'form builder',
    rating: 4.9,
    reviews: [],
  },
  {
    slug: 'learndash',
    name: 'LearnDash',
    category: 'Wordpress',
    description: 'Vytvárajte a predávajte online kurzy.',
    longDescription: 'Premeňte svoj WordPress web na plnohodnotnú vzdelávaciu platformu. LearnDash umožňuje vytvárať kurzy, spravovať študentov, udeľovať certifikáty a prijímať platby.',
    price: '$199/year',
    imageUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=600&h=400&fit=crop',
    dataAiHint: 'online learning',
    rating: 4.8,
    reviews: [],
  },
  {
    slug: 'memberpress',
    name: 'MemberPress',
    category: 'Wordpress',
    description: 'Plugin pre členské sekcie a predaj obsahu.',
    longDescription: 'MemberPress vám umožňuje vytvárať platené členské sekcie, obmedzovať prístup k obsahu a spravovať predplatné. Integruje sa s populárnymi platobnými bránami.',
    price: '$179/year',
    imageUrl: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?q=80&w=600&h=400&fit=crop',
    dataAiHint: 'membership platform',
    rating: 4.8,
    reviews: [],
  },
  {
    slug: 'updraftplus',
    name: 'UpdraftPlus',
    category: 'Wordpress',
    description: 'Spoľahlivé zálohovanie a obnova WordPress stránok.',
    longDescription: 'UpdraftPlus zjednodušuje zálohovanie a obnovu. Umožňuje automatické zálohy do cloudu (Google Drive, Dropbox) a jednoduchú obnovu jedným kliknutím.',
    price: '$70/year',
    imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=600&h=400&fit=crop',
    dataAiHint: 'cloud backup',
    rating: 4.9,
    reviews: [],
  },
  {
    slug: 'advanced-custom-fields-pro',
    name: 'Advanced Custom Fields Pro',
    category: 'Wordpress',
    description: 'Pridajte pokročilé vlastné polia do WordPressu.',
    longDescription: 'ACF Pro odomyká plný potenciál WordPressu. Umožňuje pridávať opakovateľné polia, flexibilný obsah, galerijné polia a oveľa viac do akéhokoľvek typu príspevku.',
    price: '$49/year',
    imageUrl: 'https://images.unsplash.com/photo-1517148815978-75f6acaaf32c?q=80&w=600&h=400&fit=crop',
    dataAiHint: 'custom fields',
    rating: 5.0,
    reviews: [],
  },
  {
    slug: 'woocommerce',
    name: 'WooCommerce',
    category: 'Wordpress',
    description: 'Najpopulárnejšie e-commerce riešenie pre WordPress.',
    longDescription: 'Premeňte svoj WordPress web na plne funkčný online obchod. WooCommerce je flexibilné, open-source riešenie, ktoré vám umožní predávať čokoľvek, kdekoľvek.',
    price: 'Free',
    imageUrl: 'https://images.unsplash.com/photo-1556740772-1a28a1a3e6d5?q=80&w=600&h=400&fit=crop',
    dataAiHint: 'ecommerce shopping',
    rating: 4.7,
    reviews: [],
  },
  {
    slug: 'buddypress',
    name: 'BuddyPress',
    category: 'Wordpress',
    description: 'Vytvorte si vlastnú sociálnu sieť vo WordPresse.',
    longDescription: 'BuddyPress je sada nástrojov, ktorá vám umožní vytvoriť komunitnú stránku s profilmi používateľov, skupinami, aktivitami, správami a oveľa viac.',
    price: 'Free',
    imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=600&h=400&fit=crop',
    dataAiHint: 'social network',
    rating: 4.5,
    reviews: [],
  },
  {
    slug: 'the-events-calendar',
    name: 'The Events Calendar',
    category: 'Wordpress',
    description: 'Profesionálny a ľahko použiteľný kalendár udalostí.',
    longDescription: 'Vytvárajte a spravujte udalosti s ľahkosťou. The Events Calendar je nabitý funkciami, plne prispôsobiteľný a pripravený na okamžité použitie.',
    price: 'Free',
    imageUrl: 'https://images.unsplash.com/photo-1505238680356-667803448bb6?q=80&w=600&h=400&fit=crop',
    dataAiHint: 'event calendar',
    rating: 4.6,
    reviews: [],
  },
  // Plugins (Original 4 + New 8 = 12)
  {
    slug: 'seo-optimizer-pro',
    name: 'SEO Optimizer Pro',
    category: 'Plugins',
    description: 'Zvýšte svoje pozície vo vyhľadávačoch s naším pokročilým SEO nástrojom.',
    longDescription: 'Náš SEO Optimizer Pro ponúka kompletnú sadu nástrojov vrátane výskumu kľúčových slov, analýzy spätných odkazov, on-page optimalizácie a sledovania výkonu. Ideálne pre firmy všetkých veľkostí, ktoré chcú zlepšiť svoju online viditeľnosť.',
    price: '$49',
    imageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=600&h=400&fit=crop',
    dataAiHint: 'chart graph',
    rating: 4.5,
    reviews: [],
  },
  {
    slug: 'socialconnect',
    name: 'SocialConnect',
    category: 'Plugins',
    description: 'Automatizujte svoje príspevky na sociálnych sieťach a rozšírte svoje publikum.',
    longDescription: 'So SocialConnect môžete plánovať príspevky na viacerých platformách, sledovať zapojenie a analyzovať svoj výkon na sociálnych sieťach. Ušetrite čas a efektívne rozširujte svoju online prítomnosť.',
    price: '$29',
    imageUrl: 'https://images.unsplash.com/photo-1611162617213-6d22e4f13374?q=80&w=600&h=400&fit=crop',
    dataAiHint: 'social network',
    rating: 4.0,
    reviews: [],
  },
  {
    slug: 'codeguardian',
    name: 'CodeGuardian',
    category: 'Plugins',
    description: 'Chráňte svoju webovú stránku pred malware a bezpečnostnými hrozbami.',
    longDescription: 'CodeGuardian ponúka detekciu hrozieb v reálnom čase, skenovanie malware a výkonný firewall na ochranu vašej aplikácie. Získajte pokoj v duši s 24/7 bezpečnostným monitorovaním.',
    price: '$59',
    imageUrl: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=600&h=400&fit=crop',
    dataAiHint: 'security shield',
    rating: 5.0,
    reviews: [],
  },
  {
    slug: 'forminator-pro',
    name: 'Forminator Pro',
    category: 'Plugins',
    description: 'Ľahko použiteľný tvorca formulárov, ankiet a kvízov.',
    longDescription: 'Forminator Pro presahuje bežné kontaktné formuláre. Umožňuje vytvárať interaktívne ankety, zábavné kvízy, prijímať platby a integrovať sa s tisíckami aplikácií.',
    price: '$60/year',
    imageUrl: 'https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?q=80&w=600&h=400&fit=crop',
    dataAiHint: 'contact form',
    rating: 4.7,
    reviews: [],
  },
  {
    slug: 'smush-pro',
    name: 'Smush Pro',
    category: 'Plugins',
    description: 'Optimalizácia a kompresia obrázkov bez straty kvality.',
    longDescription: 'Smush Pro zrýchli váš web kompresiou obrázkov. Ponúka hromadnú optimalizáciu, konverziu na WebP, a odložené načítavanie (lazy load) pre všetky obrázky na vašom webe.',
    price: '$60/year',
    imageUrl: 'https://images.unsplash.com/photo-1549492423-400259a5e5a4?q=80&w=600&h=400&fit=crop',
    dataAiHint: 'image optimization',
    rating: 4.8,
    reviews: [],
  },
  {
    slug: 'affiliatewp',
    name: 'AffiliateWP',
    category: 'Plugins',
    description: 'Najlepší affiliate marketing plugin pre WordPress.',
    longDescription: 'Vytvorte si vlastný affiliate program a zvýšte svoje tržby. AffiliateWP ponúka presné sledovanie, správu partnerov, kreatívne materiály a integrácie s e-commerce pluginmi.',
    price: '$149/year',
    imageUrl: 'https://images.unsplash.com/photo-1556155092-490a1ba16284?q=80&w=600&h=400&fit=crop',
    dataAiHint: 'affiliate marketing',
    rating: 4.9,
    reviews: [],
  },
  {
    slug: 'searchwp',
    name: 'SearchWP',
    category: 'Plugins',
    description: 'Vylepšite predvolené vyhľadávanie WordPressu.',
    longDescription: 'SearchWP poskytuje relevantnejšie výsledky vyhľadávania. Indexuje všetok obsah vrátane vlastných polí, PDF dokumentov a produktov, čo umožňuje používateľom nájsť presne to, čo hľadajú.',
    price: '$99/year',
    imageUrl: 'https://images.unsplash.com/photo-1569034947981-141e6951b34d?q=80&w=600&h=400&fit=crop',
    dataAiHint: 'search icon',
    rating: 4.8,
    reviews: [],
  },
  {
    slug: 'intercom-messenger',
    name: 'Intercom Messenger',
    category: 'Plugins',
    description: 'Zákaznícka podpora a live chat pre váš web.',
    longDescription: 'Intercom vám pomôže budovať vzťahy so zákazníkmi cez live chat, e-mail a automatizované správy. Ponúka tiež znalostnú databázu a integrovanú pomoc.',
    price: 'From $74/month',
    imageUrl: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=600&h=400&fit=crop',
    dataAiHint: 'customer support',
    rating: 4.7,
    reviews: [],
  },
  {
    slug: 'optinmonster',
    name: 'OptinMonster',
    category: 'Plugins',
    description: 'Generovanie leadov a konverzná optimalizácia.',
    longDescription: 'OptinMonster vám pomôže premeniť návštevníkov na odberateľov a zákazníkov. Vytvárajte vyskakovacie okná, formuláre a ďalšie kampane s pokročilým cielením.',
    price: '$9/month',
    imageUrl: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=600&h=400&fit=crop',
    dataAiHint: 'lead generation',
    rating: 4.6,
    reviews: [],
  },
  {
    slug: 'stripe-payments',
    name: 'Stripe Payments',
    category: 'Plugins',
    description: 'Jednoduchá integrácia platieb cez Stripe.',
    longDescription: 'Prijímajte platby kreditnými kartami priamo na vašom webe pomocou jednoduchej a bezpečnej integrácie so Stripe. Ideálne pre predaj produktov, služieb alebo prijímanie darov.',
    price: 'Free (transaction fees apply)',
    imageUrl: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=600&h=400&fit=crop',
    dataAiHint: 'online payment',
    rating: 4.8,
    reviews: [],
  },
  {
    slug: 'pushengage',
    name: 'PushEngage',
    category: 'Plugins',
    description: 'Push notifikácie pre webové prehliadače.',
    longDescription: 'Znovu oslovte návštevníkov, aj keď nie sú na vašej stránke. PushEngage umožňuje posielať cielené push notifikácie na desktop a mobilné zariadenia.',
    price: 'Free plan available',
    imageUrl: 'https://images.unsplash.com/photo-1588681664899-f142ff2dc3b1?q=80&w=600&h=400&fit=crop',
    dataAiHint: 'push notification',
    rating: 4.7,
    reviews: [],
  },
  // Downloads (Original 4 + New 8 = 12)
  {
    slug: 'ultimate-icon-pack',
    name: 'Ultimate Icon Pack',
    category: 'Downloads',
    description: 'Balíček s viac ako 5000 prémiovými ikonami pre vaše projekty.',
    longDescription: 'Získajte prístup ku komplexnej knižnici profesionálne navrhnutých ikon v rôznych štýloch (line, solid, color). Vhodné pre web, mobilné aplikácie a prezentácie. Formáty SVG, PNG, a FIG.',
    price: '$35',
    imageUrl: 'https://images.unsplash.com/photo-1557090495-240543c78869?q=80&w=600&h=400&fit=crop',
    dataAiHint: 'icon set',
    rating: 4.8,
    reviews: [],
  },
  {
    slug: 'modern-font-bundle',
    name: 'Modern Font Bundle',
    category: 'Downloads',
    description: 'Kolekcia 20 elegantných a moderných fontov pre dizajnérov.',
    longDescription: 'Vylepšite svoju typografiu s touto exkluzívnou kolekciou písiem. Balíček obsahuje serifové, sans-serifové a skriptové fonty, ideálne pre branding, logá a marketingové materiály.',
    price: '$25',
    imageUrl: 'https://images.unsplash.com/photo-1509343256512-d77a5cb3791b?q=80&w=600&h=400&fit=crop',
    dataAiHint: 'typography design',
    rating: 4.9,
    reviews: [],
  },
  {
    slug: 'ui-kit-dashboards',
    name: 'Dashboard UI Kit',
    category: 'Downloads',
    description: 'Zrýchlite svoj dizajnérsky proces s týmto UI kitom pre dashboardy.',
    longDescription: 'Tento UI kit pre Figmu a Sketch obsahuje stovky komponentov, grafov, tabuliek a predpripravených obrazoviek na navrhovanie krásnych a funkčných analytických dashboardov.',
    price: '$69',
    imageUrl: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=600&h=400&fit=crop',
    dataAiHint: 'ui design',
    rating: 4.7,
    reviews: [],
  },
  {
    slug: 'sound-effects-pro',
    name: 'Sound Effects Pro',
    category: 'Downloads',
    description: 'Knižnica profesionálnych zvukových efektov pre videá a hry.',
    longDescription: 'Viac ako 1000 vysokokvalitných zvukových efektov, od zvukov prírody až po futuristické sci-fi efekty. Všetky súbory sú vo formáte WAV a pripravené na okamžité použitie.',
    price: '$49',
    imageUrl: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=600&h=400&fit=crop',
    dataAiHint: 'sound mixing',
    rating: 4.6,
    reviews: [],
  },
  {
    slug: 'website-template-pack',
    name: 'Website Template Pack',
    category: 'Downloads',
    description: '10 responzívnych HTML5/CSS3 šablón pre rôzne účely.',
    longDescription: 'Štartovací balíček pre webových vývojárov. Obsahuje 10 moderných a plne responzívnych šablón pre portfóliá, firemné stránky, blogy a e-shopy. Čistý a dobre komentovaný kód.',
    price: '$29',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&h=400&fit=crop',
    dataAiHint: 'website templates',
    rating: 4.7,
    reviews: [],
  },
  {
    slug: 'mockup-creator-kit',
    name: 'Mockup Creator Kit',
    category: 'Downloads',
    description: 'Vytvárajte realistické mockupy pre svoje produkty.',
    longDescription: 'Sada Photoshop (PSD) súborov na jednoduchú tvorbu mockupov. Prezentujte svoje dizajny na obrazovkách notebookov, telefónov, na vizitkách alebo plagátoch. Jednoduché použitie vďaka smart objektom.',
    price: '$22',
    imageUrl: 'https://images.unsplash.com/photo-1541462608143-67571c6738dd?q=80&w=600&h=400&fit=crop',
    dataAiHint: 'device mockups',
    rating: 4.8,
    reviews: [],
  },
  {
    slug: 'video-luts-pack',
    name: 'Cinematic Video LUTs Pack',
    category: 'Downloads',
    description: 'Balíček filmových farebných profilov (LUTs) pre video.',
    longDescription: 'Dodajte svojim videám profesionálny filmový vzhľad. Tento balíček obsahuje viac ako 50 LUTs (Look Up Tables) inšpirovaných hollywoodskymi filmami. Kompatibilné s Adobe Premiere, Final Cut Pro, DaVinci Resolve a ďalšími.',
    price: '$19',
    imageUrl: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=600&h=400&fit=crop',
    dataAiHint: 'color grading',
    rating: 4.9,
    reviews: [],
  },
  {
    slug: 'presentation-templates',
    name: 'Keynote & PowerPoint Templates',
    category: 'Downloads',
    description: 'Moderné šablóny pre profesionálne prezentácie.',
    longDescription: 'Vytvárajte pôsobivé prezentácie s touto sadou 10 šablón pre Keynote a PowerPoint. Každá šablóna obsahuje viac ako 50 unikátnych slajdov s infografikami, grafmi a mapami.',
    price: '$25',
    imageUrl: 'https://images.unsplash.com/photo-1543286386-713bdd548da4?q=80&w=600&h=400&fit=crop',
    dataAiHint: 'presentation slides',
    rating: 4.6,
    reviews: [],
  },
  {
    slug: '4k-stock-video-bundle',
    name: '4K Stock Video Bundle',
    category: 'Downloads',
    description: 'Balík viac ako 100 prémiových 4K videí.',
    longDescription: 'Obohaťte svoje projekty o vysokokvalitné 4K videá. Tento balík obsahuje zábery prírody, technológií, miest a ľudí, ideálne pre marketingové videá, webové stránky a prezentácie.',
    price: '$79',
    imageUrl: 'https://images.unsplash.com/photo-1497864149936-d3163f0c0f4b?q=80&w=600&h=400&fit=crop',
    dataAiHint: 'video camera',
    rating: 4.8,
    reviews: [],
  },
  {
    slug: 'social-media-templates',
    name: 'Social Media Templates (Canva)',
    category: 'Downloads',
    description: '200+ prispôsobiteľných šablón pre sociálne siete.',
    longDescription: 'Ušetrite čas a vytvorte si profesionálnu prítomnosť na sociálnych sieťach. Tento balík obsahuje šablóny pre Instagram príspevky, príbehy, Facebook a Pinterest, plne editovateľné v Canve.',
    price: '$29',
    imageUrl: 'https://images.unsplash.com/photo-1611262588024-d12430b98920?q=80&w=600&h=400&fit=crop',
    dataAiHint: 'social media',
    rating: 4.9,
    reviews: [],
  },
  {
    slug: 'resume-template-pack',
    name: 'Professional Resume CV Pack',
    category: 'Downloads',
    description: 'Moderné a profesionálne šablóny životopisov.',
    longDescription: 'Získajte svoju vysnívanú prácu s týmto balíkom šablón životopisov pre Word, Pages a Photoshop. Obsahuje viacero dizajnov, ktoré vám pomôžu vyniknúť.',
    price: '$15',
    imageUrl: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=600&h=400&fit=crop',
    dataAiHint: 'resume cv',
    rating: 4.7,
    reviews: [],
  },
  {
    slug: 'lightroom-presets-mobile',
    name: 'Mobile Lightroom Presets',
    category: 'Downloads',
    description: 'Upravujte fotky ako profesionál jedným kliknutím.',
    longDescription: 'Kolekcia viac ako 50 presetov pre mobilnú aplikáciu Adobe Lightroom. Dodajte svojim fotkám konzistentný a profesionálny vzhľad, ideálne pre influencerov a fotografov.',
    price: '$19',
    imageUrl: 'https://images.unsplash.com/photo-1596701062944-a7453d08593a?q=80&w=600&h=400&fit=crop',
    dataAiHint: 'photo presets',
    rating: 4.8,
    reviews: [],
  },
  // Windows (Original 4 + New 8 = 12)
  {
    slug: 'system-mechanic',
    name: 'System Mechanic',
    category: 'Windows',
    description: 'Optimalizujte a zrýchlite svoj počítač s Windowsom.',
    longDescription: 'System Mechanic čistí nepotrebné súbory, opravuje problémy s registrom, defragmentuje disky a optimalizuje nastavenia pre maximálny výkon a stabilitu vášho systému.',
    price: '$39.95',
    imageUrl: 'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?q=80&w=600&h=400&fit=crop',
    dataAiHint: 'laptop working',
    rating: 4.5,
    reviews: [],
  },
  {
    slug: 'advanced-systemcare',
    name: 'Advanced SystemCare',
    category: 'Windows',
    description: 'Komplexná starostlivosť o PC s AI režimom.',
    longDescription: 'Advanced SystemCare je all-in-one nástroj na optimalizáciu PC. Ponúka hĺbkové čistenie, ochranu súkromia, zrýchlenie internetu a monitorovanie výkonu v reálnom čase.',
    price: '$19.99',
    imageUrl: 'https://images.unsplash.com/photo-1542744095-291d1f67b221?q=80&w=600&h=400&fit=crop',
    dataAiHint: 'computer setup',
    rating: 4.4,
    reviews: [],
  },
  {
    slug: 'acronis-cyber-protect',
    name: 'Acronis Cyber Protect',
    category: 'Windows',
    description: 'Zálohovanie a anti-malware ochrana v jednom.',
    longDescription: 'Chráňte svoje dáta pred stratou a kybernetickými útokmi. Acronis kombinuje spoľahlivé zálohovanie celého systému s pokročilou anti-malware technológiou poháňanou AI.',
    price: '$59.99/year',
    imageUrl: 'https://images.unsplash.com/photo-1526374965328-5f61d4dc18c5?q=80&w=600&h=400&fit=crop',
    dataAiHint: 'cyber security',
    rating: 4.8,
    reviews: [],
  },
  {
    slug: 'coreldraw-suite',
    name: 'CorelDRAW Graphics Suite',
    category: 'Windows',
    description: 'Profesionálny softvér pre vektorovú grafiku a DTP.',
    longDescription: 'CorelDRAW Graphics Suite je plne vybavený nástroj pre grafických dizajnérov. Vytvárajte logá, ilustrácie, marketingové materiály a komplexné layouty s precíznymi nástrojmi.',
    price: '$249',
    imageUrl: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=600&h=400&fit=crop',
    dataAiHint: 'graphic design',
    rating: 4.7,
    reviews: [],
  },
  {
    slug: 'malwarebytes-premium',
    name: 'Malwarebytes Premium',
    category: 'Windows',
    description: 'Ochrana pred malware, ransomware a ďalšími hrozbami.',
    longDescription: 'Malwarebytes Premium poskytuje ochranu v reálnom čase pred pokročilými hrozbami. Blokuje podvodné stránky, chráni pred ransomware a odstraňuje adware a spyware, ktoré spomaľujú váš počítač.',
    price: '$39.99/year',
    imageUrl: 'https://images.unsplash.com/photo-1618060932014-4deda4932554?q=80&w=600&h=400&fit=crop',
    dataAiHint: 'digital threat',
    rating: 4.8,
    reviews: [],
  },
  {
    slug: 'displayfusion',
    name: 'DisplayFusion',
    category: 'Windows',
    description: 'Spravujte svoj multi-monitorový setup s ľahkosťou.',
    longDescription: 'DisplayFusion uľahčuje prácu s viacerými monitormi. Ponúka pokročilú správu tapiet, prispôsobiteľný taskbar na každom monitore a klávesové skratky na presúvanie okien.',
    price: '$29',
    imageUrl: 'https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?q=80&w=600&h=400&fit=crop',
    dataAiHint: 'multiple monitors',
    rating: 4.9,
    reviews: [],
  },
  {
    slug: 'vegas-pro',
    name: 'VEGAS Pro',
    category: 'Windows',
    description: 'Profesionálny nelineárny video editor s pokročilými funkciami.',
    longDescription: 'VEGAS Pro je výkonný nástroj pre strih videa, kompozíciu, farebné korekcie a authoring. Podporuje 8K rozlíšenie, HDR a ponúka stovky efektov a prechodov.',
    price: '$199',
    imageUrl: 'https://images.unsplash.com/photo-1606214174585-fe31582dc6ee?q=80&w=600&h=400&fit=crop',
    dataAiHint: 'video production',
    rating: 4.6,
    reviews: [],
  },
  {
    slug: 'startallback',
    name: 'StartAllBack',
    category: 'Windows',
    description: 'Vráťte klasické menu Štart do Windows 11.',
    longDescription: 'Nepáči sa vám nové menu Štart vo Windows 11? StartAllBack vám umožní obnoviť klasický vzhľad a funkčnosť menu Štart, taskbaru a prieskumníka z Windows 7 a 10.',
    price: '$4.99',
    imageUrl: 'https://images.unsplash.com/photo-1624823296803-34b8c046a362?q=80&w=600&h=400&fit=crop',
    dataAiHint: 'windows logo',
    rating: 4.9,
    reviews: [],
  },
  {
    slug: 'driver-booster',
    name: 'Driver Booster',
    category: 'Windows',
    description: 'Automatická aktualizácia ovládačov pre lepší výkon.',
    longDescription: 'Driver Booster skenuje váš systém a nájde zastarané alebo chybné ovládače. Jedným kliknutím ich aktualizuje, čím zabezpečí stabilitu systému a lepší výkon hardvéru.',
    price: '$22.95/year',
    imageUrl: 'https://images.unsplash.com/photo-1591799264318-7e6e74e3cce2?q=80&w=600&h=400&fit=crop',
    dataAiHint: 'computer hardware',
    rating: 4.6,
    reviews: [],
  },
  {
    slug: 'ccleaner-professional',
    name: 'CCleaner Professional',
    category: 'Windows',
    description: 'Čistite a optimalizujte svoj PC ako profesionál.',
    longDescription: 'CCleaner odstraňuje nepotrebné súbory z vášho systému, čistí registre a chráni vaše súkromie. Profesionálna verzia pridáva monitorovanie v reálnom čase a automatické aktualizácie.',
    price: '$29.95',
    imageUrl: 'https://images.unsplash.com/photo-1544198365-f5d60b6d8190?q=80&w=600&h=400&fit=crop',
    dataAiHint: 'system cleaning',
    rating: 4.7,
    reviews: [],
  },
  {
    slug: 'paint-net',
    name: 'Paint.NET',
    category: 'Windows',
    description: 'Bezplatný editor obrázkov a fotografií.',
    longDescription: 'Paint.NET je intuitívny a výkonný editor obrázkov. Podporuje vrstvy, neobmedzené undo, špeciálne efekty a širokú škálu užitočných a výkonných nástrojov.',
    price: 'Free',
    imageUrl: 'https://images.unsplash.com/photo-1562919838-c6ac454df714?q=80&w=600&h=400&fit=crop',
    dataAiHint: 'digital art',
    rating: 4.5,
    reviews: [],
  },
  {
    slug: 'obs-studio',
    name: 'OBS Studio',
    category: 'Windows',
    description: 'Softvér na nahrávanie a streamovanie videa.',
    longDescription: 'OBS Studio je bezplatný a open-source softvér pre video nahrávanie a live streaming. Vytvárajte scény z viacerých zdrojov vrátane okien, obrázkov, textu, webových kamier a ďalších.',
    price: 'Free',
    imageUrl: 'https://images.unsplash.com/photo-1593348530479-79a6132a7620?q=80&w=600&h=400&fit=crop',
    dataAiHint: 'video streaming',
    rating: 4.9,
    reviews: [],
  },
  // Linux (Original 4 + New 8 = 12)
  {
    slug: 'sublime-text',
    name: 'Sublime Text',
    category: 'Linux',
    description: 'Sofistikovaný textový editor pre kód, značky a prózu.',
    longDescription: 'Sublime Text je rýchly a funkciami nabitý editor kódu s elegantným rozhraním, pokročilými funkciami a úžasným výkonom. Podporuje stovky programovacích jazykov a je vysoko prispôsobiteľný.',
    price: '$99',
    imageUrl: 'https://images.unsplash.com/photo-1522252234503-e356532cafd5?q=80&w=600&h=400&fit=crop',
    dataAiHint: 'code editor',
    rating: 4.9,
    reviews: [],
  },
  {
    slug: 'gimp',
    name: 'GIMP',
    category: 'Linux',
    description: 'Bezplatný a open-source editor obrázkov.',
    longDescription: 'GIMP (GNU Image Manipulation Program) je výkonná alternatíva k Adobe Photoshop. Ponúka širokú škálu nástrojov na úpravu fotografií, retušovanie, kompozíciu a tvorbu grafiky.',
    price: 'Free',
    imageUrl: 'https://images.unsplash.com/photo-1596484552834-6a84f378a6a6?q=80&w=600&h=400&fit=crop',
    dataAiHint: 'photo editing',
    rating: 4.6,
    reviews: [],
  },
  {
    slug: 'kdenlive',
    name: 'Kdenlive',
    category: 'Linux',
    description: 'Výkonný nelineárny video editor pre Linux.',
    longDescription: 'Kdenlive je open-source softvér na strih videa. Podporuje viacstopové úpravy, širokú škálu audio a video formátov, a ponúka množstvo efektov, prechodov a nástrojov na úpravu farieb.',
    price: 'Free',
    imageUrl: 'https://images.unsplash.com/photo-1617802690992-15d93263d3a9?q=80&w=600&h=400&fit=crop',
    dataAiHint: 'video editing',
    rating: 4.5,
    reviews: [],
  },
  {
    slug: 'bitwig-studio',
    name: 'Bitwig Studio',
    category: 'Linux',
    description: 'Moderná digitálna audio pracovná stanica (DAW).',
    longDescription: 'Bitwig Studio je inovatívny nástroj pre hudobnú produkciu, nahrávanie a živé vystúpenia. Ponúka unikátne modulačné možnosti, hybridné stopy a rýchly pracovný tok.',
    price: '$399',
    imageUrl: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?q=80&w=600&h=400&fit=crop',
    dataAiHint: 'music production',
    rating: 4.8,
    reviews: [],
  },
  {
    slug: 'vscode',
    name: 'Visual Studio Code',
    category: 'Linux',
    description: 'Populárny editor kódu od Microsoftu, dostupný pre Linux.',
    longDescription: 'Visual Studio Code je bezplatný, open-source editor kódu, ktorý podporuje tisíce rozšírení. Ponúka integrovaný terminál, debugger, a Git integráciu. Je rýchly, výkonný a vysoko prispôsobiteľný.',
    price: 'Free',
    imageUrl: 'https://images.unsplash.com/photo-1605379399642-870262d3d051?q=80&w=600&h=400&fit=crop',
    dataAiHint: 'programming code',
    rating: 5.0,
    reviews: [],
  },
  {
    slug: 'blender',
    name: 'Blender',
    category: 'Linux',
    description: 'Open-source softvér pre 3D grafiku a animáciu.',
    longDescription: 'Blender je kompletný nástroj na tvorbu 3D grafiky. Umožňuje modelovanie, sculpting, animáciu, simulácie, rendering, kompozíciu a strih videa. Používa sa pri tvorbe filmov, vizuálnych efektov a hier.',
    price: 'Free',
    imageUrl: 'https://images.unsplash.com/photo-1598965899264-7904111c3444?q=80&w=600&h=400&fit=crop',
    dataAiHint: '3d modeling',
    rating: 4.9,
    reviews: [],
  },
  {
    slug: 'timeshift',
    name: 'Timeshift',
    category: 'Linux',
    description: 'Zálohovací nástroj pre systém, podobný Time Machine.',
    longDescription: 'Timeshift chráni váš systém vytváraním inkrementálnych snímok súborového systému. Tieto snímky je možné použiť na obnovu systému do predchádzajúceho stavu v prípade chyby alebo neúspešnej aktualizácie.',
    price: 'Free',
    imageUrl: 'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?q=80&w=600&h=400&fit=crop',
    dataAiHint: 'data recovery',
    rating: 4.8,
    reviews: [],
  },
  {
    slug: 'krita',
    name: 'Krita',
    category: 'Linux',
    description: 'Profesionálny open-source program na digitálnu maľbu.',
    longDescription: 'Krita je navrhnutá pre umelcov, ilustrátorov a concept artistov. Ponúka širokú škálu štetcov, stabilizátor pre hladké ťahy, správu vrstiev a podporu pre CMYK.',
    price: 'Free',
    imageUrl: 'https://images.unsplash.com/photo-1581292159785-520336618567?q=80&w=600&h=400&fit=crop',
    dataAiHint: 'digital painting',
    rating: 4.7,
    reviews: [],
  },
  {
    slug: 'inkscape',
    name: 'Inkscape',
    category: 'Linux',
    description: 'Výkonný a bezplatný editor vektorovej grafiky.',
    longDescription: 'Inkscape je profesionálny nástroj na tvorbu vektorovej grafiky pre Linux, Windows a macOS. Je to open-source alternatíva k Adobe Illustrator.',
    price: 'Free',
    imageUrl: 'https://images.unsplash.com/photo-1629721610476-a9a218a53164?q=80&w=600&h=400&fit=crop',
    dataAiHint: 'vector art',
    rating: 4.6,
    reviews: [],
  },
  {
    slug: 'audacity',
    name: 'Audacity',
    category: 'Linux',
    description: 'Bezplatný, open-source, multiplatformový audio editor.',
    longDescription: 'Audacity je ľahko použiteľný audio editor a nahrávač. Môžete ho použiť na nahrávanie živého zvuku, konverziu pások a nahrávok, úpravu zvukových súborov, a oveľa viac.',
    price: 'Free',
    imageUrl: 'https://images.unsplash.com/photo-1589903308904-1010c2294c65?q=80&w=600&h=400&fit=crop',
    dataAiHint: 'audio waves',
    rating: 4.7,
    reviews: [],
  },
  {
    slug: 'virtualbox',
    name: 'VirtualBox',
    category: 'Linux',
    description: 'Výkonný virtualizačný produkt pre podnikové aj domáce použitie.',
    longDescription: 'VirtualBox je bezplatný softvér, ktorý umožňuje spúšťať viacero operačných systémov na jednom počítači. Ideálny pre vývojárov a testerov.',
    price: 'Free',
    imageUrl: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=600&h=400&fit=crop',
    dataAiHint: 'virtual server',
    rating: 4.8,
    reviews: [],
  },
  {
    slug: 'neofetch',
    name: 'Neofetch',
    category: 'Linux',
    description: 'Príkazový riadok na zobrazenie informácií o systéme.',
    longDescription: 'Neofetch je nástroj príkazového riadku, ktorý zobrazuje informácie o vašom systéme vedľa loga vašej distribúcie. Je rýchly, ľahko použiteľný a vysoko prispôsobiteľný.',
    price: 'Free',
    imageUrl: 'https://images.unsplash.com/photo-1510915228340-29c85a43dcfe?q=80&w=600&h=400&fit=crop',
    dataAiHint: 'command line',
    rating: 4.9,
    reviews: [],
  },
  // macOS (Original 4 + New 8 = 12)
  {
    slug: 'sketch',
    name: 'Sketch',
    category: 'macOS',
    description: 'Platforma pre digitálny dizajn pre macOS.',
    longDescription: 'Sketch je vektorový editor pre UI a UX dizajnérov. Ponúka intuitívne nástroje, prácu so symbolmi, knižnicami a jednoduchý export. Ideálny pre tvorbu webových a mobilných rozhraní.',
    price: '$120/year',
    imageUrl: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=600&h=400&fit=crop',
    dataAiHint: 'design tools',
    rating: 4.8,
    reviews: [],
  },
  {
    slug: 'final-cut-pro',
    name: 'Final Cut Pro',
    category: 'macOS',
    description: 'Profesionálny video editor pre Mac.',
    longDescription: 'Final Cut Pro kombinuje revolučné úpravy videa s výkonnou správou médií a neuveriteľným výkonom. Magnetická časová os, podpora 360° videa a pokročilé nástroje na úpravu farieb.',
    price: '$299',
    imageUrl: 'https://images.unsplash.com/photo-1529103040254-257a3537c445?q=80&w=600&h=400&fit=crop',
    dataAiHint: 'film editing',
    rating: 4.9,
    reviews: [],
  },
  {
    slug: 'alfred-5',
    name: 'Alfred 5',
    category: 'macOS',
    description: 'Zvýšte svoju produktivitu s touto klávesnicovou aplikáciou.',
    longDescription: 'Alfred je oveľa viac ako len spúšťač aplikácií. Umožňuje vyhľadávať súbory, spúšťať príkazy, spravovať schránku, vytvárať vlastné pracovné postupy a ovládať hudbu.',
    price: '£34',
    imageUrl: 'https://images.unsplash.com/photo-1504207920153-9d1003923c22?q=80&w=600&h=400&fit=crop',
    dataAiHint: 'productivity tools',
    rating: 5.0,
    reviews: [],
  },
  {
    slug: 'cleanmymac-x',
    name: 'CleanMyMac X',
    category: 'macOS',
    description: 'Udržujte svoj Mac čistý, rýchly a chránený.',
    longDescription: 'CleanMyMac X je sada nástrojov na optimalizáciu vášho Macu. Odstraňuje gigabajty nepotrebných súborov, chráni pred malware a zrýchľuje systém jedným kliknutím.',
    price: '$39.95/year',
    imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=600&h=400&fit=crop',
    dataAiHint: 'macbook computer',
    rating: 4.7,
    reviews: [],
  },
  {
    slug: 'affinity-designer',
    name: 'Affinity Designer 2',
    category: 'macOS',
    description: 'Profesionálny softvér pre vektorovú a rastrovú grafiku.',
    longDescription: 'Affinity Designer je serióznou alternatívou k Adobe Illustrator. Ponúka bleskovú rýchlosť, presné vektorové nástroje, pokročilú správu vrstiev a možnosť prepínať medzi vektorovým a rastrovým prostredím.',
    price: '$69.99',
    imageUrl: 'https://images.unsplash.com/photo-1522199755839-a2bacb67c546?q=80&w=600&h=400&fit=crop',
    dataAiHint: 'vector illustration',
    rating: 4.9,
    reviews: [],
  },
  {
    slug: 'bear-notes',
    name: 'Bear',
    category: 'macOS',
    description: 'Elegantná aplikácia na písanie poznámok a prózy.',
    longDescription: 'Bear je krásna a flexibilná aplikácia na písanie pre Mac, iPad a iPhone. Podporuje Markdown, organizáciu pomocou tagov a ponúka rôzne témy na prispôsobenie. Ideálna pre poznámky, články alebo úryvky kódu.',
    price: '$1.49/month',
    imageUrl: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=600&h=400&fit=crop',
    dataAiHint: 'note taking',
    rating: 4.8,
    reviews: [],
  },
  {
    slug: 'carbon-copy-cloner',
    name: 'Carbon Copy Cloner 6',
    category: 'macOS',
    description: 'Pokročilý nástroj na zálohovanie a klonovanie diskov.',
    longDescription: 'Carbon Copy Cloner (CCC) vytvára bootovateľné zálohy vášho Macu. Umožňuje naplánovať zálohovacie úlohy, zálohovať na externé disky alebo sieťové úložiská a rýchlo obnoviť systém po zlyhaní disku.',
    price: '$49.99',
    imageUrl: 'https://images.unsplash.com/photo-1616763694537-657735b54682?q=80&w=600&h=400&fit=crop',
    dataAiHint: 'data backup',
    rating: 5.0,
    reviews: [],
  },
  {
    slug: 'iterm2',
    name: 'iTerm2',
    category: 'macOS',
    description: 'Výkonný terminálový emulátor pre macOS.',
    longDescription: 'iTerm2 je náhrada za predvolený Terminál. Ponúka delenie panelov, vyhľadávanie, automatické dopĺňanie, podporu pre 24-bitové farby a obrovské možnosti prispôsobenia pre pokročilých používateľov.',
    price: 'Free',
    imageUrl: 'https://images.unsplash.com/photo-1550439062-609e1531270e?q=80&w=600&h=400&fit=crop',
    dataAiHint: 'command line',
    rating: 4.9,
    reviews: [],
  },
  {
    slug: 'pixelmator-pro',
    name: 'Pixelmator Pro',
    category: 'macOS',
    description: 'Výkonný editor obrázkov pre Mac.',
    longDescription: 'Pixelmator Pro je neuveriteľne výkonný, krásny a ľahko použiteľný editor obrázkov navrhnutý exkluzívne pre Mac. Ponúka profesionálne nástroje na úpravu fotografií, maľovanie a grafický dizajn.',
    price: '$39.99',
    imageUrl: 'https://images.unsplash.com/photo-1588265587933-2a40a5a31e84?q=80&w=600&h=400&fit=crop',
    dataAiHint: 'photo editing',
    rating: 4.8,
    reviews: [],
  },
  {
    slug: 'hazel',
    name: 'Hazel',
    category: 'macOS',
    description: 'Automatizujte si organizáciu súborov.',
    longDescription: 'Hazel sleduje vami vybrané priečinky a automaticky organizuje vaše súbory podľa vami nastavených pravidiel. Presúva, premenúva, triedi a archivuje súbory, aby ste vy nemuseli.',
    price: '$42',
    imageUrl: 'https://images.unsplash.com/photo-1587393529457-e68d54a29a2b?q=80&w=600&h=400&fit=crop',
    dataAiHint: 'file organization',
    rating: 5.0,
    reviews: [],
  },
  {
    slug: 'bartender-5',
    name: 'Bartender 5',
    category: 'macOS',
    description: 'Usporiadajte si ikony v menu bare.',
    longDescription: 'Bartender vám dáva kontrolu nad ikonami v menu bare. Môžete ich skryť, preskupiť alebo k nim pristupovať cez vlastnú lištu. Udržujte svoj menu bar čistý a organizovaný.',
    price: '$16',
    imageUrl: 'https://images.unsplash.com/photo-1628102490539-a99b452e67a4?q=80&w=600&h=400&fit=crop',
    dataAiHint: 'menu bar',
    rating: 4.9,
    reviews: [],
  },
  {
    slug: 'logic-pro',
    name: 'Logic Pro',
    category: 'macOS',
    description: 'Profesionálna hudobná produkcia pre Mac.',
    longDescription: 'Logic Pro je kompletné nahrávacie a MIDI produkčné štúdio. Ponúka obrovskú knižnicu nástrojov, efektov a slučiek, ako aj profesionálne nástroje na nahrávanie, mixovanie a mastering.',
    price: '$199.99',
    imageUrl: 'https://images.unsplash.com/photo-1598224731733-87160a37397e?q=80&w=600&h=400&fit=crop',
    dataAiHint: 'music studio',
    rating: 4.9,
    reviews: [],
  },
  // Android (Original 4 + New 8 = 12)
  {
    slug: 'nova-launcher-prime',
    name: 'Nova Launcher Prime',
    category: 'Android',
    description: 'Výkonný a prispôsobiteľný launcher pre Android.',
    longDescription: 'Nova Launcher nahrádza vašu domovskú obrazovku a prináša pokročilé možnosti prispôsobenia, gestá, podporu ikonových balíčkov a vylepšenia výkonu.',
    price: '$4.99',
    imageUrl: 'https://images.unsplash.com/photo-1628191137573-dee64412521f?q=80&w=600&h=400&fit=crop',
    dataAiHint: 'phone screen',
    rating: 4.9,
    reviews: [],
  },
  {
    slug: 'solid-explorer',
    name: 'Solid Explorer',
    category: 'Android',
    description: 'Pokročilý správca súborov s duálnym panelom.',
    longDescription: 'Solid Explorer uľahčuje správu súborov. Ponúka dva nezávislé panely, podporu cloudových úložísk, FTP, a ochranu súborov heslom alebo odtlačkom prsta.',
    price: '$2.99',
    imageUrl: 'https://images.unsplash.com/photo-1588634898337-154a4365b40f?q=80&w=600&h=400&fit=crop',
    dataAiHint: 'file storage',
    rating: 4.8,
    reviews: [],
  },
  {
    slug: 'tasker',
    name: 'Tasker',
    category: 'Android',
    description: 'Automatizujte všetko na svojom Androide.',
    longDescription: 'Tasker je aplikácia na kompletnú automatizáciu. Vytvárajte úlohy a profily na základe času, miesta, udalostí alebo stavu zariadenia. Možnosti sú takmer neobmedzené.',
    price: '$3.49',
    imageUrl: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=600&h=400&fit=crop',
    dataAiHint: 'phone automation',
    rating: 4.6,
    reviews: [],
  },
  {
    slug: 'poweramp',
    name: 'Poweramp',
    category: 'Android',
    description: 'Výkonný hudobný prehrávač pre Android.',
    longDescription: 'Poweramp ponúka vysokokvalitný zvuk, podporu pre všetky bežné formáty, 10-pásmový ekvalizér, a pokročilé možnosti prispôsobenia rozhrania.',
    price: '$5.49',
    imageUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=600&h=400&fit=crop',
    dataAiHint: 'music concert',
    rating: 4.7,
    reviews: [],
  },
  {
    slug: 'sync-for-reddit',
    name: 'Sync for Reddit',
    category: 'Android',
    description: 'Krásny a funkčný klient pre Reddit.',
    longDescription: 'Sync for Reddit ponúka rýchle a intuitívne prehliadanie Redditu. Zahŕňa prispôsobiteľné rozhranie, nočný režim, podporu viacerých účtov a pokročilé možnosti pre moderátorov.',
    price: '$4.99',
    imageUrl: 'https://images.unsplash.com/photo-1633613286848-e6f43bbaf5f9?q=80&w=600&h=400&fit=crop',
    dataAiHint: 'social media',
    rating: 4.8,
    reviews: [],
  },
  {
    slug: 'kwgt-kustom-widget',
    name: 'KWGT Kustom Widget Maker',
    category: 'Android',
    description: 'Vytvorte si vlastné widgety pre domovskú obrazovku.',
    longDescription: 'S KWGT môžete navrhnúť vlastné widgety presne podľa svojich predstáv. Zobrazujte dáta z telefónu, počasie, kalendár, fitness údaje a oveľa viac v jedinečnom dizajne.',
    price: '$5.99',
    imageUrl: 'https://images.unsplash.com/photo-1593113646773-462f94b8a48c?q=80&w=600&h=400&fit=crop',
    dataAiHint: 'custom widgets',
    rating: 4.7,
    reviews: [],
  },
  {
    slug: 'sd-maid-pro',
    name: 'SD Maid Pro',
    category: 'Android',
    description: 'Nástroj na čistenie a optimalizáciu systému.',
    longDescription: 'SD Maid Pro je komplexný nástroj na údržbu. Vyhľadáva a odstraňuje nepotrebné súbory, optimalizuje databázy, spravuje aplikácie a pomáha udržať vaše zariadenie čisté a rýchle.',
    price: '$3.89',
    imageUrl: 'https://images.unsplash.com/photo-1620714223084-86c89151ae27?q=80&w=600&h=400&fit=crop',
    dataAiHint: 'system cleaning',
    rating: 4.9,
    reviews: [],
  },
  {
    slug: 'google-opinion-rewards',
    name: 'Google Opinion Rewards',
    category: 'Android',
    description: 'Získajte kredit do Google Play za vypĺňanie ankiet.',
    longDescription: 'Odpovedajte na krátke prieskumy od Google a získajte kredit, ktorý môžete použiť na nákup aplikácií, hier a ďalšieho obsahu v obchode Google Play. Ankety sú krátke a relevantné.',
    price: 'Free',
    imageUrl: 'https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?q=80&w=600&h=400&fit=crop',
    dataAiHint: 'google play',
    rating: 4.6,
    reviews: [],
  },
  {
    slug: 'pocket-casts',
    name: 'Pocket Casts',
    category: 'Android',
    description: 'Podcast prehrávač s multiplatformovou synchronizáciou.',
    longDescription: 'Pocket Casts je výkonný podcast prehrávač s krásnym rozhraním. Ponúka synchronizáciu medzi zariadeniami, vylepšenia zvuku, a robustné nástroje na objavovanie nového obsahu.',
    price: 'Free (Plus subscription available)',
    imageUrl: 'https://images.unsplash.com/photo-1590602847834-3a6c2a4959a7?q=80&w=600&h=400&fit=crop',
    dataAiHint: 'podcast listening',
    rating: 4.7,
    reviews: [],
  },
  {
    slug: 'bitwarden',
    name: 'Bitwarden',
    category: 'Android',
    description: 'Bezpečný a open-source správca hesiel.',
    longDescription: 'Bitwarden je najjednoduchší a najbezpečnejší spôsob, ako ukladať všetky vaše heslá a citlivé informácie. Synchronizuje sa medzi všetkými vašimi zariadeniami.',
    price: 'Free (Premium available)',
    imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=600&h=400&fit=crop',
    dataAiHint: 'password security',
    rating: 4.8,
    reviews: [],
  },
  {
    slug: 'moon-reader-pro',
    name: 'Moon+ Reader Pro',
    category: 'Android',
    description: 'Výkonná čítačka elektronických kníh.',
    longDescription: 'Moon+ Reader podporuje všetky bežné formáty e-kníh. Ponúka tisíce možností prispôsobenia, štatistiky čítania, synchronizáciu pozície a podporu pre online knižnice.',
    price: '$8.99',
    imageUrl: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=600&h=400&fit=crop',
    dataAiHint: 'reading book',
    rating: 4.9,
    reviews: [],
  },
  {
    slug: 'gcam',
    name: 'GCam (Google Camera Port)',
    category: 'Android',
    description: 'Vylepšite kvalitu fotografií s algoritmami od Google.',
    longDescription: 'Portovaná verzia aplikácie Google Camera prináša pokročilé spracovanie obrazu ako HDR+ a nočný režim aj na nepodporované telefóny, čím dramaticky zlepšuje kvalitu fotografií.',
    price: 'Free',
    imageUrl: 'https://images.unsplash.com/photo-150292092-168852652b33?q=80&w=600&h=400&fit=crop',
    dataAiHint: 'phone camera',
    rating: 4.8,
    reviews: [],
  },
  // iPhone (Original 4 + New 8 = 12)
  {
    slug: 'halide-camera',
    name: 'Halide Camera',
    category: 'iPhone',
    description: 'Profesionálna fotoaplikácia pre iPhone.',
    longDescription: 'Halide odomyká plný potenciál fotoaparátu vášho iPhonu. Ponúka manuálne ovládanie expozície, zaostrenia, ISO, a snímanie do formátu ProRAW pre maximálnu flexibilitu pri úpravách.',
    price: '$11.99/year',
    imageUrl: 'https://images.unsplash.com/photo-1510127034890-ba270819e62c?q=80&w=600&h=400&fit=crop',
    dataAiHint: 'camera lens',
    rating: 4.9,
    reviews: [],
  },
  {
    slug: 'things-3',
    name: 'Things 3',
    category: 'iPhone',
    description: 'Elegantný a výkonný správca úloh.',
    longDescription: 'Things 3 vám pomôže zorganizovať si život. S krásnym dizajnom a intuitívnym ovládaním je radosť ho používať. Plánujte si deň, spravujte projekty a sústreďte sa na to, čo je dôležité.',
    price: '$9.99',
    imageUrl: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=600&h=400&fit=crop',
    dataAiHint: 'task list',
    rating: 5.0,
    reviews: [],
  },
  {
    slug: '1password',
    name: '1Password',
    category: 'iPhone',
    description: 'Správca hesiel, ktorý chráni vaše online súkromie.',
    longDescription: '1Password si pamätá všetky vaše heslá, generuje silné nové heslá a automaticky ich vypĺňa. Synchronizuje sa medzi všetkými vašimi zariadeniami pre bezpečný a pohodlný prístup.',
    price: '$35.88/year',
    imageUrl: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=600&h=400&fit=crop',
    dataAiHint: 'password security',
    rating: 4.8,
    reviews: [],
  },
  {
    slug: 'fantastical',
    name: 'Fantastical',
    category: 'iPhone',
    description: 'Kalendár a pripomienky, ako majú byť.',
    longDescription: 'Fantastical má krásne rozhranie a výkonné funkcie, vrátane prirodzeného jazykového vstupu. Stačí napísať "Obed s Evou v piatok o 13:00" a aplikácia vytvorí udalosť.',
    price: '$4.99/month',
    imageUrl: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=600&h=400&fit=crop',
    dataAiHint: 'calendar planning',
    rating: 4.7,
    reviews: [],
  },
  {
    slug: 'overcast',
    name: 'Overcast',
    category: 'iPhone',
    description: 'Jednoduchý a výkonný prehrávač podcastov.',
    longDescription: 'Overcast je oceňovaný prehrávač podcastov so zameraním na jednoduchosť a užitočné funkcie ako Smart Speed (skracuje ticho) a Voice Boost (normalizuje hlasitosť).',
    price: 'Free (with ads)',
    imageUrl: 'https://images.unsplash.com/photo-1589998059171-988d887df646?q=80&w=600&h=400&fit=crop',
    dataAiHint: 'podcast listening',
    rating: 4.8,
    reviews: [],
  },
  {
    slug: 'procreate',
    name: 'Procreate',
    category: 'iPhone',
    description: 'Výkonná aplikácia na digitálnu kresbu a maľbu.',
    longDescription: 'Procreate je štúdiom umelca v jednom. Ponúka stovky štetcov, pokročilý systém vrstiev a výkonný engine Valkyrie. Ideálne pre profesionálov aj začiatočníkov.',
    price: '$12.99',
    imageUrl: 'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?q=80&w=600&h=400&fit=crop',
    dataAiHint: 'digital art',
    rating: 5.0,
    reviews: [],
  },
  {
    slug: 'carrot-weather',
    name: 'CARROT Weather',
    category: 'iPhone',
    description: 'Predpoveď počasia s osobnosťou a sarkazmom.',
    longDescription: 'CARROT Weather ponúka presné predpovede počasia s vtipnými a sarkastickými komentármi. Aplikácia je plná skrytých funkcií, minihier a ponúka rozsiahle možnosti prispôsobenia.',
    price: '$4.99/month',
    imageUrl: 'https://images.unsplash.com/photo-1592210454359-9043f067919b?q=80&w=600&h=400&fit=crop',
    dataAiHint: 'weather forecast',
    rating: 4.8,
    reviews: [],
  },
  {
    slug: 'ulysses',
    name: 'Ulysses',
    category: 'iPhone',
    description: 'Príjemné a sústredené prostredie na písanie.',
    longDescription: 'Ulysses je textový editor pre spisovateľov, novinárov a blogerov. Ponúka nerušené prostredie, správu dokumentov, ciele písania a export do rôznych formátov ako PDF, ePub a HTML.',
    price: '$5.99/month',
    imageUrl: 'https://images.unsplash.com/photo-1456325504743-39b032cc7b6d?q=80&w=600&h=400&fit=crop',
    dataAiHint: 'writing environment',
    rating: 4.7,
    reviews: [],
  },
  {
    slug: 'apollo-for-reddit',
    name: 'Apollo for Reddit',
    category: 'iPhone',
    description: 'Rýchly a funkciami nabitý klient pre Reddit.',
    longDescription: 'Apollo je navrhnutý od základov pre iOS. Ponúka rýchle a intuitívne ovládanie gestami, prispôsobiteľný vzhľad a výkonné funkcie pre náročných používateľov Redditu.',
    price: 'Free (Pro available)',
    imageUrl: 'https://images.unsplash.com/photo-1634575386981-a63d765b1b4?q=80&w=600&h=400&fit=crop',
    dataAiHint: 'social browsing',
    rating: 4.9,
    reviews: [],
  },
  {
    slug: 'goodnotes-6',
    name: 'Goodnotes 6',
    category: 'iPhone',
    description: 'Digitálny zápisník s podporou Apple Pencil.',
    longDescription: 'Premeňte svoj iPad a iPhone na digitálny papier. Goodnotes umožňuje ručne písané poznámky, kreslenie, anotáciu PDF dokumentov a organizáciu zápisníkov.',
    price: '$9.99/year',
    imageUrl: 'https://images.unsplash.com/photo-1516383607758-2ac4ce135795?q=80&w=600&h=400&fit=crop',
    dataAiHint: 'digital notebook',
    rating: 4.8,
    reviews: [],
  },
  {
    slug: 'lumafusion',
    name: 'LumaFusion',
    category: 'iPhone',
    description: 'Profesionálny multitrack video editor.',
    longDescription: 'LumaFusion je najvýkonnejší video editor pre mobilné zariadenia. Ponúka viacero video a audio stôp, pokročilé farebné korekcie, efekty a export v profesionálnej kvalite.',
    price: '$29.99',
    imageUrl: 'https://images.unsplash.com/photo-1579406456426-c2a7a8d3c114?q=80&w=600&h=400&fit=crop',
    dataAiHint: 'video editing',
    rating: 4.8,
    reviews: [],
  },
  {
    slug: 'shortcuts',
    name: 'Shortcuts',
    category: 'iPhone',
    description: 'Automatizujte si úlohy na vašich Apple zariadeniach.',
    longDescription: 'Vytvorte si vlastné skratky pre vaše obľúbené aplikácie. Spustite sériu akcií jediným klepnutím alebo pomocou Siri. Integruje sa s mnohými aplikáciami.',
    price: 'Free',
    imageUrl: 'https://images.unsplash.com/photo-1621873495932-880c4b288c3a?q=80&w=600&h=400&fit=crop',
    dataAiHint: 'automation flow',
    rating: 4.7,
    reviews: [],
  },
];

export function getPluginCategories() {
    return categories;
}

export const StarRating = ({ rating, className }: { rating: number; className?: string }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className={`flex items-center ${className}`}>
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
      ))}
      {halfStar && <StarHalf className="w-5 h-5 fill-yellow-400 text-yellow-400" />}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`empty-${i}`} className="w-5 h-5 text-gray-300" />
      ))}
    </div>
  );
};


export function PluginList() {
  const searchParams = useSearchParams();
  const category = searchParams.get('category');
  
  const [searchQuery, setSearchQuery] = React.useState('');
  const { addToCart } = useCart();
  const { toast } = useToast();
  
  const filteredPlugins = plugins.filter(plugin => {
    const matchesCategory = !category || plugin.category === category;
    const matchesSearch = plugin.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddToCart = (plugin: Plugin) => {
    addToCart(plugin);
    toast({
      title: "Pridané do košíka",
      description: `${plugin.name} bol pridaný do vášho košíka.`,
    })
  };

  return (
    <section className="py-12 md:py-24" id="plugin-list">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-3xl md:text-4xl font-bold font-headline">
          <Balancer>
            {category ? `${category} pluginy` : 'Všetky pluginy'}
          </Balancer>
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          <Balancer>
            Objavte nástroje, ktoré vylepšia váš pracovný postup a posunú vaše projekty na novú úroveň.
          </Balancer>
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8 max-w-lg mx-auto">
        <Input 
          placeholder="Hľadať v kategórii..."
          className="flex-grow"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredPlugins.map((plugin) => (
          <motion.div
            key={plugin.slug}
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300 }}
            layout
          >
            <Card className="flex flex-col overflow-hidden h-full shadow-md hover:shadow-xl transition-shadow">
              <Link href={`/plugins/${plugin.slug}`} passHref>
                <div className="relative h-48 w-full cursor-pointer">
                  {plugin.imageUrl && (
                    <Image
                      src={plugin.imageUrl}
                      alt={plugin.name}
                      fill
                      style={{objectFit: "cover"}}
                      data-ai-hint={plugin.dataAiHint}
                      className="transition-transform duration-300"
                    />
                  )}
                </div>
              </Link>
              <CardContent className="p-6 flex-grow">
                <Badge variant="secondary" className="mb-2">{plugin.category}</Badge>
                <Link href={`/plugins/${plugin.slug}`} passHref>
                  <h3 className="text-xl font-bold font-headline mb-2 cursor-pointer hover:underline">{plugin.name}</h3>
                </Link>
                <div className="flex items-center gap-2 mb-2">
                  <StarRating rating={plugin.rating} />
                  {/* The number of reviews will be fetched on the detail page */}
                  <span className="text-sm text-muted-foreground">(pozri recenzie)</span>
                </div>
                <p className="text-muted-foreground text-sm">{plugin.description}</p>
              </CardContent>
              <CardFooter className="p-6 pt-0 flex justify-between items-center">
                <p className="text-lg font-semibold">{plugin.price}</p>
                <Button onClick={() => handleAddToCart(plugin)}>Pridať do košíka</Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
      {filteredPlugins.length === 0 && (
        <div className="text-center py-16">
            <h3 className="text-2xl font-bold font-headline">Nenašli sa žiadne pluginy</h3>
            <p className="text-muted-foreground mt-2">Skúste upraviť vyhľadávanie alebo filtre.</p>
        </div>
      )}
    </section>
  );
}

export const getPluginData = (slug: string): Plugin | undefined => {
  const plugin = plugins.find(p => p.slug === slug);
  if (!plugin) return undefined;

  // Reviews are now fetched from Firestore, so we return the static data.
  // The client component will handle fetching and displaying the dynamic reviews.
  return { ...plugin };
}
