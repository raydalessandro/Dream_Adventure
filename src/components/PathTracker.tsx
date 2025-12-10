import type { GameState } from '../types';

interface PathTrackerProps {
  gameState: GameState;
}

export function PathTracker({ gameState }: PathTrackerProps) {
  const { path, visitedNodes } = gameState;

  return (
    <div className="path-tracker">
      <div className="path-header">
        <span className="path-title">📍 Il Tuo Viaggio</span>
        <span className="path-count">{visitedNodes.size} luoghi visitati</span>
      </div>
      
      <div className="path-symbols">
        {path.map((symbol, index) => (
          <div
            key={index}
            className="path-symbol"
            style={{
              background: `hsl(${(index * 25) % 360}, 70%, 60%)`,
              animationDelay: `${index * 0.05}s`
            }}
            title={`Scelta ${index + 1}`}
          >
            {symbol}
          </div>
        ))}
      </div>

      {gameState.resonancePattern.length > 0 && (
        <div className="resonance-indicator">
          <span className="resonance-label">✨ Risonanza:</span>
          <div className="resonance-badges">
            {[...new Set(gameState.resonancePattern)].map((pattern, index) => (
              <span key={index} className={`resonance-badge ${pattern}`}>
                {pattern}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
