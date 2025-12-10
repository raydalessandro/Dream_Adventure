# 🎙️ Sistema Audio Narrazione - Guida Utente

Il gioco ora supporta **narrazione audio professionale** con voci naturali!

---

## 🎯 Come Funziona

### Sistema Ibrido Intelligente

L'app usa automaticamente la migliore opzione disponibile:

```
1. Audio pre-registrato (MP3)  →  🎙️ Qualità professionale
   ↓ (se non disponibile)
2. Text-to-Speech browser      →  🔊 Voce system
```

**Zero configurazione necessaria!** L'app rileva automaticamente quale usare.

---

## 🚀 Quick Start

### Per Usare Audio Pre-Registrato

#### 1. Setup una tantum (5 min)

```bash
# Installa Docker
https://docs.docker.com/get-docker/

# Installa ffmpeg
brew install ffmpeg  # Mac
sudo apt install ffmpeg  # Linux

# Test setup
cd scripts
npm run test-piper
```

#### 2. Genera Audio (10 min per tutti i nodi)

```bash
cd scripts
npm run generate
```

Aspetta... ☕

```
🎙️  Generating: start.mp3
🎙️  Generating: rocco_intro.mp3
...
✅ Generated 25 files in 8min
```

#### 3. Testa

```bash
cd ..
npm run dev
```

Apri gioco → Click "🎙️ Ascolta" → **Voce professionale!** 🎉

---

## 🎨 Personalizzazione Voce

### Cambiare Voce

Edit `scripts/audio-generation/piper-config.json`:

```json
{
  "voiceModel": "it_IT-riccardo-x_low"
}
```

Voci disponibili:
- `it_IT-riccardo-x_low` - Maschile, naturale ✅ (default)
- `it_IT-paola-medium` - Femminile, bambini

Lista completa: https://rhasspy.github.io/piper-samples/

### Cambiare Velocità/Tono

```json
{
  "narration": {
    "speed": 0.95,   // 0.5-2.0 (default: 0.95)
    "pitch": 1.0     // 0.5-2.0 (default: 1.0)
  }
}
```

Dopo modifiche: `npm run generate -- --force`

---

## 🔧 Workflow Normale

### Quando Aggiungi Nuovi Nodi

1. **Scrivi nodo** in `src/data/storyNodes.ts`
   ```typescript
   nuovo_nodo: {
     id: 'nuovo_nodo',
     text: 'Testo della storia...'
   }
   ```

2. **Genera audio**
   ```bash
   cd scripts
   npm run generate:single nuovo_nodo
   ```

3. **Test**
   ```bash
   cd ..
   npm run dev
   ```

   L'app userà automaticamente l'MP3 generato! ✅

---

## 📊 Statistiche

| Metric | Value |
|--------|-------|
| Qualità voce | ⭐⭐⭐⭐⭐ Professionale |
| Dimensione per nodo | ~30-50KB MP3 |
| Totale 25 nodi | ~1.5MB |
| Tempo generazione | ~20sec/nodo |
| Offline | ✅ 100% |

---

## 🔀 Fallback Automatico

### Se Non Hai Generato Audio

Nessun problema! L'app usa automaticamente Text-to-Speech del browser:

```
🎙️ Audio MP3 non trovato
  ↓
🔊 Usa voce browser (Google/Microsoft/Apple)
  ↓
✅ Gioco funziona comunque!
```

**Zero config, zero problemi!**

---

## 🎛️ Controlli UI

### Con Audio Pre-Registrato

```
🎙️ Ascolta  →  Play narrazione professionale
⏸️  Pausa    →  Pausa audio
⏹️  Ferma    →  Stop + reset
```

### Con TTS Browser

```
🔊 Leggi          →  Text-to-Speech browser
📖 Modalità Narrativa  →  Voce ottimizzata
⏸️  Pausa         →  Pausa lettura
```

---

## 📁 Struttura File

