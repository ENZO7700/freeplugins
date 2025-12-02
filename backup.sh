#!/bin/bash

# ==============================================================================
# JEDNODUCHÝ SKRIPT NA ZÁLOHOVANIE PROJEKTU
#
# Tento skript vytvorí komprimovaný .tar.gz archív celého projektu.
# Inteligentne vylúči nepotrebné adresáre ako node_modules, build výstupy
# a predchádzajúce zálohy, aby bol výsledný súbor čo najmenší.
#
# POUŽITIE:
# 1. Uistite sa, že máte práva na spustenie skriptu:
#    chmod +x backup.sh
#
# 2. Spustite skript z koreňového adresára projektu:
#    ./backup.sh
#
# Výsledkom bude súbor s názvom napr. 'project_backup_2024-08-05_14-30-00.tar.gz'
# v koreňovom adresári projektu.
# ==============================================================================

# Nastavenie názvu zálohy s aktuálnym dátumom a časom
TIMESTAMP=$(date +"%Y-%m-%d_%H-%M-%S")
BACKUP_FILENAME="project_backup_${TIMESTAMP}.tar.gz"

# Adresáre a súbory, ktoré sa majú vylúčiť zo zálohy
# (Zoznam je podobný ako v .gitignore)
EXCLUDE_ITEMS=(
  "node_modules"
  ".next"
  "out"
  ".vercel"
  "*.log"
  "*.tsbuildinfo"
  "firebase-debug.*.log"
  "*.tar.gz" # Vylúči predchádzajúce zálohy
)

# Vytvorenie argumentov pre príkaz tar
EXCLUDE_ARGS=""
for item in "${EXCLUDE_ITEMS[@]}"; do
  EXCLUDE_ARGS+=" --exclude='./${item}'"
done

# Informovanie používateľa
echo "Spúšťa sa zálohovanie projektu..."
echo "Výstupný súbor bude: ${BACKUP_FILENAME}"
echo "Vylučujem nasledujúce položky: ${EXCLUDE_ITEMS[*]}"

# Príkaz na vytvorenie komprimovaného archívu
# Používame eval na správne spracovanie argumentov s medzerami
eval tar -czf "${BACKUP_FILENAME}" ${EXCLUDE_ARGS} .

# Kontrola úspešnosti a finálna správa
if [ $? -eq 0 ]; then
  echo ""
  echo "✅ Záloha bola úspešne vytvorená!"
  echo "Nájdete ju v súbore: ${BACKUP_FILENAME}"
else
  echo ""
  echo "❌ Vyskytla sa chyba pri vytváraní zálohy."
fi
