# 🚀 Nasadenie FreePlugins na Vercel

Komplexný návod na nasadenie projektu FreePlugins na Vercel hosting.

## 📋 Predpoklady

Pred nasadením sa uistite, že máte:

- ✅ GitHub účet s prístupom k repozitáru
- ✅ Vercel účet (registrácia na [vercel.com](https://vercel.com))
- ✅ Firebase projekt s nakonfigurovanými údajmi
- ✅ Funkčný lokálny build projektu (`npm run build`)

## 🔧 Príprava Projektu

### 1. Overenie Funkčnosti Lokálne

Pred nasadením overte, že projekt funguje lokálne:

```bash
# Inštalácia závislostí
npm install

# Kontrola TypeScript
npm run typecheck

# Kontrola ESLint
npm run lint

# Build projektu
npm run build

# Test production servera lokálne
npm run start
```

Všetky príkazy by mali prejsť bez chýb.

### 2. Konfigurácia Environment Variables

Projekt vyžaduje nasledujúce environment variables pre Firebase:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=
```

**Dôležité:** Tieto hodnoty získate z Firebase Console → Project Settings → General → Your apps → SDK setup and configuration.

### 3. Vercel Konfigurácia

Projekt už obsahuje `vercel.json` súbor s optimálnymi nastaveniami:

```json
{
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/next"
    }
  ]
}
```

## 🌐 Nasadenie cez Vercel Dashboard

### Krok 1: Import Projektu

1. Prejdite na [vercel.com/new](https://vercel.com/new)
2. Kliknite na **"Import Git Repository"**
3. Autorizujte Vercel prístup k vášmu GitHub účtu
4. Vyberte repozitár `ENZO7700/freeplugins`

### Krok 2: Konfigurácia Projektu

**Project Name:** `freeplugins` (alebo vlastný názov)

**Framework Preset:** Next.js (automaticky detekované)

**Root Directory:** `./` (default)

**Build Command:** `npm run build` (automaticky nastavené)

**Output Directory:** `.next` (automaticky nastavené)

**Install Command:** `npm install` (automaticky nastavené)

### Krok 3: Environment Variables

V sekcii "Environment Variables" pridajte všetky Firebase premenné:

| Name | Value | Environment |
|------|-------|-------------|
| `NEXT_PUBLIC_FIREBASE_API_KEY` | `AIzaSy...` | Production, Preview |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | `your-project.firebaseapp.com` | Production, Preview |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | `your-project-id` | Production, Preview |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | `your-project.firebasestorage.app` | Production, Preview |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | `123456789` | Production, Preview |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | `1:123:web:abc123` | Production, Preview |
| `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID` | `G-XXXXXXXXXX` | Production, Preview |

**Tip:** Použite "Production" a "Preview" pre všetky premenné.

### Krok 4: Deploy

1. Skontrolujte všetky nastavenia
2. Kliknite na **"Deploy"**
3. Počkajte na dokončenie build procesu (2-5 minút)

## 🔄 Nasadenie cez Vercel CLI

### Inštalácia Vercel CLI

```bash
npm install -g vercel
```

### Prihlásenie

```bash
vercel login
```

### Prvé Nasadenie

```bash
# V koreňovom adresári projektu
vercel

# Zodpovedajte otázky:
# ? Set up and deploy "~/freeplugins"? [Y/n] y
# ? Which scope do you want to deploy to? (Use arrow keys)
# ? Link to existing project? [y/N] n
# ? What's your project's name? freeplugins
# ? In which directory is your code located? ./
```

### Nastavenie Environment Variables cez CLI

```bash
# Pre production
vercel env add NEXT_PUBLIC_FIREBASE_API_KEY production
vercel env add NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN production
vercel env add NEXT_PUBLIC_FIREBASE_PROJECT_ID production
vercel env add NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET production
vercel env add NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID production
vercel env add NEXT_PUBLIC_FIREBASE_APP_ID production
vercel env add NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID production

