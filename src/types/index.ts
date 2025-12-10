// ============================================
// TYPE DEFINITIONS
// ============================================

export type ResonanceType = 'kindness' | 'courage' | 'curiosity' | 'balance' | 'magic';

export type CrystalColor = 'verde' | 'blu' | 'grigio' | 'oro' | 'viola' | 'argento' | 'rosso';

export interface Stats {
  courage: number;
  kindness: number;
  curiosity: number;
  magic: number;
}

export interface Choice {
  id: string;
  text: string;
  emoji: string;
  preview?: string;
  stats?: Partial<Stats>;
  next: string;
  resonance?: ResonanceType;
  requires?: Partial<Stats> | ((state: GameState) => boolean);
  effects?: (state: GameState) => void;
}

export interface ConditionalChoice {
  requires: Partial<Stats> | ((state: GameState) => boolean);
  choice: Choice;
}

export interface StoryNode {
  id: string;
  title: string;
  text: string;
  image?: string;
  music?: string;
  choices: Choice[];
  conditionalChoices?: ConditionalChoice[];
  isEnding?: boolean;
  onEnter?: (state: GameState) => void;
}

export interface GameState {
  currentNode: string;
  character: 'rocco' | 'zara' | null;
  path: string[];
  stats: Stats;
  crystalsFound: CrystalColor[];
  resonancePattern: ResonanceType[];
  allies: string[];
  specialItems: string[];
  visitedNodes: Set<string>;
  secretsUnlocked: number;
}

export interface Ending {
  id: string;
  title: string;
  description: string;
  image?: string;
  achievementText: string;
  isSecret?: boolean;
}

export interface SaveData {
  gameState: GameState;
  timestamp: number;
  playCount: number;
}
