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
    content: `
      <h2>1. Optimalizujte svoje titulky a meta popisy</h2>
      <p>Titulky stránok (title tags) a meta popisy sú prvá vec, ktorú používatelia vidia vo výsledkoch vyhľadávania. Uistite sa, že sú pútavé, relevantné a obsahujú kľúčové slová.</p>
      <h2>2. Vytvárajte kvalitný a relevantný obsah</h2>
      <p>Obsah je kráľ. Pravidelne publikujte články, blogy alebo prípadové štúdie, ktoré sú užitočné pre vašu cieľovú skupinu. Google odmeňuje stránky, ktoré poskytujú hodnotu.</p>
      <h2>3. Zamerajte sa na rýchlosť načítania stránky</h2>
      <p>Pomalé stránky odrádzajú návštevníkov a negatívne ovplyvňujú vaše SEO. Použite nástroje ako Google PageSpeed Insights na identifikáciu a opravu problémov s rýchlosťou.</p>
      <h2>4. Budujte kvalitné spätné odkazy</h2>
      <p>Spätné odkazy (backlinks) z autoritatívnych stránok sú jedným z najdôležitejších faktorov pre SEO. Zamerajte sa na získavanie odkazov prirodzenou cestou cez kvalitný obsah.</p>
      <h2>5. Nezabúdajte na mobilnú optimalizáciu</h2>
      <p>Väčšina používateľov dnes prehliada web na mobilných zariadeniach. Responzívny dizajn je absolútnou nevyhnutnosťou pre dobré umiestnenie vo vyhľadávaní.</p>
    `,
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
    content: `
      <h2>1. Definujte svoje potreby</h2>
      <p>Predtým, ako začnete hľadať, ujasnite si, akú funkcionalitu presne potrebujete. Spíšte si zoznam požiadaviek, ktoré by mal plugin spĺňať.</p>
      <h2>2. Skontrolujte recenzie a hodnotenia</h2>
      <p>Recenzie od ostatných používateľov sú skvelým zdrojom informácií. Zistite, aké sú ich skúsenosti, a všímajte si opakujúce sa problémy.</p>
      <h2>3. Dátum poslednej aktualizácie a podpora</h2>
      <p>Plugin, ktorý nebol dlho aktualizovaný, môže predstavovať bezpečnostné riziko. Overte si, či je plugin aktívne vyvíjaný a či autor poskytuje podporu.</p>
      <h2>4. Kompatibilita</h2>
      <p>Uistite sa, že plugin je kompatibilný s vašou verziou redakčného systému (napr. WordPress) a s ostatnými pluginmi, ktoré používate.</p>
      <h2>5. Cena vs. hodnota</h2>
      <p>Neriaďte sa len cenou. Niekedy sa oplatí investovať do plateného pluginu, ktorý ponúka lepšiu funkcionalitu, bezpečnosť a podporu ako jeho bezplatná alternatíva.</p>
    `,
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
