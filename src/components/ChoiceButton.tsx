import { useState } from 'react';
import type { Choice } from '../types';

interface ChoiceButtonProps {
  choice: Choice;
  onChoose: () => void;
  disabled?: boolean;
}

export function ChoiceButton({ choice, onChoose, disabled = false }: ChoiceButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const handleClick = () => {
    if (disabled) return;
    
    setIsPressed(true);
    
    // Play click sound if available
    const audio = new Audio('/sounds/click.mp3');
    audio.volume = 0.3;
    audio.play().catch(() => {/* Silent fail */});
    
    // Small delay for animation feedback
    setTimeout(() => {
      onChoose();
    }, 150);
  };

  return (
    <button
      className={`choice-button ${isPressed ? 'pressed' : ''} ${disabled ? 'disabled' : ''}`}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      disabled={disabled}
      aria-label={choice.text}
    >
      <div className="choice-emoji">{choice.emoji}</div>
      <div className="choice-content">
        <div className="choice-text">{choice.text}</div>
        {choice.preview && isHovered && (
          <div className="choice-preview">{choice.preview}</div>
        )}
      </div>
      <div className="choice-glow" />
    </button>
  );
}
