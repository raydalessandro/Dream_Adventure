# 🎙️ Audio Generation per Dream Adventure

Sistema modulare per generare narrazione audio professionale usando **Piper TTS** (open source).

---

## 🚀 Quick Start

### 1. Prerequisiti

```bash
# Installa Docker
# https://docs.docker.com/get-docker/

# Installa ffmpeg
# Mac:
brew install ffmpeg

# Linux:
sudo apt install ffmpeg

# Windows:
# Download da https://ffmpeg.org/download.html
```

### 2. Test Setup

```bash
cd scripts
npm run test-piper
```

Dovresti vedere:
```
✅ Docker installed
✅ Piper image available
✅ ffmpeg installed
🎉 All dependencies ready!
```

### 3. Genera Audio

```bash
# Genera TUTTI i nodi (prima volta: ~5-10 min)
npm run generate

# Genera singolo nodo
npm run generate:single start

# Rigenera forzando overwrite
npm run generate -- --force
```

---

## 📂 Struttura Output

```
public/sounds/narration/
├── start.mp3              # 🎙️ "Svegliati... svegliati..."
├── rocco_intro.mp3        # 🎙️ "Sono Rocco! Mi piace..."
├── zara_intro.mp3         # 🎙️ "Sono Zara! Mi piace..."
└── ... (tutti i nodi)
```

**Dimensioni:** ~30-50KB per nodo (128kbps MP3)
**Totale:** ~1-2MB per 25 nodi

---

## 🎛️ Configurazione

Edit `piper-config.json`:

```json
{
  "voiceModel": "it_IT-riccardo-x_low",
  "narration": {
    "speed": 0.95,      // Velocità (0.5-2.0)
    "pitch": 1.0,       // Tono (0.5-2.0)
    "pauseBetweenSentences": 0.3,
    "pauseBetweenParagraphs": 0.8
  }
}
```

### Cambiare Voce

```bash
# Lista voci disponibili
npm run list-voices
```

Voci italiane Piper:
- `it_IT-riccardo-x_low` - Maschile, naturale (default)
- `it_IT-paola-medium` - Femminile, adatta bambini

Modifica `voiceModel` in `piper-config.json` e rigenera.

---

## 🔧 Come Funziona

### Pipeline

```
Story Nodes → Extract Text → Piper TTS → WAV → ffmpeg → MP3 → public/sounds/
```

1. **Parse** `src/data/storyNodes.ts`
2. **Estrae** testo da ogni nodo
3. **Genera** WAV con Piper (Docker)
4. **Converte** WAV → MP3 con ffmpeg
5. **Salva** in `public/sounds/narration/`

### Docker Command (interno)

```bash
echo "Testo da narrare" | docker run -i --rm \
  -v "./public/sounds/narration:/output" \
  ghcr.io/rhasspy/piper:latest \
  --model it_IT-riccardo-x_low \
  --output_file /output/nodo.wav
```

---

## 🎯 Workflow Consigliato

### Per Nodi Esistenti (Prima Volta)

```bash
cd scripts
npm run generate
```

Aspetta 5-10 minuti → Tutti i file MP3 pronti! 🎉

### Quando Aggiungi Nuovi Nodi

1. Scrivi nuovo nodo in `src/data/storyNodes.ts`
2. Genera audio:
   ```bash
   cd scripts
   npm run generate:single nuovo_nodo_id
   ```
3. Build app:
   ```bash
   cd ..
   npm run build
   ```

L'app userà automaticamente l'audio pre-registrato! ✅

---

## 🔄 Integration con App

### Auto-Detect

L'app controlla automaticamente:

```javascript
// In StoryNode component
const audioPath = `/sounds/narration/${nodeId}.mp3`;

if (audioFileExists(audioPath)) {
  // Usa NarrationPlayer (audio pre-registrato)
  <NarrationPlayer audioPath={audioPath} />
} else {
  // Fallback a TextToSpeech (Web Speech API)
  <TextToSpeech text={nodeText} />
}
```

### Nessuna Modifica Necessaria

- ✅ Audio esiste → Usa MP3
- ✅ Audio mancante → Usa TTS browser
- ✅ Graceful fallback sempre

---

## 🐛 Troubleshooting

### "Docker not found"
```bash
# Installa Docker Desktop
https://docs.docker.com/get-docker/
```

### "ffmpeg not found"
```bash
# Mac
brew install ffmpeg

# Linux
sudo apt install ffmpeg
```

### "Piper image not pulling"
```bash
# Pull manualmente
docker pull ghcr.io/rhasspy/piper:latest
```

### "Audio generato ma muto"
- Check volume sistema
- Prova file direttamente: `ffplay public/sounds/narration/start.mp3`
- Verifica bitrate in config

### "Script non trova storyNodes.ts"
- Esegui sempre da `scripts/` directory
- Check path relativo in `generate-audio.js`

---

## 📝 Comandi Utili

```bash
# Genera tutto
npm run generate

# Genera singolo nodo
npm run generate:single start

# Rigenera forzando
npm run generate -- --force

# Lista voci
npm run list-voices

# Test setup
npm run test-piper

# Clean audio (rimuovi tutti MP3)
rm -rf ../public/sounds/narration/*.mp3

# Check dimensioni
du -sh ../public/sounds/narration/
```

---

## 🎨 Personalizzazione

### Aggiungere Effetti

Edit script per aggiungere:
- Reverb
- EQ
- Normalizzazione
- Fade in/out

Esempio con ffmpeg:
```bash
ffmpeg -i input.mp3 -af "aecho=0.8:0.88:60:0.4" output.mp3
```

### Voci Custom

Piper supporta training voci custom. Vedi:
https://github.com/rhasspy/piper/blob/master/TRAINING.md

---

## 📊 Performance

| Metric | Value |
|--------|-------|
| Generazione per nodo | ~15-20sec |
| Dimensione MP3 | ~30-50KB |
| Qualità audio | 22kHz, 128kbps |
| Totale 25 nodi | ~5-8min, ~1.5MB |

---

## 🔮 Roadmap

- [ ] Batch processing parallelo
- [ ] Cache voci Docker
- [ ] UI web per generazione
- [ ] Preview audio prima di salvare
- [ ] Multiple voice support per personaggio
- [ ] SSML support per pause custom

---

## 🙏 Credits

- **Piper TTS**: https://github.com/rhasspy/piper
- **Italian voices**: Rhasspy community
- **ffmpeg**: https://ffmpeg.org/

---

## 📄 License

Script MIT licensed.
Piper TTS: MIT licensed.
Generated audio: Your content, your license!
