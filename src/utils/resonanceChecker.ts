import type { GameState, ResonanceType } from '../types';
import { calculateResonanceStrength } from './pathCalculator';

// Check if specific resonance pattern unlocks secret paths
export function checkResonanceUnlocks(gameState: GameState): string[] {
  const strengths = calculateResonanceStrength(gameState);
  const unlockedPaths: string[] = [];

  // Kindness path - requires 8+ kindness resonances
  if (strengths.kindness >= 8) {
    unlockedPaths.push('healer_path');
  }

  // Courage path - requires 8+ courage resonances
  if (strengths.courage >= 8) {
    unlockedPaths.push('warrior_path');
  }

  // Curiosity path - requires 8+ curiosity resonances
  if (strengths.curiosity >= 8) {
    unlockedPaths.push('scholar_path');
  }

  // Balance path - requires 5+ in each of kindness, courage, curiosity
  if (strengths.kindness >= 5 && strengths.courage >= 5 && strengths.curiosity >= 5) {
    unlockedPaths.push('harmony_path');
  }

  // Magic path - requires 3+ magic resonances
  if (strengths.magic >= 3) {
    unlockedPaths.push('mystic_path');
  }

  return unlockedPaths;
}

// Calculate resonance score (used for ending determination)
export function calculateResonanceScore(gameState: GameState): {
  dominant: ResonanceType | null;
  strength: number;
  isBalanced: boolean;
} {
  const strengths = calculateResonanceStrength(gameState);
  
  let maxStrength = 0;
  let dominant: ResonanceType | null = null;

  Object.entries(strengths).forEach(([pattern, count]) => {
    if (count > maxStrength) {
      maxStrength = count;
      dominant = pattern as ResonanceType;
    }
  });

  // Check if balanced (no stat more than 30% higher than others)
  const values = Object.values(strengths).filter(v => v > 0);
  const max = Math.max(...values);
  const min = Math.min(...values);
  const isBalanced = values.length >= 3 && (max - min) <= 3;

  return {
    dominant,
    strength: maxStrength,
    isBalanced
  };
}

// Get resonance message for UI feedback
export function getResonanceMessage(pattern: ResonanceType): string {
  const messages: Record<ResonanceType, string> = {
    kindness: '💝 Il tuo cuore gentile risuona con il Regno dei Sogni',
    courage: '💪 Il tuo coraggio ispira chi ti circonda',
    curiosity: '🔍 La tua curiosità apre nuove possibilità',
    balance: '⚖️ Il tuo equilibrio crea armonia perfetta',
    magic: '✨ La magia risponde alla tua chiamata'
  };

  return messages[pattern];
}

// Check if ready for secret ending
export function isReadyForSecretEnding(gameState: GameState): boolean {
  const { stats, crystalsFound, secretsUnlocked, allies } = gameState;
  
  // Requirements for secret ending
  return (
    stats.courage >= 15 &&
    stats.kindness >= 15 &&
    stats.curiosity >= 15 &&
    stats.magic >= 5 &&
    crystalsFound.length === 7 &&
    secretsUnlocked >= 10 &&
    allies.length >= 4
  );
}

// Get hint for next secret based on current state
export function getNextSecretHint(gameState: GameState): string | null {
  const strengths = calculateResonanceStrength(gameState);
  
  // If low on kindness
  if (strengths.kindness < 3) {
    return '💝 Prova ad aiutare più creature che incontri...';
  }
  
  // If low on courage
  if (strengths.courage < 3) {
    return '💪 Non aver paura di affrontare le sfide difficili!';
  }
  
  // If low on curiosity
  if (strengths.curiosity < 3) {
    return '🔍 Esplora ogni angolo - ci sono segreti nascosti ovunque!';
  }
  
  // If close to secret ending
  if (isReadyForSecretEnding(gameState)) {
    return '🌟 Sei molto vicino a scoprire la verità più profonda...';
  }
  
  return null;
}

// Track resonance changes for animations/effects
export function getResonanceChange(
  _oldPattern: ResonanceType[], // Prefixed to indicate intentionally unused
  newPattern: ResonanceType[]
): { added: ResonanceType | null; milestone: boolean } {
  if (newPattern.length === 0) {
    return { added: null, milestone: false };
  }
  
  const added = newPattern[newPattern.length - 1];
  const counts = calculateResonanceStrength({ resonancePattern: newPattern } as GameState);
  
  // Milestone every 5 resonances of same type
  const milestone = counts[added] % 5 === 0 && counts[added] > 0;
  
  return { added, milestone };
}
