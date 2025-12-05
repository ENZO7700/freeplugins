# Kompletný Návod: Uloženie na GitHub a Automatické Nasadenie

Tento dokument poskytuje krok-za-krokom inštrukcie na uloženie vášho projektu na GitHub, nastavenie automatického nasadenia na Firebase a vytvorenie lokálnej zálohy.

---

## 1. Uloženie Projektu na GitHub

Aby ste mohli využívať automatické nasadzovanie a mali svoj kód bezpečne uložený, prvým krokom je nahrať ho do vášho vlastného repozitára na GitHube.

### Kroky:

1.  **Vytvorte si nový repozitár na GitHube:**
    *   Prihláste sa na váš [GitHub účet](https://github.com/).
    *   Kliknite na `+` v pravom hornom rohu a vyberte `New repository`.
    *   Zadajte názov repozitára (napr. `my-firebase-app`), uistite sa, že je nastavený ako `Private` (súkromný) a kliknite na `Create repository`.

2.  **Inicializujte Git vo vašom projekte:**
    *   Otvorte terminál (príkazový riadok) v hlavnom adresári vášho projektu.
    *   Spustite nasledujúce príkazy jeden po druhom:
        ```bash
        git init
        git add .
        git commit -m "Initial commit"
        ```

3.  **Prepojte projekt s GitHub repozitárom:**
    *   Na stránke vášho nového GitHub repozitára nájdete sekciu `…or push an existing repository from the command line`. Skopírujte odtiaľ dva príkazy. Budú vyzerať podobne ako toto (nahraďte `YOUR_USERNAME` a `YOUR_REPOSITORY`):
        ```bash
        git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
        git branch -M main
        ```
    *   Vložte a spustite tieto dva príkazy vo vašom termináli.

4.  **Nahrajte projekt na GitHub:**
    *   Nakoniec, odošlite váš kód na GitHub spustením príkazu:
        ```bash
        git push -u origin main
        ```

**Hotovo!** Váš projekt je teraz bezpečne uložený na GitHube.

---

## 2. Automatické Nasadenie na Firebase cez GitHub Actions

Váš projekt obsahuje predpripravený skript (`.github/workflows/deploy.yml`), ktorý automaticky nasadí vašu aplikáciu na Firebase Hosting vždy, keď nahráte zmeny do `main` vetvy na GitHube.

Aby to fungovalo, musíte vo vašom GitHub repozitári nastaviť dve tajné premenné (Secrets).

### Kroky na nastavenie:

1.  **Otvorte nastavenia vášho GitHub repozitára.**
    *   Prejdite na hlavnú stránku vášho repozitára na GitHube.
    *   Kliknite na kartu `Settings`.
    *   V ľavom menu vyberte `Secrets and variables` -> `Actions`.

2.  **Pridajte prvú premennú (`FIREBASE_API_KEY`):**
    *   Kliknite na tlačidlo `New repository secret`.
    *   **Name:** `FIREBASE_API_KEY`
    *   **Value:** Vložte sem váš Firebase API kľúč. Nájdete ho v súbore `src/lib/firebase.ts` v riadku s `apiKey`.

3.  **Pridajte druhú premennú (`FIREBASE_CLI_TOKEN`):**
    *   **Nainštalujte Firebase CLI:** Ak ho ešte nemáte, otvorte terminál a spustite:
        ```bash
        npm install -g firebase-tools
        ```
    *   **Vygenerujte token:** Spustite vo vašom termináli nasledujúci príkaz:
        ```bash
        firebase login:ci
        ```
    *   Tento príkaz vás požiada o prihlásenie do vášho Google účtu a následne vygeneruje dlhý autorizačný token.
    *   **Pridajte token do GitHubu:** Vráťte sa do nastavení repozitára, kliknite na `New repository secret`.
        *   **Name:** `FIREBASE_CLI_TOKEN`
        *   **Value:** Vložte sem skopírovaný token z terminálu.

**Úspešne nastavené!** Odteraz sa každá zmena nahraná do `main` vetvy automaticky a bezpečne nasadí na Firebase Hosting.

---

## 3. Vytvorenie Lokálnej Zálohy Projektu

Váš projekt obsahuje jednoduchý, ale výkonný skript `backup.sh` na vytvorenie kompletnej zálohy vášho projektu.

### Ako spustiť zálohu:

1.  **Otvorte terminál** vo vašom operačnom systéme (napr. Terminal na macOS/Linux, Git Bash alebo WSL na Windows).

2.  **Navigujte do koreňového adresára** vášho projektu.

3.  **Udeľte skriptu práva na spustenie** (tento krok stačí urobiť iba raz):
    ```bash
    chmod +x backup.sh
    ```

4.  **Spustite zálohovací skript:**
    ```bash
    bash backup.sh
    ```

Po spustení skript vytvorí v koreňovom adresári komprimovaný archív s názvom ako `project_backup_2024-08-05_14-30-00.tar.gz`. Tento súbor obsahuje celý váš projekt.

Túto zálohu si môžete bezpečne uložiť na externý disk alebo cloudové úložisko.
