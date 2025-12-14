# FreePlugins - Software Plugin Marketplace

FreePlugins je moderný marketplace pre softvérové pluginy a nástroje postavený na Next.js 15, React 18, Firebase a Tailwind CSS. Platforma poskytuje používateľom možnosť prehliadať, nakupovať a spravovať softvérové pluginy pre rôzne platformy.

## 🚀 Hlavné Vlastnosti

- **🎨 Moderný UI/UX** - Responzívny dizajn s podporou tmavého/svetlého režimu
- **🔐 Firebase Autentifikácia** - Bezpečné prihlásenie a registrácia používateľov
- **🛒 Nákupný Košík** - Plne funkčný košík s podporou viacerých položiek
- **📊 Dashboard** - Prehľad zakúpených pluginov, histórie objednávok a štatistík
- **⚡ Výkonnostné Optimalizácie** - Server-side rendering, optimalizované obrázky
- **🔍 Vyhľadávanie a Filtrovanie** - Pokročilé vyhľadávanie pluginov podľa kategórií
- **⭐ Hodnotenia a Recenzie** - Systém hodnotení a komentárov pre každý plugin
- **📱 Responzívny Sidebar** - Prispôsobivá navigácia pre desktop aj mobile zariadenia
- **🎭 Animácie** - Plynulé prechody a animácie s Framer Motion

## 📋 Predpoklady

Pred inštaláciou sa uistite, že máte nainštalované:

- **Node.js** - verzia 18.0 alebo vyššia
- **npm** - verzia 9.0 alebo vyššia (alebo yarn/pnpm)
- **Firebase účet** - pre autentifikáciu a Firestore databázu
- **Git** - pre klonovanie repozitára

## 🔧 Inštalácia

### 1. Klonovanie Repozitára

```bash
git clone https://github.com/ENZO7700/freeplugins.git
cd freeplugins
```

### 2. Inštalácia Závislostí

```bash
npm install
```

### 3. Konfigurácia Firebase

