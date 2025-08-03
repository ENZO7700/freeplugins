
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
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Star, StarHalf } from 'lucide-react';
import { format } from 'date-fns';
import { sk } from 'date-fns/locale';

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
  // Wordpress
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
  // Plugins
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
    slug: 'ecommerceify',
    name: 'E-commerceify',
    category: 'Plugins',
    description: 'Premeňte svoju webovú stránku na výkonný online obchod v priebehu niekoľkých minút.',
    longDescription: 'E-commerceify poskytuje všetko, čo potrebujete na začatie online predaja. Medzi funkcie patrí správa produktov, bezpečné platobné brány, sledovanie zásob a správa zákazníkov. Plne prispôsobiteľné, aby zodpovedalo vašej značke.',
    price: '$99',
    imageUrl: 'https://images.unsplash.com/photo-1580974910344-96b9918de40b?q=80&w=600&h=400&fit=crop',
    dataAiHint: 'online payment',
    rating: 5,
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
    rating: 4,
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
    rating: 5,
    reviews: [],
  },
  // Downloads
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
  // Windows
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
  // Linux
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
  // macOS
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
  // Android
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
  // iPhone
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
  const router = useRouter();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(searchParams.get('category'));
  const { addToCart } = useCart();
  const { toast } = useToast();
  
  React.useEffect(() => {
    setSelectedCategory(searchParams.get('category'));
  }, [searchParams]);

  const allCategories = ['Všetko', ...getPluginCategories().map(c => c.name)];

  const handleCategoryChange = (category: string | null) => {
    const newCategory = category === 'Všetko' ? null : category;
    setSelectedCategory(newCategory);
    const params = new URLSearchParams(window.location.search);
    if (newCategory) {
      params.set('category', newCategory);
    } else {
      params.delete('category');
    }
    router.push(`?${params.toString()}`);
  };

  const filteredPlugins = plugins.filter(plugin => {
    const matchesCategory = !selectedCategory || plugin.category === selectedCategory;
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
    <section className="py-12 md:py-24">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-3xl md:text-4xl font-bold font-headline">Odporúčané pluginy</h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Objavte nástroje, ktoré vylepšia váš pracovný postup.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <Input 
          placeholder="Hľadať pluginy..."
          className="flex-grow"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {allCategories.map(category => (
                <Button 
                    key={category}
                    variant={selectedCategory === (category === 'Všetko' ? null : category) ? "default" : "outline"}
                    onClick={() => handleCategoryChange(category)}
                    className="whitespace-nowrap"
                >
                    {category}
                </Button>
            ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPlugins.map((plugin) => (
          <motion.div
            key={plugin.slug}
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300 }}
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
