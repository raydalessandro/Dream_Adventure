import { useState, useEffect, useCallback } from 'react';

interface TextToSpeechProps {
  text: string;
  autoPlay?: boolean;
  onComplete?: () => void;
}

/**
 * Trova la voce italiana più naturale per narrazione
 * Ranking intelligente basato su qualità voce
 */
function findBestItalianVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null {
  // Filtra solo voci italiane
  const italianVoices = voices.filter((v) =>
    v.lang.startsWith('it-IT') || v.lang.startsWith('it')
  );

  if (italianVoices.length === 0) return voices[0] || null;

  // Ranking voci per naturalezza (da migliore a peggiore)
  const voiceRanking = [
    // Google voci (Chrome) - le migliori
    'Google italiano',
    'Google Italiano',

    // Microsoft voci naturali (Edge)
    'Microsoft Elsa',
    'Microsoft Cosimo',
    'Microsoft Diego',

    // Apple voci (Safari)
    'Alice',
    'Luca',
    'Federica',
    'Paola',

    // Voci system generiche
    'italian',
    'italiano'
  ];

  // Cerca voce nel ranking
  for (const rankName of voiceRanking) {
    const found = italianVoices.find((v) =>
      v.name.toLowerCase().includes(rankName.toLowerCase())
    );
    if (found) {
      console.log(`🎙️ Voce selezionata: ${found.name} (${found.lang})`);
      return found;
    }
  }

  // Fallback: preferisci voci con "female" o "natural" nel nome
  const preferredVoice = italianVoices.find((v) =>
    v.name.toLowerCase().includes('female') ||
    v.name.toLowerCase().includes('natural') ||
    v.name.toLowerCase().includes('enhanced')
  );

  if (preferredVoice) {
    console.log(`🎙️ Voce preferita: ${preferredVoice.name}`);
    return preferredVoice;
  }

  // Ultima risorsa: prima voce italiana disponibile
  console.log(`🎙️ Voce default: ${italianVoices[0].name}`);
  return italianVoices[0];
}

