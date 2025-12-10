import { useState, useCallback, useEffect } from 'react';
import type { GameState, Choice } from '../types';
import { storyNodes } from '../data/storyNodes';
import { useLocalStorage } from './useLocalStorage';

const initialGameState: GameState = {
  currentNode: 'start',
  character: null,
  path: [],
  stats: {
    courage: 0,
    kindness: 0,
    curiosity: 0,
    magic: 0
  },
  crystalsFound: [],
  resonancePattern: [],
  allies: [],
  specialItems: [],
  visitedNodes: new Set<string>(),
  secretsUnlocked: 0
};

export function useGameState() {
  // Load saved game if exists
  const [savedState, setSavedState] = useLocalStorage<GameState | null>('game_state', null);
  
  // Initialize game state
  const [gameState, setGameState] = useState<GameState>(() => {
    if (savedState) {
      // Restore Set from array
      return {
        ...savedState,
        visitedNodes: new Set(Array.isArray(savedState.visitedNodes) 
          ? savedState.visitedNodes 
          : [])
      };
    }
    return initialGameState;
  });

  // Save game state whenever it changes
  useEffect(() => {
    // Convert Set to Array for JSON serialization
    const stateToSave = {
      ...gameState,
      visitedNodes: Array.from(gameState.visitedNodes)
    };
    setSavedState(stateToSave as any); // Type assertion for Set/Array conversion
  }, [gameState, setSavedState]);

  // Get current node
  const getCurrentNode = useCallback(() => {
    const node = storyNodes[gameState.currentNode];
    if (!node) {
      console.error(`Node not found: ${gameState.currentNode}`);
      // Fallback to start if node missing
      return storyNodes['start'];
    }
    return node;
  }, [gameState.currentNode]);

  // Make a choice and update game state
  const makeChoice = useCallback((choice: Choice) => {
    setGameState(prevState => {
      const newState = { ...prevState };

      // Add choice symbol to path
      newState.path = [...newState.path, choice.emoji];

      // Update stats if choice has stat modifiers
      if (choice.stats) {
        newState.stats = {
          courage: newState.stats.courage + (choice.stats.courage || 0),
          kindness: newState.stats.kindness + (choice.stats.kindness || 0),
          curiosity: newState.stats.curiosity + (choice.stats.curiosity || 0),
          magic: newState.stats.magic + (choice.stats.magic || 0)
        };
      }

      // Track resonance pattern
      if (choice.resonance) {
        newState.resonancePattern = [...newState.resonancePattern, choice.resonance];
      }

      // Apply choice effects
      if (choice.effects) {
        choice.effects(newState);
      }

      // Move to next node (with validation)
      if (!storyNodes[choice.next]) {
        console.error(`Invalid next node: ${choice.next}`);
        // Stay on current node if next is invalid
        return prevState;
      }
      
      newState.currentNode = choice.next;
      
      // Mark node as visited
      newState.visitedNodes = new Set(newState.visitedNodes);
      newState.visitedNodes.add(choice.next);

      // Execute onEnter effects of new node if it exists
      const nextNode = storyNodes[choice.next];
      if (nextNode?.onEnter) {
        try {
          nextNode.onEnter(newState);
        } catch (error) {
          console.error('Error in onEnter effect:', error);
        }
      }

      return newState;
    });
  }, []);

  // Reset game to start
  const resetGame = useCallback(() => {
    setGameState(initialGameState);
  }, []);

  // Check if saved game exists
  const hasSavedGame = useCallback(() => {
    return savedState !== null && savedState.currentNode !== 'start';
  }, [savedState]);

  // Load saved game
  const loadSavedGame = useCallback(() => {
    if (savedState) {
      setGameState({
        ...savedState,
        visitedNodes: new Set(Array.isArray(savedState.visitedNodes) 
          ? savedState.visitedNodes 
          : [])
      });
    }
  }, [savedState]);

  // New game (clear save)
  const startNewGame = useCallback(() => {
    setSavedState(null);
    setGameState(initialGameState);
  }, [setSavedState]);

  // Export save as JSON file
  const exportSave = useCallback(() => {
    try {
      const saveData = {
        ...gameState,
        visitedNodes: Array.from(gameState.visitedNodes),
        exportDate: new Date().toISOString(),
        version: '1.0'
      };

      const dataStr = JSON.stringify(saveData, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);

      const link = document.createElement('a');
      link.href = url;
      link.download = `dream-adventure-save-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      return true;
    } catch (error) {
      console.error('Error exporting save:', error);
      return false;
    }
  }, [gameState]);

  // Import save from JSON file
  const importSave = useCallback((file: File) => {
    return new Promise<boolean>((resolve) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        try {
          const content = e.target?.result as string;
          const saveData = JSON.parse(content);

          // Validate save data structure
          if (!saveData.currentNode || !saveData.character) {
            console.error('Invalid save file structure');
            resolve(false);
            return;
          }

          // Restore state
          const restoredState = {
            ...saveData,
            visitedNodes: new Set(Array.isArray(saveData.visitedNodes)
              ? saveData.visitedNodes
              : [])
          };

          setGameState(restoredState);
          setSavedState(restoredState as GameState);
          resolve(true);
        } catch (error) {
          console.error('Error importing save:', error);
          resolve(false);
        }
      };

      reader.onerror = () => {
        console.error('Error reading file');
        resolve(false);
      };

      reader.readAsText(file);
    });
  }, [setSavedState]);

  return {
    gameState,
    getCurrentNode,
    makeChoice,
    resetGame,
    hasSavedGame,
    loadSavedGame,
    startNewGame,
    exportSave,
    importSave
  };
}
