import { useState, useEffect } from 'react';
import type { StoryNode as StoryNodeType, GameState, Choice } from '../types';
import { ChoiceButton } from './ChoiceButton';

interface StoryNodeProps {
  node: StoryNodeType;
  gameState: GameState;
  onChoice: (choice: Choice) => void;
}

export function StoryNode({ node, gameState, onChoice }: StoryNodeProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [showChoices, setShowChoices] = useState(false);

  // Fade in animation on mount
  useEffect(() => {
    setIsVisible(false);
    setDisplayedText('');
    setIsTyping(true);
    setShowChoices(false);
    
    setTimeout(() => setIsVisible(true), 50);
  }, [node.id]);

  // Typewriter effect for text
  useEffect(() => {
    if (!isVisible) return;

    const text = node.text;
    let currentIndex = 0;
    
    // Speed: 30ms per carattere (circa 33 caratteri/sec)
    const typingSpeed = 20;
    
    const interval = setInterval(() => {
      if (currentIndex <= text.length) {
        setDisplayedText(text.slice(0, currentIndex));
        currentIndex++;
      } else {
        setIsTyping(false);
        setShowChoices(true);
        clearInterval(interval);
      }
    }, typingSpeed);

    return () => clearInterval(interval);
  }, [isVisible, node.text]);

  // Skip typewriter on click
  const skipTyping = () => {
    if (isTyping) {
      setDisplayedText(node.text);
      setIsTyping(false);
      setShowChoices(true);
    }
  };

  // Filter choices based on conditions
  const availableChoices = [...node.choices];
  
  // Add conditional choices if requirements are met
  if (node.conditionalChoices) {
    node.conditionalChoices.forEach(({ requires, choice }) => {
      let conditionMet = false;
      
      if (typeof requires === 'function') {
        conditionMet = requires(gameState);
      } else {
        // Check if all required stats are met
        conditionMet = Object.entries(requires).every(
          ([stat, value]) => gameState.stats[stat as keyof typeof gameState.stats] >= value
        );
      }
      
      if (conditionMet) {
        availableChoices.push(choice);
      }
    });
  }

  return (
    <div className={`story-node ${isVisible ? 'visible' : ''}`}>
      {/* Header with title */}
      <div className="story-header">
        <h2 className="story-title">{node.title}</h2>
      </div>

      {/* Image if present */}
      {node.image && (
        <div className="story-image-container">
          <img 
            src={`/images/locations/${node.image}`} 
            alt={node.title}
            className="story-image"
            onError={(e) => {
              // Fallback if image doesn't exist
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>
      )}

      {/* Story text */}
      <div className="story-text" onClick={skipTyping}>
        {displayedText.split('\n\n').map((paragraph, index) => (
          <p key={index} className="story-paragraph">
            {paragraph}
          </p>
        ))}
        {isTyping && <span className="cursor">▋</span>}
      </div>

      {/* Typing indicator */}
      {isTyping && (
        <div className="typing-hint">
          <span className="typing-hint-text">Click per continuare...</span>
        </div>
      )}

      {/* Choices */}
      {showChoices && (
        <div className="story-choices">
          {availableChoices.map((choice) => (
            <ChoiceButton
              key={choice.id}
              choice={choice}
              onChoose={() => onChoice(choice)}
              disabled={false}
            />
          ))}
        </div>
      )}

      {/* Ending screen if it's an ending */}
      {node.isEnding && showChoices && (
        <div className="ending-badge">
          <div className="ending-badge-icon">🌟</div>
          <div className="ending-badge-text">Fine della Storia</div>
        </div>
      )}
    </div>
  );
}
