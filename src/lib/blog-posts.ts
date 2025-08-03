
export interface BlogPost {
  slug: string;
  title: string;
  summary: string;
  content: string;
  author: string;
  authorImageUrl: string;
  date: string;
  imageUrl: string;
  dataAiHint: string;
  category: string;
}

const blogPosts: BlogPost[] = [
  {
    slug: '5-tipov-pre-lepsi-ranking',
    title: '5 tipov pre lepší ranking v Google',
    summary: 'Zistite, ako jednoduchými úpravami môžete výrazne zlepšiť pozíciu vašej stránky vo vyhľadávaní Google.',
    content: `Titulky stránok (title tags) a meta popisy sú prvá vec, ktorú používatelia vidia vo výsledkoch vyhľadávania. Uistite sa, že sú pútavé, relevantné a obsahujú kľúčové slová.

Obsah je kráľ. Pravidelne publikujte články, blogy alebo prípadové štúdie, ktoré sú užitočné pre vašu cieľovú skupinu. Google odmeňuje stránky, ktoré poskytujú hodnotu.

Pomalé stránky odrádzajú návštevníkov a negatívne ovplyvňujú vaše SEO. Použite nástroje ako Google PageSpeed Insights na identifikáciu a opravu problémov s rýchlosťou.

Spätné odkazy (backlinks) z autoritatívnych stránok sú jedným z najdôležitejších faktorov pre SEO. Zamerajte sa na získavanie odkazov prirodzenou cestou cez kvalitný obsah.

Väčšina používateľov dnes prehliada web na mobilných zariadeniach. Responzívny dizajn je absolútnou nevyhnutnosťou pre dobré umiestnenie vo vyhľadávaní.`,
    author: 'Ján Kováč',
    authorImageUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=100&h=100&fit=crop',
    date: '15. júl 2024',
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=600&h=400&fit=crop',
    dataAiHint: 'seo analytics',
    category: 'SEO',
  },
  {
    slug: 'ako-vybrat-spravny-plugin',
    title: 'Ako si vybrať správny plugin pre váš web?',
    summary: 'Výber správneho pluginu môže byť náročný. V tomto článku vám poradíme, na čo sa zamerať, aby ste neurobili chybu.',
    content: `Predtým, ako začnete hľadať, ujasnite si, akú funkcionalitu presne potrebujete. Spíšte si zoznam požiadaviek, ktoré by mal plugin spĺňať.

Recenzie od ostatných používateľov sú skvelým zdrojom informácií. Zistite, aké sú ich skúsenosti, a všímajte si opakujúce sa problémy.

Plugin, ktorý nebol dlho aktualizovaný, môže predstavovať bezpečnostné riziko. Overte si, či je plugin aktívne vyvíjaný a či autor poskytuje podporu.

Uistite sa, že plugin je kompatibilný s vašou verziou redakčného systému (napr. WordPress) a s ostatnými pluginmi, ktoré používate.

Neriaďte sa len cenou. Niekedy sa oplatí investovať do plateného pluginu, ktorý ponúka lepšiu funkcionalitu, bezpečnosť a podporu ako jeho bezplatná alternatíva.`,
    author: 'Eva Nováková',
    authorImageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&h=100&fit=crop',
    date: '10. júl 2024',
    imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=600&h=400&fit=crop',
    dataAiHint: 'software puzzle',
    category: 'Plugins',
  },
  {
    slug: 'automatizacia-marketingu-pluginmi',
    title: 'Automatizácia marketingu pomocou pluginov',
    summary: 'Objavte, ako môžu správne pluginy automatizovať vaše marketingové kampane, ušetriť čas a zvýšiť efektivitu.',
    content: `Automatizácia marketingu už nie je len pre veľké korporácie. S pomocou správnych pluginov môžete aj vy nastaviť procesy, ktoré za vás budú pracovať 24/7. Od automatického odosielania e-mailov až po personalizované ponuky pre návštevníkov vášho webu.

E-mailový marketing je jedným z najlepších kandidátov na automatizáciu. Pluginy vám umožnia vytvárať uvítacie série pre nových odberateľov, posielať pripomienky o opustenom košíku alebo segmentovať používateľov na základe ich správania a posielať im relevantný obsah.

Ďalšou oblasťou je správa sociálnych sietí. Namiesto manuálneho prispievania na Facebook, Twitter či LinkedIn môžete použiť pluginy, ktoré naplánujú vaše príspevky na týždne dopredu. Ušetríte tak hodiny času a udržíte si konzistentnú prítomnosť online.

Nezabúdajte ani na personalizáciu obsahu na webe. Niektoré pluginy dokážu dynamicky meniť obsah stránky podľa toho, odkiaľ návštevník prišiel alebo čo ho zaujímalo v minulosti. To vedie k vyššej miere konverzie a spokojnejším zákazníkom.`,
    author: 'Martina Veselá',
    authorImageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&h=100&fit=crop',
    date: '25. júl 2024',
    imageUrl: 'https://images.unsplash.com/photo-1556155092-490a1ba16284?q=80&w=600&h=400&fit=crop',
    dataAiHint: 'marketing automation',
    category: 'Marketing',
  },
  {
    slug: 'bezpecnost-pluginov-aktualizacie',
    title: 'Bezpečnosť webu: Prečo je dôležité aktualizovať pluginy?',
    summary: 'Neaktualizované pluginy sú jedným z najväčších bezpečnostných rizík. Prečítajte si, prečo by ste ich mali udržiavať v kondícii.',
    content: `Predstavte si pluginy ako dvere a okná vášho domu. Ak ich necháte odomknuté alebo poškodené, dávate zlodejom ľahkú príležitosť na vstup. Podobne fungujú aj neaktualizované pluginy na vašom webe – stávajú sa vstupnou bránou pre hackerov.

Vývojári pluginov pravidelne vydávajú aktualizácie, ktoré nielenže pridávajú nové funkcie, ale predovšetkým opravujú bezpečnostné diery. Hackeri tieto zraniteľnosti aktívne vyhľadávajú a zneužívajú na weboch, ktoré nemajú najnovšie verzie.

Okrem bezpečnostných opráv prinášajú aktualizácie aj opravy chýb a vylepšenia výkonu. Váš web tak bude nielen bezpečnejší, ale aj rýchlejší a stabilnejší.

Pravidelná aktualizácia tiež zaisťuje kompatibilitu s najnovšou verziou vášho redakčného systému a ostatnými pluginmi. Predídete tak konfliktom, ktoré by mohli spôsobiť pád stránky.

Nastavte si pripomienky alebo využite funkcie automatických aktualizácií. Investícia niekoľkých minút do údržby vám môže ušetriť hodiny alebo aj dni riešenia problémov po hackerskom útoku.`,
    author: 'Peter Bezpečný',
    authorImageUrl: 'https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=100&h=100&fit=crop',
    date: '28. júl 2024',
    imageUrl: 'https://images.unsplash.com/photo-1526374965328-5f61d4dc16c6?q=80&w=600&h=400&fit=crop',
    dataAiHint: 'cyber security',
    category: 'Plugins',
  },
];

export function getAllPosts() {
  return blogPosts;
}

export function getPostBySlug(slug: string) {
  return blogPosts.find(p => p.slug === slug);
}

export function getBlogCategories() {
  const categories = blogPosts.map(post => post.category);
  return [...new Set(categories)]; // Return unique categories
}