# Pre preview
vercel env add NEXT_PUBLIC_FIREBASE_API_KEY preview
vercel env add NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN preview
# ... (opakujte pre všetky premenné)
```

### Production Deploy

```bash
vercel --prod
```

## ✅ Post-Deployment Kontrola

Po úspešnom nasadení vykonajte tieto kontroly:

### 1. Základná Funkcionalita

- [ ] Hlavná stránka sa načíta správne
- [ ] Navigácia funguje
- [ ] Obrázky sa zobrazujú
- [ ] Dark/Light mode prepínanie funguje

### 2. Firebase Integrácia

- [ ] Registrácia nového používateľa funguje
- [ ] Prihlásenie existujúceho používateľa funguje
- [ ] Dashboard sa načíta po prihlásení
- [ ] Odhlásenie funguje správne

### 3. Výkon a SEO

- [ ] Lighthouse skóre > 90 (Performance)
- [ ] Meta tagy sú prítomné
- [ ] Open Graph obrázky fungujú
- [ ] Favicon sa zobrazuje

## 🔧 Automatické Nasadenie (CI/CD)

Vercel automaticky nasadí váš projekt pri každom push do GitHub repozitára:

- **Production:** Push do `main` vetvy → automatický deploy na production URL
- **Preview:** Pull request → automatický preview deploy s unique URL

### Nastavenie v GitHub

Vercel automaticky vytvorí GitHub Integration. Môžete to overiť:

1. GitHub Repository → Settings → Integrations → Vercel
2. Každý PR bude mať automatický komentár s preview URL

## 🚨 Riešenie Problémov

### Build Zlyhá

**Chyba:** `Type errors` alebo `ESLint errors`

**Riešenie:**
```bash
# Lokálne otestujte
npm run typecheck
npm run lint
npm run build
```

Opravte všetky chyby pred deploy.

### Environment Variables Nefungujú

**Problém:** Firebase connection errors

**Riešenie:**
1. Overte, že všetky premenné začínajú `NEXT_PUBLIC_`
2. V Vercel Dashboard → Settings → Environment Variables
3. Skontrolujte, že hodnoty sú správne
4. Po zmene variables, re-deploy: Deployments → ... → Redeploy

### 404 Errors na Routes

**Problém:** Stránky nefungujú po refresh

**Riešenie:** 
Next.js App Router by mal fungovať automaticky. Ak problém pretrváva:
1. Overte `next.config.ts` nastavenia
2. Skontrolujte Vercel logs: Deployment → View Function Logs

### Slow Load Times

**Riešenie:**
1. Optimalizujte obrázky (použite Next.js Image component)
2. Enable ISR (Incremental Static Regeneration)
3. Implementujte caching stratégiu

## 📊 Monitoring a Analytics

### Vercel Analytics

Aktivujte Vercel Analytics pre monitoring:

1. Project Settings → Analytics → Enable
2. Sledujte Core Web Vitals
3. Monitorujte Error rates

### Firebase Analytics

Ak používate Firebase Analytics:

```typescript
// V firebase.ts
import { getAnalytics } from "firebase/analytics";

const analytics = getAnalytics(app);
```

## 🔐 Bezpečnosť

### Dôležité Bezpečnostné Opatrenia

1. **Environment Variables:** Nikdy necommitujte `.env.local` do Git
2. **Firebase Rules:** Skontrolujte Firestore security rules
3. **API Keys:** NEXT_PUBLIC_ premenné sú viditeľné v browseri - používajte len pre public API keys
4. **Authentication:** Overte, že protected routes sú správne zabezpečené

### Firebase Security Rules

Odporúčame nastavenie:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Orders collection
    match /orders/{orderId} {
      allow read: if request.auth != null && 
                     resource.data.userId == request.auth.uid;
      allow create: if request.auth != null;
    }
  }
}
```

## 📈 Optimalizácia Pre Production

### 1. Image Optimization

Všetky obrázky by mali používať Next.js Image component:

```tsx
import Image from 'next/image';

<Image 
  src="/image.jpg" 
  alt="Description"
  width={500}
  height={300}
  priority // pre LCP obrázky
/>
```

### 2. Font Optimization

Projekt už používa `next/font/google` - automatická optimalizácia.

### 3. Bundle Size

Monitorujte veľkosť bundle:

```bash
npm run build
# Skontrolujte output pre veľké chunks
```

## 🎯 Custom Domain

### Pridanie Vlastnej Domény

1. Vercel Dashboard → Project → Settings → Domains
2. Kliknite "Add Domain"
3. Zadajte vašu doménu (napr. `freeplugins.com`)
4. Nasledujte inštrukcie pre DNS konfiguráciu

### DNS Nastavenia

U vášho registrátora domén pridajte:

**A Record:**
```
Type: A
Name: @
Value: 76.76.21.21
```

**CNAME Record (pre www):**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

## 📞 Podpora a Ďalšie Zdroje

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Firebase Documentation](https://firebase.google.com/docs)

---

**Poznámka:** Po úspešnom nasadení bude váš projekt dostupný na URL ako `https://freeplugins.vercel.app` (alebo vlastná doména).

## ✨ Hotovo!

Váš FreePlugins projekt je teraz live na Vercel! 🎉

Pre ďalšie nasadenia stačí:
```bash
git push origin main
```

Vercel automaticky build a deploy najnovšiu verziu.
