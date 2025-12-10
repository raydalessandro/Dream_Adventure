import { useState, useEffect, useCallback } from 'react';

interface TextToSpeechProps {
  text: string;
  autoPlay?: boolean;
  onComplete?: () => void;
}

export function TextToSpeech({ text, autoPlay = false, onComplete }: TextToSpeechProps) {
  const [isReading, setIsReading] = useState(false);
  const [isAvailable, setIsAvailable] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [rate, setRate] = useState(0.9); // Slightly slower for children
  const [pitch, setPitch] = useState(1.0);

  // Check if TTS is available
  useEffect(() => {
    if ('speechSynthesis' in window) {
      setIsAvailable(true);
      
      // Load voices
      const loadVoices = () => {
        const availableVoices = window.speechSynthesis.getVoices();
        setVoices(availableVoices);
        
        // Find Italian voice (preferably female, more friendly for kids)
        const italianVoice = availableVoices.find(
          (voice) => voice.lang.startsWith('it') && voice.name.includes('Female')
        ) || availableVoices.find(
          (voice) => voice.lang.startsWith('it')
        ) || availableVoices[0];
        
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
    utterance.rate = rate;
    utterance.pitch = pitch;
    utterance.volume = 1.0;
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
  }, [text, selectedVoice, rate, pitch, isAvailable, onComplete]);

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

      {/* Speed control */}
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
