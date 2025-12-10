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
    return storyNodes[gameState.currentNode];
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

      // Move to next node
      newState.currentNode = choice.next;
      
      // Mark node as visited
      newState.visitedNodes = new Set(newState.visitedNodes);
      newState.visitedNodes.add(choice.next);

      // Execute onEnter effects of new node if it exists
      const nextNode = storyNodes[choice.next];
      if (nextNode?.onEnter) {
        nextNode.onEnter(newState);
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

  return {
    gameState,
    getCurrentNode,
    makeChoice,
    resetGame,
    hasSavedGame,
    loadSavedGame,
    startNewGame
  };
}
