import type { GameState, ResonanceType } from '../types';

// Calculate resonance strength for each pattern
export function calculateResonanceStrength(gameState: GameState): Record<ResonanceType, number> {
  const { resonancePattern } = gameState;
  
  const counts: Record<ResonanceType, number> = {
    kindness: 0,
    courage: 0,
    curiosity: 0,
    balance: 0,
    magic: 0
  };

  resonancePattern.forEach(pattern => {
    counts[pattern]++;
  });

  return counts;
}

// Get dominant resonance pattern
export function getDominantResonance(gameState: GameState): ResonanceType | null {
  const strengths = calculateResonanceStrength(gameState);
  
  let maxCount = 0;
  let dominant: ResonanceType | null = null;

  Object.entries(strengths).forEach(([pattern, count]) => {
    if (count > maxCount) {
      maxCount = count;
      dominant = pattern as ResonanceType;
    }
  });

  return dominant;
}

// Check if player has consistent pattern (for secret unlocks)
export function hasConsistentPattern(gameState: GameState, pattern: ResonanceType, threshold = 0.6): boolean {
  const strengths = calculateResonanceStrength(gameState);
  const total = gameState.resonancePattern.length;
  
  if (total === 0) return false;
  
  return (strengths[pattern] / total) >= threshold;
}

// Calculate path efficiency (shorter = more efficient)
export function calculatePathEfficiency(gameState: GameState): number {
  const { path, crystalsFound } = gameState;
  
  if (crystalsFound.length === 0) return 0;
  
  // Efficiency = crystals found / steps taken
  return crystalsFound.length / path.length;
}

// Check if player saved all possible allies
export function savedAllAllies(gameState: GameState): boolean {
  const possibleAllies = ['Nocino', 'Memoria', 'Ombra', 'Pipa', 'Drago']; // Add more as story expands
  return possibleAllies.every(ally => gameState.allies.includes(ally));
}

// Generate path summary for sharing
export function generatePathSummary(gameState: GameState): string {
  const { path, stats, crystalsFound, allies } = gameState;
  
  return `🌟 La Mia Avventura nel Regno dei Sogni 🌟

📍 Passi compiuti: ${path.length}
💎 Cristalli trovati: ${crystalsFound.length}/7
🤝 Alleati: ${allies.join(', ') || 'Nessuno'}

📊 Qualità:
💪 Coraggio: ${stats.courage}
💝 Gentilezza: ${stats.kindness}
🔍 Curiosità: ${stats.curiosity}
✨ Magia: ${stats.magic}

${getDominantResonance(gameState) ? `🎯 Risonanza dominante: ${getDominantResonance(gameState)}` : ''}
`;
}

// Calculate achievement score (0-100)
export function calculateAchievementScore(gameState: GameState): number {
  let score = 0;
  
  // Crystals found (max 35 points)
  score += (gameState.crystalsFound.length / 7) * 35;
  
  // Secrets unlocked (max 20 points)
  score += Math.min(gameState.secretsUnlocked * 2, 20);
  
  // Allies recruited (max 15 points)
  score += Math.min(gameState.allies.length * 3, 15);
  
  // Total stats (max 20 points)
  const totalStats = gameState.stats.courage + gameState.stats.kindness + 
                     gameState.stats.curiosity + gameState.stats.magic;
  score += Math.min((totalStats / 60) * 20, 20);
  
  // Path length bonus (max 10 points - shorter is better)
  const pathEfficiency = calculatePathEfficiency(gameState);
  score += Math.min(pathEfficiency * 50, 10);
  
  return Math.round(score);
}
