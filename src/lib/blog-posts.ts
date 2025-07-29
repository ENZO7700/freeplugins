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
    authorImageUrl: 'https://placehold.co/100x100.png',
    date: '15. júl 2024',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'seo analytics',
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
    authorImageUrl: 'https://placehold.co/100x100.png',
    date: '10. júl 2024',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'software puzzle',
  },
];

export function getAllPosts() {
  return blogPosts;
}

export function getPostBySlug(slug: string) {
  return blogPosts.find(p => p.slug === slug);
}
