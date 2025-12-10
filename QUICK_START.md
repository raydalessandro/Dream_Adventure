# 🚀 QUICK START GUIDE

## Setup in 3 Step:

### 1. Estrai l'archivio
```bash
tar -xzf react-dream-adventure.tar.gz
cd react-dream-adventure
```

### 2. Installa dipendenze
```bash
npm install
```

### 3. Avvia il dev server
```bash
npm run dev
```

Apri browser su: **http://localhost:5173**

---

## 🎮 Il Gioco Funziona!

Puoi già:
- ✅ Giocare Atto 1 completo (~25 nodi)
- ✅ Scegliere personaggio (Rocco/Zara/Spirito Duale)
- ✅ Esplorare Foresta, Montagna, Lago
- ✅ Raccogliere cristalli
- ✅ Reclutare alleati
- ✅ Vedere stats live
- ✅ Salvare automaticamente
- ✅ Raggiungere finali (8 diversi)

---

## 📦 Deploy su Vercel/Netlify

### Opzione A: Vercel
```bash
# Installa Vercel CLI
npm i -g vercel

# Deploy
cd react-dream-adventure
vercel
```

### Opzione B: Netlify
```bash
# Build
npm run build

# Poi:
# 1. Vai su netlify.com
# 2. Trascina cartella dist/
# 3. Done!
```

### Opzione C: GitHub Pages
```bash
# In package.json aggiungi:
# "homepage": "https://tuousername.github.io/dream-adventure"

# Build
npm run build

# Push su GitHub
# Abilita GitHub Pages su Settings > Pages
```

---

## 🎨 Assets Opzionali

### Audio (consigliato)
Aggiungi file .mp3 in `public/sounds/`:
- `ambient.mp3` - musica background
- `click.mp3` - effetto click
- `unlock.mp3` - sblocco cristallo
- etc.

**Frequenza consigliata:** 432Hz per effetto calmante

### Immagini (opzionale)
Aggiungi illustrazioni in `public/images/`:
- `locations/` - scenari
- `rocco/` - personaggio
- `zara/` - personaggio
- `crystals/` - cristalli
- `endings/` - finali

**Formato:** .jpg o .png, max 500KB ciascuna

---

## 🛠️ Comandi Utili

```bash
# Dev server (hot reload)
npm run dev

# Build produzione
npm run build

# Preview build locale
npm run preview

# TypeScript check
npx tsc --noEmit

# Format code
npx prettier --write src/
```

---

## 📝 Prossimi Step (Opzionale)

### Completare la Storia
Il gioco ha ~25 nodi su 50+ pianificati.

Per aggiungere più nodi:
1. Apri `src/data/storyNodes.ts`
2. Aggiungi nuovi nodi seguendo lo schema
3. Collega con scelte esistenti
4. Test e deploy!

### Personalizzazioni
- **Colori:** `src/styles/global.css` → `:root` variables
- **Font:** Modifica import Google Fonts nel CSS
- **Velocità typing:** `StoryNode.tsx` → `typingSpeed`
- **Stats max:** `StatsPanel.tsx` → `statConfig.max`

---

## 🐛 Troubleshooting

**Build fallisce?**
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

**Audio non funziona?**
- Controlla browser console per errori
- Alcuni browser bloccano autoplay
- Click sul player per play manuale

**localStorage non salva?**
- Disabilita modalità incognito
- Check privacy settings browser

---

## 📧 Support

Se qualcosa non funziona:
1. Check browser console (F12)
2. Verifica versione Node (min 18.x)
3. Leggi error messages

**Il progetto è production-ready** ma manca contenuto narrativo.
Atto 1 è completo e giocabile! 🎉

---

## 🌟 Enjoy!

Buon divertimento con la creazione del Regno dei Sogni! 🌈
