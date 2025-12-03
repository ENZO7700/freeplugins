# Návod na Nasadenie a Zálohovanie Aplikácie

Tento dokument poskytuje krok-za-krokom inštrukcie na automatické nasadenie vašej aplikácie na Firebase Hosting a na vytvorenie lokálnej zálohy projektu.

---

## 1. Automatické Nasadenie na Firebase cez GitHub Actions

Váš projekt obsahuje predpripravený skript (`.github/workflows/deploy.yml`), ktorý automaticky nasadí vašu aplikáciu na Firebase Hosting vždy, keď nahráte zmeny do `main` vetvy na GitHube.

Aby to fungovalo, musíte vo vašom GitHub repozitári nastaviť dve tajné premenné (Secrets). Je to bezpečný spôsob, ako povoliť GitHubu prístup k vášmu Firebase projektu.

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

**Hotovo!** Odteraz sa každá zmena nahraná do `main` vetvy automaticky nasadí na Firebase Hosting.

---

## 2. Vytvorenie Lokálnej Zálohy Projektu

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

Po spustení skript vytvorí v koreňovom adresári komprimovaný archív s názvom ako `project_backup_2024-08-05_14-30-00.tar.gz`. Tento súbor obsahuje celý váš projekt, okrem nepotrebných adresárov ako `node_modules`, čo zmenšuje jeho veľkosť.

Túto zálohu si môžete bezpečne uložiť na externý disk alebo cloudové úložisko.