export function TextToSpeech({ text, autoPlay = false, onComplete }: TextToSpeechProps) {
  const [isReading, setIsReading] = useState(false);
  const [isAvailable, setIsAvailable] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [rate, setRate] = useState(0.85); // Ottimizzato per narrazione
  const [pitch, setPitch] = useState(0.95); // Leggermente più basso per naturalezza
  const [narrativeMode, setNarrativeMode] = useState(true); // Modalità narrativa attiva di default

  // Check if TTS is available
  useEffect(() => {
    if ('speechSynthesis' in window) {
      setIsAvailable(true);

      // Load voices
      const loadVoices = () => {
        const availableVoices = window.speechSynthesis.getVoices();
        setVoices(availableVoices);

        // Trova la voce italiana più naturale (ranking intelligente)
        const italianVoice = findBestItalianVoice(availableVoices);

        setSelectedVoice(italianVoice);
      };

      loadVoices();
      
      // Some browsers load voices async
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  const speak = useCallback(() => {
    if (!isAvailable || !text || !selectedVoice) return;

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = selectedVoice;

    // Applica modalità narrativa se attiva
    if (narrativeMode) {
      utterance.rate = 0.85; // Più lento per narrazione
      utterance.pitch = 0.95; // Tono leggermente più basso
      utterance.volume = 1.0;
    } else {
      utterance.rate = rate;
      utterance.pitch = pitch;
      utterance.volume = 1.0;
    }

    utterance.lang = 'it-IT';

    utterance.onstart = () => setIsReading(true);
    utterance.onend = () => {
      setIsReading(false);
      onComplete?.();
    };
    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event);
      setIsReading(false);
    };

    window.speechSynthesis.speak(utterance);
  }, [text, selectedVoice, rate, pitch, narrativeMode, isAvailable, onComplete]);

  // Preset: Modalità Narrativa
  const toggleNarrativeMode = () => {
    setNarrativeMode(!narrativeMode);
    if (!narrativeMode) {
      // Attiva modalità narrativa
      setRate(0.85);
      setPitch(0.95);
    } else {
      // Modalità normale
      setRate(0.9);
      setPitch(1.0);
    }
  };

  const stop = useCallback(() => {
    window.speechSynthesis.cancel();
    setIsReading(false);
  }, []);

  const pause = useCallback(() => {
    if (isReading) {
      window.speechSynthesis.pause();
    }
  }, [isReading]);

  const resume = useCallback(() => {
    if (isReading) {
      window.speechSynthesis.resume();
    }
  }, [isReading]);

  // Auto-play if requested
  useEffect(() => {
    if (autoPlay && text && selectedVoice) {
      // Small delay to ensure everything is loaded
      const timer = setTimeout(() => speak(), 500);
      return () => clearTimeout(timer);
    }
  }, [autoPlay, text, selectedVoice, speak]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  if (!isAvailable) return null;

  return (
    <div className="text-to-speech">
      <div className="tts-controls">
        <button
          className="tts-button"
          onClick={isReading ? stop : speak}
          title={isReading ? 'Ferma lettura' : 'Leggi ad alta voce'}
          aria-label={isReading ? 'Stop' : 'Leggi'}
        >
          {isReading ? '⏹️' : '🔊'}
          <span className="tts-button-label">
            {isReading ? 'Ferma' : 'Leggi'}
          </span>
        </button>

        {isReading && (
          <>
            <button
              className="tts-button-small"
              onClick={pause}
              title="Pausa"
              aria-label="Pausa"
            >
              ⏸️
            </button>
            <button
              className="tts-button-small"
              onClick={resume}
              title="Riprendi"
              aria-label="Riprendi"
            >
              ▶️
            </button>
          </>
        )}
      </div>

      {/* Modalità Narrativa Toggle */}
      <div className="tts-setting">
        <label className="tts-label tts-narrative-toggle">
          <input
            type="checkbox"
            checked={narrativeMode}
            onChange={toggleNarrativeMode}
            disabled={isReading}
            className="tts-checkbox"
          />
          <span className="tts-checkbox-label">
            📖 Modalità Narrativa {narrativeMode ? '(attiva)' : ''}
          </span>
        </label>
        <p className="tts-help-text">
          Voce ottimizzata per lettura storie (più lenta e naturale)
        </p>
      </div>

      {/* Speed control (solo se modalità narrativa disattivata) */}
      {!narrativeMode && (
        <div className="tts-setting">
          <label className="tts-label">
            Velocità: {rate.toFixed(1)}x
            <input
              type="range"
              min="0.5"
              max="1.5"
              step="0.1"
              value={rate}
              onChange={(e) => setRate(parseFloat(e.target.value))}
              className="tts-slider"
              disabled={isReading}
            />
          </label>
        </div>
      )}

      {/* Voice selector (advanced) */}
      {voices.length > 1 && (
        <details className="tts-advanced">
          <summary className="tts-summary">Opzioni avanzate</summary>
          <div className="tts-voice-selector">
            <label className="tts-label">
              Voce:
              <select
                value={selectedVoice?.name || ''}
                onChange={(e) => {
                  const voice = voices.find((v) => v.name === e.target.value);
                  if (voice) setSelectedVoice(voice);
                }}
                className="tts-select"
                disabled={isReading}
              >
                {voices
                  .filter((voice) => voice.lang.startsWith('it'))
                  .map((voice) => (
                    <option key={voice.name} value={voice.name}>
                      {voice.name} ({voice.lang})
                    </option>
                  ))}
              </select>
            </label>

            <label className="tts-label">
              Tono: {pitch.toFixed(1)}
              <input
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                value={pitch}
                onChange={(e) => setPitch(parseFloat(e.target.value))}
                className="tts-slider"
                disabled={isReading}
              />
            </label>
          </div>
        </details>
      )}
    </div>
  );
}