1. Vytvorte Firebase projekt na [Firebase Console](https://console.firebase.google.com/)
2. Aktivujte Authentication a Firestore Database
3. Vytvorte súbor `.env.local` v koreňovom adresári projektu:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

4. Aktualizujte `src/lib/firebase.ts` s vašimi Firebase údajmi (alebo použite environment variables)

### 4. Spustenie Vývojového Servera

```bash
npm run dev
```

Aplikácia bude dostupná na `http://localhost:9002`

## 📦 Dostupné Príkazy

- `npm run dev` - Spustí vývojový server s Turbopack
- `npm run build` - Vytvorí production build
- `npm run start` - Spustí production server
- `npm run lint` - Skontroluje kód pomocou ESLint
- `npm run typecheck` - Skontroluje TypeScript typy

## 🏗️ Štruktúra Projektu

```
freeplugins/
├── src/
│   ├── app/                    # Next.js App Router stránky
│   │   ├── page.tsx           # Hlavná stránka
│   │   ├── layout.tsx         # Root layout s poskytovateľmi
│   │   ├── dashboard/         # Dashboard používateľa
│   │   ├── plugins/           # Detail pluginu
│   │   ├── blog/              # Blog sekcia
│   │   ├── login/             # Prihlásenie
│   │   ├── signup/            # Registrácia
│   │   └── ...
│   ├── components/            # React komponenty
│   │   ├── ui/               # UI komponenty (shadcn/ui)
│   │   ├── auth/             # Autentifikačné formuláre
│   │   ├── dashboard/        # Dashboard komponenty
│   │   └── ...
│   ├── context/              # React Context poskytovateľe
│   │   ├── auth-context.tsx  # Autentifikácia
│   │   ├── cart-context.tsx  # Nákupný košík
│   │   └── dashboard-context.tsx
│   ├── hooks/                # Custom React hooks
│   ├── lib/                  # Utility funkcie a konfigurácie
│   │   ├── firebase.ts       # Firebase konfigurácia
│   │   ├── auth-service.ts   # Autentifikačné služby
│   │   └── utils.ts          # Pomocné funkcie
│   └── ...
├── public/                   # Statické súbory
├── docs/                     # Dokumentácia
├── .eslintrc.json           # ESLint konfigurácia
├── tsconfig.json            # TypeScript konfigurácia
├── tailwind.config.ts       # Tailwind CSS konfigurácia
├── next.config.ts           # Next.js konfigurácia
└── package.json             # Závislosti projektu
```

## 🎨 Technologický Stack

### Frontend
- **Next.js 15** - React framework s App Router
- **React 18** - UI knižnica
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animácie a prechody
- **shadcn/ui** - UI komponenty

### Backend/Services
- **Firebase Authentication** - Správa používateľov
- **Firestore** - NoSQL databáza
- **Firebase Hosting** - Hosting aplikácie

### Vývojové Nástroje
- **ESLint** - Linting kódu
- **TypeScript Compiler** - Type checking
- **Turbopack** - Rýchle bundlovanie (dev)

## 🔐 Autentifikácia a Bezpečnosť

Aplikácia používa Firebase Authentication s nasledujúcimi funkciami:

- Email/heslo autentifikácia
- Ochrana routes - privátne stránky vyžadujú prihlásenie
- Session management
- Automatické odhlásenie pri vypršaní session

## 🎯 Hlavné Funkcie

### Pre Používateľov
- Prehliadanie pluginov podľa kategórií
- Vyhľadávanie a filtrovanie
- Pridanie do košíka
- Zobrazenie detailov pluginu
- Hodnotenie a recenzie
- Dashboard s históriou objednávok
- Správa profilu

### Pre Vývojárov
- Type-safe kód s TypeScript
- Reutilizovateľné komponenty
- Context API pre state management
- Custom hooks pre logiku
- Optimalizované obrázky s Next.js Image
- Server-side rendering

## 📱 Responzívny Dizajn

Aplikácia je plne responzívna a optimalizovaná pre:
- Desktop (1920px+)
- Laptop (1024px+)
- Tablet (768px+)
- Mobile (320px+)

## 🌐 Nasadenie

### Firebase Hosting

Aplikácia je nakonfigurovaná pre automatické nasadenie na Firebase Hosting pomocou GitHub Actions.

1. Nastavte GitHub Secrets:
   - `FIREBASE_API_KEY`
   - `FIREBASE_CLI_TOKEN`

2. Push do `main` vetvy automaticky spustí nasadenie

### Vercel (Odporúčané)

**Kompletný návod:** Pozrite si [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md) pre detailné inštrukcie.

**Rýchle nasadenie:**

```bash
npm install -g vercel
vercel
```

Projekt je optimalizovaný pre Vercel s automatickým CI/CD pri každom push do GitHub.

## 🧪 Testovanie

Projekt momentálne neobsahuje testy, ale odporúčame pridať:
- Unit testy s Jest a React Testing Library
- E2E testy s Playwright alebo Cypress
- Integration testy pre Firebase

## 📝 Prispievanie

1. Forkujte projekt
2. Vytvorte feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit zmeny (`git commit -m 'Add some AmazingFeature'`)
4. Push do branch (`git push origin feature/AmazingFeature`)
5. Otvorte Pull Request

## 🐛 Riešenie Problémov

### Node Modules
Ak sa vyskytnú problémy s dependencies:
```bash
rm -rf node_modules package-lock.json
npm install
```

### Firebase Connection
Skontrolujte Firebase konfiguráciu v `.env.local` alebo `src/lib/firebase.ts`

### Build Errors
Vyčistite cache:
```bash
rm -rf .next
npm run build
```

## 📄 Licencia

Tento projekt je súkromný a nie je určený na verejné použitie bez povolenia.

## 👥 Autori

- ENZO7700 - Hlavný vývojár

## 📞 Kontakt

Pre otázky alebo podporu otvorte issue na GitHub repozitári.

## 🙏 Poďakovanie

- [Next.js](https://nextjs.org/)
- [Firebase](https://firebase.google.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Radix UI](https://www.radix-ui.com/)
- [Framer Motion](https://www.framer.com/motion/)

---

**Poznámka:** Tento projekt je v aktívnom vývoji. Niektoré funkcie môžu byť ešte nedokončené alebo podliehajú zmenám.
