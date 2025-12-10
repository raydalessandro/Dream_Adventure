import { useEffect, useRef, useState } from 'react';

interface AudioPlayerProps {
  music?: string;
  autoPlay?: boolean;
}

export function AudioPlayer({ music, autoPlay = true }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!music) return;

    // Create or update audio element
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.loop = true;
      audioRef.current.volume = volume;
    }

    // Change source if different
    const newSrc = `/sounds/${music}`;
    if (audioRef.current.src !== newSrc) {
      audioRef.current.src = newSrc;
      
      if (autoPlay && !isMuted) {
        audioRef.current.play().catch(() => {
          // Auto-play blocked by browser, will need user interaction
          setIsPlaying(false);
        });
        setIsPlaying(true);
      }
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [music, autoPlay, isMuted, volume]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(() => {
        console.log('Could not play audio');
      });
      setIsPlaying(true);
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

  if (!music) return null;

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
