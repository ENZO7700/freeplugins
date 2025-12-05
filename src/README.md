# FreePlugins - Platforma pre softvérové pluginy

Vitajte v projekte FreePlugins! Ide o plne funkčnú e-commerce platformu vytvorenú v **Firebase Studio**, ktorá slúži ako trhovisko pre softvérové pluginy a nástroje. Aplikácia je postavená na moderných technológiách a navrhnutá s dôrazom na výkon, škálovateľnosť a používateľský zážitok.

## Kľúčové funkcie

- **Dynamický katalóg produktov:** Prehliadanie pluginov s možnosťou filtrovania podľa kategórií a fulltextového vyhľadávania.
- **Používateľská autentifikácia:** Kompletný systém registrácie a prihlasovania pomocou **Firebase Authentication**.
- **Nákupný košík a proces objednávky:** Intuitívny nákupný košík a jednoduchý proces objednávky integrovaný s **Firebase Firestore**.
- **Používateľský panel (Dashboard):** Personalizovaný panel pre prihlásených používateľov, kde nájdu:
    - Zoznam zakúpených pluginov.
    - Správu a generovanie licenčných kľúčov.
    - Históriu objednávok s vizualizáciou výdavkov.
    - Možnosť úpravy profilu.
- **Systém recenzií:** Používatelia môžu pridávať a prezerať hodnotenia a recenzie pre jednotlivé pluginy.
- **Blog:** Plne funkčná blogová sekcia s dynamickými stránkami pre jednotlivé články.
- **Responzívny dizajn:** Moderné a plne responzívne používateľské rozhranie postavené na **ShadCN UI** a **Tailwind CSS**.
- **Automatické nasadenie:** Predpripravený CI/CD workflow pomocou **GitHub Actions** na automatické nasadenie na **Firebase Hosting**.

## Technologický stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Knižnica UI:** [React](https://react.dev/)
- **Jazyk:** [TypeScript](https://www.typescriptlang.org/)
- **Backend a databáza:** [Firebase](https://firebase.google.com/) (Authentication, Firestore)
- **Štýlovanie:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Komponenty:** [ShadCN UI](https://ui.shadcn.com/)
- **Ikonky:** [Lucide React](https://lucide.dev/)
- **Animácie:** [Framer Motion](https://www.framer.com/motion/)

## Ako začať s vývojom

Pre spustenie projektu lokálne na vašom počítači postupujte podľa nasledujúcich krokov.

### 1. Inštalácia závislostí

Otvorte terminál v koreňovom adresári projektu a spustite príkaz:

```bash
npm install
```

### 2. Spustenie vývojového servera

Po úspešnej inštalácii všetkých balíčkov spustite vývojový server:

```bash
npm run dev
```

Aplikácia bude následne dostupná na adrese [http://localhost:9000](http://localhost:9000).

### 3. Vytvorenie produkčnej verzie

Ak chcete otestovať produkčnú verziu aplikácie, najprv ju musíte zbuildovať:

```bash
npm run build
```

A následne spustiť produkčný server:

```bash
npm run start
```

## Nasadenie

Projekt je nakonfigurovaný na automatické nasadenie na Firebase Hosting. Podrobný návod, ako prepojiť váš projekt s GitHubom a nastaviť potrebné "Secrets", nájdete v súbore `NAVOD.md`.
