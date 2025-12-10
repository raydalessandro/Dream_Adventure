import { useState, useEffect, useRef } from 'react';

interface NarrationPlayerProps {
  nodeId: string;
  autoPlay?: boolean;
  onComplete?: () => void;
}

/**
 * 🎙️ NarrationPlayer
 *
 * Riproduce audio narrazione pre-registrato per un nodo.
 * Fallback automatico a TextToSpeech se audio non disponibile.
 */
export function NarrationPlayer({ nodeId, autoPlay = false, onComplete }: NarrationPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasAudio, setHasAudio] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioPath = `/sounds/narration/${nodeId}.mp3`;

  // Check if audio file exists
  useEffect(() => {
    const checkAudio = async () => {
      try {
        const response = await fetch(audioPath, { method: 'HEAD' });

        if (response.ok) {
          setHasAudio(true);
          console.log(`🎙️ Narration audio found: ${nodeId}.mp3`);
        } else {
          setHasAudio(false);
          console.log(`ℹ️  No narration audio for: ${nodeId}, will use TTS fallback`);
        }
      } catch (err) {
        setHasAudio(false);
        console.log(`ℹ️  Audio check failed for: ${nodeId}, will use TTS fallback`);
      } finally {
        setIsLoading(false);
      }
    };

    checkAudio();
  }, [nodeId, audioPath]);

  // Setup audio element
  useEffect(() => {
    if (!hasAudio) return;

    const audio = new Audio(audioPath);
    audioRef.current = audio;

    audio.addEventListener('canplay', () => {
      setIsLoading(false);
    });

    audio.addEventListener('ended', () => {
      setIsPlaying(false);
      onComplete?.();
    });

    audio.addEventListener('error', (e) => {
      console.error('Audio error:', e);
      setError('Errore nel caricamento audio');
      setHasAudio(false);
    });

    // Auto-play if requested
    if (autoPlay) {
      audio.play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.warn('Auto-play blocked:', err);
          setIsPlaying(false);
        });
    }

    return () => {
      audio.pause();
      audio.src = '';
    };
  }, [hasAudio, audioPath, autoPlay, onComplete]);

  const play = () => {
    if (!audioRef.current) return;

    audioRef.current.play()
      .then(() => setIsPlaying(true))
      .catch((err) => {
        console.error('Play error:', err);
        setError('Errore nella riproduzione');
      });
  };

  const pause = () => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const stop = () => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setIsPlaying(false);
  };

  // Don't render if no audio (parent will use TTS fallback)
  if (!hasAudio) return null;

  if (error) {
    return (
      <div className="narration-player error">
        <p className="narration-error">⚠️ {error}</p>
      </div>
    );
  }

  return (
    <div className="narration-player">
      <div className="narration-controls">
        <button
          className="narration-button"
          onClick={isPlaying ? stop : play}
          disabled={isLoading}
          title={isPlaying ? 'Ferma narrazione' : 'Ascolta narrazione'}
          aria-label={isPlaying ? 'Stop' : 'Play'}
        >
          {isLoading ? '⏳' : isPlaying ? '⏹️' : '🎙️'}
          <span className="narration-button-label">
            {isLoading ? 'Caricamento...' : isPlaying ? 'Ferma' : 'Ascolta'}
          </span>
        </button>

        {isPlaying && (
          <button
            className="narration-button-small"
            onClick={pause}
            title="Pausa"
            aria-label="Pausa"
          >
            ⏸️
          </button>
        )}
      </div>

      <p className="narration-info">
        🎙️ Narrazione professionale
      </p>
    </div>
  );
}
