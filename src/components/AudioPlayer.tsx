import { useEffect, useRef, useState } from 'react';

interface AudioPlayerProps {
  music?: string;
  autoPlay?: boolean;
}

export function AudioPlayer({ music, autoPlay = false }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [hasError, setHasError] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!music) return;

    // Create audio element if doesn't exist
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.loop = true;
      audioRef.current.volume = volume;
      
      // Error handling
      audioRef.current.addEventListener('error', () => {
        console.warn(`Could not load audio: ${music}`);
        setHasError(true);
        setIsPlaying(false);
      });
    }

    const audio = audioRef.current;
    const newSrc = `/sounds/${music}`;
    
    // Only change if different source
    if (audio.src !== window.location.origin + newSrc) {
      setHasError(false);
      audio.src = newSrc;
      audio.load();
      
      if (autoPlay && !isMuted) {
        audio.play()
          .then(() => setIsPlaying(true))
          .catch((err) => {
            console.warn('Auto-play blocked or audio error:', err);
            setIsPlaying(false);
          });
      }
    }

    return () => {
      if (audio && !audio.paused) {
        audio.pause();
      }
    };
  }, [music, autoPlay, isMuted, volume]);

  const togglePlay = () => {
    if (!audioRef.current || hasError) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.warn('Could not play audio:', err);
          setIsPlaying(false);
        });
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  // Don't render if no music or error
  if (!music || hasError) return null;

  return (
    <div className="audio-player">
      <button
        className="audio-button"
        onClick={togglePlay}
        title={isPlaying ? 'Pausa musica' : 'Play musica'}
        aria-label={isPlaying ? 'Pausa' : 'Play'}
      >
        {isPlaying ? '⏸️' : '▶️'}
      </button>

      <button
        className="audio-button"
        onClick={toggleMute}
        title={isMuted ? 'Attiva audio' : 'Silenzia audio'}
        aria-label={isMuted ? 'Unmute' : 'Mute'}
      >
        {isMuted ? '🔇' : '🔊'}
      </button>

      <div className="volume-control">
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={volume}
          onChange={handleVolumeChange}
          className="volume-slider"
          title="Volume"
          aria-label="Volume slider"
        />
      </div>
    </div>
  );
}
