#!/bin/bash

# --- Skript na vytvorenie zálohy projektu ---
# Tento skript vytvorí komprimovaný archív (.tar.gz) celého projektu.
# Do názvu súboru pridá aktuálny dátum a čas pre jednoduchú identifikáciu.
# Inteligentne vylúči nepotrebné súbory a adresáre (node_modules, .next, zálohy).

# Nastavenie názvu zálohy s časovou značkou
TIMESTAMP=$(date +"%Y-%m-%d_%H-%M-%S")
BACKUP_FILE="project_backup_${TIMESTAMP}.tar.gz"

# Adresáre a súbory, ktoré sa majú vylúčiť zo zálohy
EXCLUDE_DIRS=(
  "--exclude=./node_modules"
  "--exclude=./.next"
  "--exclude=./out"
  "--exclude=./.idea"
  "--exclude=./.vscode"
  "--exclude=./*.tar.gz"
)

# Vytvorenie archívu
echo "Vytváram zálohu projektu..."
tar "${EXCLUDE_DIRS[@]}" -czf "$BACKUP_FILE" .

# Kontrola, či bola záloha úspešne vytvorená
if [ -f "$BACKUP_FILE" ]; then
  echo "✅ Záloha úspešne vytvorená: $BACKUP_FILE"
else
  echo "❌ Chyba: Zálohu sa nepodarilo vytvoriť."
  exit 1
fi

exit 0