```
public/sounds/narration/
├── start.mp3              # ✅ Generato da Piper
├── rocco_intro.mp3        # ✅ Generato da Piper
├── zara_intro.mp3         # ✅ Generato da Piper
└── ...

// L'app controlla automaticamente:
const audioPath = `/sounds/narration/${nodeId}.mp3`;
if (exists) → Usa MP3
else → Usa TTS
```

---

## 🔄 Update Workflow

### Quando Modifichi Testo Esistente

1. Edit nodo in `storyNodes.ts`
2. Rigenera audio:
   ```bash
   cd scripts
   npm run generate:single node_id -- --force
   ```
3. Build:
   ```bash
   cd ..
   npm run build
   ```

### Quando Aggiungi Nuovi Nodi (Atto 2-3)

Audio generation è **opzionale**:

- ✅ **Con audio**: Genera MP3 → qualità top
- ✅ **Senza audio**: TTS browser → funziona uguale

Decidi tu quando/se generare audio!

---

## 💡 Best Practices

### 1. Genera Audio Incrementalmente

Non serve generare tutto subito:

```bash
# Genera solo i nuovi nodi dell'Atto 2
npm run generate:single ombra_joins
npm run generate:single ombra_backstory
npm run generate:single clockmaker_intro
```

### 2. Test Prima di Generare Tutti

```bash
# Test con 1 nodo
npm run generate:single start

# Ascolta in app
npm run dev

# Se va bene, genera tutti
npm run generate
```

### 3. Backup Audio Generati

```bash
# Salva backup
tar -czf narration-backup.tar.gz public/sounds/narration/

# Restore se necessario
tar -xzf narration-backup.tar.gz
```

---

## 🐛 Troubleshooting

### "Docker not found"
```bash
# Installa Docker Desktop
https://docs.docker.com/get-docker/
```

### "ffmpeg not found"
```bash
brew install ffmpeg  # Mac
sudo apt install ffmpeg  # Linux
```

### "Audio non si sente"
- Check volume sistema
- Test file direttamente: `open public/sounds/narration/start.mp3`
- Console browser: cerca errori

### "Audio generato ma robotico"
- Cambia voce in `piper-config.json`
- Prova `it_IT-paola-medium` (femminile)
- Riduci speed: `"speed": 0.9`

### "Build troppo grande"
- Audio MP3 sono small (~30-50KB)
- 25 nodi = ~1.5MB (accettabile)
- Se troppo: usa TTS browser (zero size)

---

## 🎉 Vantaggi Sistema Ibrido

### Audio Pre-Registrato (MP3)
- ✅ Qualità professionale
- ✅ Voce naturale e calda
- ✅ Controllabile (speed, pitch)
- ✅ Offline garantito
- ❌ Richiede generazione

### TTS Browser (Fallback)
- ✅ Zero setup
- ✅ Zero size
- ✅ Sempre disponibile
- ❌ Qualità variabile
- ❌ Voce robotica

**Usa entrambi!** MP3 per nodi principali, TTS per resto.

---

## 🚀 Comandi Rapidi

```bash
# Test setup
cd scripts && npm run test-piper

# Genera tutto
cd scripts && npm run generate

# Genera singolo
cd scripts && npm run generate:single start

# Lista voci
cd scripts && npm run list-voices

# Clean audio
rm -rf public/sounds/narration/*.mp3

# Check size
du -sh public/sounds/narration/

# Test app
npm run dev
```

---

## 📚 Risorse

- **Piper TTS**: https://github.com/rhasspy/piper
- **Voci disponibili**: https://rhasspy.github.io/piper-samples/
- **Script docs**: `scripts/audio-generation/README.md`
- **Training voci custom**: https://github.com/rhasspy/piper/blob/master/TRAINING.md

---

## ✨ Prossimi Step

Ora che hai il sistema pronto:

1. ✅ Testa con nodi esistenti
2. ✅ Genera audio per nodi principali
3. ✅ Aggiungi nuovi nodi Atto 2-3
4. ✅ Genera audio per nuovi nodi (opzionale)
5. ✅ Deploy!

**Il gioco ora ha voce professionale!** 🎙️🎉

---

*Sistema creato per Dream Adventure - Template riusabile per future storie!*
