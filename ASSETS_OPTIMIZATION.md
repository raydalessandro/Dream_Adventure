# 🖼️ Ottimizzazione Assets - Guida

L'app ha ora un sistema di compressione automatica per mantenere il bundle piccolo e veloce.

## Immagini

### Auto-Compressione WebP

Tutte le immagini vengono automaticamente convertite a WebP (80% quality) durante il build.

**Come aggiungere immagini:**

```
public/
  images/
    locations/
      forest.jpg          ← Metti qui (anche JPG/PNG)
      mountain.png
    characters/
      rocco.jpg
    endings/
      victory.png
```

Durante il build, Vite le ottimizza automaticamente.

**Risultato:**
- JPG 500KB → WebP ~150KB
- PNG 300KB → WebP ~80KB
- Risparmio: ~60-70%

### Disabilitare Compressione (Opzionale)

Se vuoi mantenere un'immagine originale:

```typescript
import image from './special.png?skipCompression'
```

## Audio

### Formato Consigliato

Per mantenere il bundle piccolo:

1. **Musica di background**: usa `.mp3` a 128kbps
2. **Effetti sonori**: usa `.mp3` a 96kbps o meno

**Compressione manuale audio:**

```bash
# Con ffmpeg (se installato)
ffmpeg -i input.wav -b:a 128k -ac 1 output.mp3

# Online: https://www.freeconvert.com/audio-compressor
```

**Dimensioni target:**
- Musica (2-3 min): ~2-3MB
- Effetti (1-2 sec): ~20-50KB

## Build Size Target

```
Target finale:
- JS Bundle: ~260KB (83KB gzipped)
- CSS: ~19KB (3.8KB gzipped)
- Assets totali: <10MB (con tutte le immagini)

Senza immagini: ~280KB totale ✅
```

## Verifica Ottimizzazione

```bash
npm run build

# Check size
du -sh dist/assets/*

# Preview ottimizzato
npm run preview
```

## Lazy Loading Immagini

Le immagini sono caricate solo quando necessarie:

```typescript
// In storyNodes.ts
{
  image: 'forest_entrance.jpg',  // Caricata solo quando visiti questo nodo
  music: 'forest_ambient.mp3'    // Caricata solo quando arrivi qui
}
```

## Best Practices

1. **Dimensioni massime immagini:**
   - Locations: 1200x800px max
   - Characters: 800x800px max
   - Endings: 1200x900px max

2. **Formati source:**
   - JPG per foto/illustrazioni
   - PNG per grafica con trasparenze
   - SVG per icone/loghi

3. **Naming:**
   - `forest_entrance.jpg` ✅
   - `Forest Entrance (1).JPG` ❌

4. **Test su mobile:**
   - Connessione lenta: Lighthouse throttle
   - Cache: Apri DevTools > Network > Disable cache

## Storage Offline

Con il service worker PWA:
- Prima visita: Download tutto (~280KB base)
- Visite successive: Tutto da cache (offline)
- Nuove immagini: Download on-demand e cached

## Troubleshooting

**Immagini non si vedono dopo build?**
- Check path: `/images/` non `./images/`
- Check nome file: case-sensitive
- Check formato: jpg/png/webp supported

**Build troppo grande?**
- Riduci resolution immagini
- Comprimi audio a bitrate più basso
- Rimuovi asset non usati

**Audio non carica offline?**
- Verifica che il file sia in `public/sounds/`
- Check service worker cache (DevTools > Application > Cache Storage)
