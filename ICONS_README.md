# 🎨 Come Creare le Icone PWA

Il gioco funziona senza icone, ma per un'esperienza PWA completa servono 2 icone.

## Opzione 1: Usa il generatore HTML (Più facile)

1. Apri in un browser: `public/create-icons.html`
2. Click su "Download Icons"
3. Salva i 2 file nella cartella `public/`

## Opzione 2: Usa un tool online

1. Vai su https://www.favicon-generator.org/
2. Carica un'immagine 512x512 (può essere il logo, uno screenshot, o l'emoji 🌟)
3. Download e rinomina:
   - `android-chrome-192x192.png` → `icon-192x192.png`
   - `android-chrome-512x512.png` → `icon-512x512.png`
4. Metti i file in `public/`

## Opzione 3: Crea manualmente

Se hai un tool di grafica (Canva, Figma, Photoshop):

1. Crea 2 immagini PNG:
   - 192x192px → `icon-192x192.png`
   - 512x512px → `icon-512x512.png`
2. Usa colori del gioco:
   - Gradiente da `#667eea` a `#f093fb`
   - Emoji 🌟 al centro (o Rocco/Zara)
3. Salva in `public/`

## Verifica

Dopo aver aggiunto le icone:

```bash
npm run build
npm run preview
```

Poi vai su Chrome DevTools > Application > Manifest e verifica che le icone appaiano.

## Note

- **Le icone sono opzionali**: L'app funziona senza
- **Ma migliora UX**: Con icone, l'app appare professionale quando "installata" su home screen
- **Formato**: Solo PNG supportato
- **Dimensioni**: Devono essere esatte (192x192 e 512x512)
