import { useEffect } from 'react';
import { StoryNode } from './components/StoryNode';
import { PathTracker } from './components/PathTracker';
import { StatsPanel } from './components/StatsPanel';
import { CrystalCollection } from './components/CrystalCollection';
import { AudioPlayer } from './components/AudioPlayer';
import { useGameState } from './hooks/useGameState';
import { endings, determineEnding } from './data/endings';
import './styles/global.css';

function App() {
  const {
    gameState,
    getCurrentNode,
    makeChoice,
    resetGame,
    hasSavedGame,
    loadSavedGame,
    startNewGame
  } = useGameState();

  const currentNode = getCurrentNode();
  const currentEnding = currentNode?.isEnding 
    ? endings[determineEnding(
        gameState.stats,
        gameState.crystalsFound.length,
        gameState.secretsUnlocked,
        gameState.path.length,
        gameState.allies.length >= 4,
        gameState.resonancePattern
      )]
    : null;

  // Show welcome screen if at start
  const isAtStart = gameState.currentNode === 'start' && gameState.path.length === 0;
  const showSavePrompt = isAtStart && hasSavedGame();

  useEffect(() => {
    // Scroll to top on node change
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [gameState.currentNode]);

  if (showSavePrompt) {
    return (
      <div className="app-container">
        <div className="main-content">
          <div className="story-node visible">
            <div className="story-header">
              <h1 className="story-title">🌟 Benvenuto nel Regno dei Sogni! 🌟</h1>
            </div>
            
            <div className="story-text">
              <p className="story-paragraph">
                Hai un'avventura già iniziata. Vuoi continuare dove avevi lasciato,
                o iniziare una nuova storia?
              </p>
            </div>

            <div className="story-choices">
              <button 
                className="choice-button"
                onClick={loadSavedGame}
              >
                <div className="choice-emoji">📖</div>
                <div className="choice-content">
                  <div className="choice-text">Continua l'avventura salvata</div>
                  <div className="choice-preview">Riprendi da dove avevi lasciato</div>
                </div>
              </button>

              <button 
                className="choice-button"
                onClick={startNewGame}
              >
                <div className="choice-emoji">✨</div>
                <div className="choice-content">
                  <div className="choice-text">Inizia una nuova avventura</div>
                  <div className="choice-preview">Comincia dall'inizio (perderai il salvataggio)</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentNode?.isEnding && currentEnding) {
    return (
      <div className="app-container">
        <div className="main-content">
          <div className="story-node visible">
            <div className="story-header">
              <h1 className="story-title">{currentEnding.title}</h1>
            </div>

            {currentEnding.image && (
              <div className="story-image-container">
                <img 
                  src={`/images/endings/${currentEnding.image}`}
                  alt={currentEnding.title}
                  className="story-image"
                  onError={(e) => e.currentTarget.style.display = 'none'}
                />
              </div>
            )}

            <div className="story-text">
              {currentEnding.description.split('\n\n').map((paragraph, index) => (
                <p key={index} className="story-paragraph">{paragraph}</p>
              ))}
            </div>

            <div className="ending-badge">
              <div className="ending-badge-icon">
                {currentEnding.isSecret ? '🌟✨🌟' : '🎉'}
              </div>
              <div className="ending-badge-text">
                {currentEnding.achievementText}
              </div>
            </div>

            <div className="story-choices" style={{ marginTop: 'var(--spacing-xl)' }}>
              <button 
                className="choice-button"
                onClick={resetGame}
              >
                <div className="choice-emoji">🔄</div>
                <div className="choice-content">
                  <div className="choice-text">Gioca di nuovo</div>
                  <div className="choice-preview">Inizia una nuova avventura e scopri altri finali!</div>
                </div>
              </button>
            </div>
          </div>

          {/* Show final stats */}
          <div className="sidebar">
            <StatsPanel stats={gameState.stats} />
            <CrystalCollection crystalsFound={gameState.crystalsFound} />
            <PathTracker gameState={gameState} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="app-container">
        <div className="main-content">
          <StoryNode 
            node={currentNode}
            gameState={gameState}
            onChoice={makeChoice}
          />
        </div>

        <div className="sidebar">
          <StatsPanel stats={gameState.stats} />
          <CrystalCollection crystalsFound={gameState.crystalsFound} />
          <PathTracker gameState={gameState} />
        </div>
      </div>

      {/* Audio Player */}
      <AudioPlayer music={currentNode.music} />
    </>
  );
}

export default App;

