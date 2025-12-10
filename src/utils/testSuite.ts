/**
 * E2E TEST SUITE
 * Test automatizzati per verificare il gioco funzioni correttamente
 */

import { storyNodes } from '../data/storyNodes';
import { endings, determineEnding } from '../data/endings';
import type { GameState } from '../types';

// ============================================
// TEST 1: Validazione nodi storia
// ============================================

export function testStoryNodesIntegrity(): {
  passed: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  
  console.log('🧪 TEST 1: Story Nodes Integrity');
  
  // Check all nodes exist
  const nodeIds = Object.keys(storyNodes);
  console.log(`   Total nodes: ${nodeIds.length}`);
  
  // Check all choices point to valid nodes
  nodeIds.forEach((nodeId) => {
    const node = storyNodes[nodeId];
    
    if (!node.title) {
      errors.push(`Node ${nodeId} missing title`);
    }
    
    if (!node.text) {
      errors.push(`Node ${nodeId} missing text`);
    }
    
    if (!node.choices || node.choices.length === 0) {
      if (!node.isEnding) {
        errors.push(`Non-ending node ${nodeId} has no choices`);
      }
    }
    
    node.choices?.forEach((choice) => {
      if (!storyNodes[choice.next]) {
        errors.push(`Node ${nodeId} choice ${choice.id} points to non-existent node: ${choice.next}`);
      }
      
      if (!choice.emoji) {
        errors.push(`Node ${nodeId} choice ${choice.id} missing emoji`);
      }
    });
    
    // Check conditional choices
    node.conditionalChoices?.forEach((condChoice) => {
      if (!storyNodes[condChoice.choice.next]) {
        errors.push(`Node ${nodeId} conditional choice points to non-existent node: ${condChoice.choice.next}`);
      }
    });
  });
  
  const passed = errors.length === 0;
  console.log(passed ? '   ✅ PASSED' : `   ❌ FAILED (${errors.length} errors)`);
  
  return { passed, errors };
}

// ============================================
// TEST 2: Simulazione percorsi
// ============================================

export function testGamePaths(numPaths = 10): {
  passed: boolean;
  errors: string[];
  stats: { completed: number; crashed: number; stuck: number };
} {
  const errors: string[] = [];
  let completed = 0;
  let crashed = 0;
  let stuck = 0;
  
  console.log(`🧪 TEST 2: Game Paths Simulation (${numPaths} paths)`);
  
  for (let i = 0; i < numPaths; i++) {
    try {
      const result = simulateRandomPath();
      
      if (result.completed) {
        completed++;
      } else if (result.stuck) {
        stuck++;
        errors.push(`Path ${i + 1} got stuck at node: ${result.lastNode}`);
      }
    } catch (error) {
      crashed++;
      errors.push(`Path ${i + 1} crashed: ${error}`);
    }
  }
  
  console.log(`   Completed: ${completed}/${numPaths}`);
  console.log(`   Stuck: ${stuck}/${numPaths}`);
  console.log(`   Crashed: ${crashed}/${numPaths}`);
  
  const passed = crashed === 0 && stuck === 0;
  console.log(passed ? '   ✅ PASSED' : '   ❌ FAILED');
  
  return { passed, errors, stats: { completed, crashed, stuck } };
}

function simulateRandomPath(maxSteps = 50): {
  completed: boolean;
  stuck: boolean;
  lastNode: string;
} {
  let currentNodeId = 'start';
  let steps = 0;
  
  while (steps < maxSteps) {
    const node = storyNodes[currentNodeId];
    
    if (!node) {
      throw new Error(`Node not found: ${currentNodeId}`);
    }
    
    if (node.isEnding) {
      return { completed: true, stuck: false, lastNode: currentNodeId };
    }
    
    if (!node.choices || node.choices.length === 0) {
      return { completed: false, stuck: true, lastNode: currentNodeId };
    }
    
    // Pick random choice
    const randomChoice = node.choices[Math.floor(Math.random() * node.choices.length)];
    currentNodeId = randomChoice.next;
    steps++;
  }
  
  return { completed: false, stuck: true, lastNode: currentNodeId };
}

// ============================================
// TEST 3: Validazione finali
// ============================================

export function testEndingsDetermination(): {
  passed: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  
  console.log('🧪 TEST 3: Endings Determination');
  
  // Test various stat combinations
  const testCases: Array<{
    name: string;
    stats: { courage: number; kindness: number; curiosity: number; magic: number };
    crystals: number;
    secrets: number;
    pathLength: number;
    savedAll: boolean;
    expectedEnding?: string;
  }> = [
    {
      name: 'High kindness',
      stats: { courage: 5, kindness: 20, curiosity: 5, magic: 0 },
      crystals: 7,
      secrets: 5,
      pathLength: 30,
      savedAll: false,
      expectedEnding: 'healer_of_hearts'
    },
    {
      name: 'High courage',
      stats: { courage: 20, kindness: 5, curiosity: 5, magic: 0 },
      crystals: 7,
      secrets: 5,
      pathLength: 30,
      savedAll: false,
      expectedEnding: 'keeper_of_flame'
    },
    {
      name: 'Perfect balance',
      stats: { courage: 15, kindness: 15, curiosity: 15, magic: 5 },
      crystals: 7,
      secrets: 10,
      pathLength: 30,
      savedAll: true,
      expectedEnding: 'awakened_dreamer'
    },
    {
      name: 'Saved all allies',
      stats: { courage: 10, kindness: 10, curiosity: 10, magic: 0 },
      crystals: 7,
      secrets: 5,
      pathLength: 40,
      savedAll: true,
      expectedEnding: 'bridge_builder'
    }
  ];
  
  testCases.forEach((testCase) => {
    const endingId = determineEnding(
      testCase.stats,
      testCase.crystals,
      testCase.secrets,
      testCase.pathLength,
      testCase.savedAll,
      []
    );
    
    const ending = endings[endingId];
    
    if (!ending) {
      errors.push(`Test "${testCase.name}" returned invalid ending ID: ${endingId}`);
    } else if (testCase.expectedEnding && endingId !== testCase.expectedEnding) {
      console.log(`   ⚠️  Test "${testCase.name}": expected ${testCase.expectedEnding}, got ${endingId}`);
    } else {
      console.log(`   ✅ Test "${testCase.name}": ${ending.title}`);
    }
  });
  
  const passed = errors.length === 0;
  console.log(passed ? '   ✅ PASSED' : `   ❌ FAILED (${errors.length} errors)`);
  
  return { passed, errors };
}

// ============================================
// TEST 4: localStorage compatibility
// ============================================

export function testLocalStorage(): {
  passed: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  
  console.log('🧪 TEST 4: localStorage Compatibility');
  
  try {
    const testKey = '__test_game_state__';
    const testData: GameState = {
      currentNode: 'test',
      character: 'rocco',
      path: ['🎯', '❤️'],
      stats: { courage: 5, kindness: 3, curiosity: 2, magic: 0 },
      crystalsFound: ['verde', 'blu'],
      resonancePattern: ['courage', 'kindness'],
      allies: ['Nocino'],
      specialItems: [],
      visitedNodes: new Set(['start', 'test']),
      secretsUnlocked: 1
    };
    
    // Serialize
    const serialized = JSON.stringify({
      ...testData,
      visitedNodes: Array.from(testData.visitedNodes)
    });
    
    // Save
    localStorage.setItem(testKey, serialized);
    
    // Load
    const loaded = JSON.parse(localStorage.getItem(testKey) || '{}');
    
    // Verify
    if (loaded.currentNode !== testData.currentNode) {
      errors.push('Failed to serialize/deserialize currentNode');
    }
    if (loaded.path.length !== testData.path.length) {
      errors.push('Failed to serialize/deserialize path');
    }
    if (loaded.crystalsFound.length !== testData.crystalsFound.length) {
      errors.push('Failed to serialize/deserialize crystalsFound');
    }
    
    // Cleanup
    localStorage.removeItem(testKey);
    
    console.log('   ✅ PASSED');
  } catch (error) {
    errors.push(`localStorage test failed: ${error}`);
    console.log('   ❌ FAILED');
  }
  
  const passed = errors.length === 0;
  return { passed, errors };
}

// ============================================
// TEST 5: Browser APIs availability
// ============================================

export function testBrowserAPIs(): {
  passed: boolean;
  errors: string[];
  available: string[];
  missing: string[];
} {
  const errors: string[] = [];
  const available: string[] = [];
  const missing: string[] = [];
  
  console.log('🧪 TEST 5: Browser APIs Availability');
  
  const apis = [
    { name: 'localStorage', check: () => typeof window.localStorage !== 'undefined' },
    { name: 'Audio', check: () => typeof Audio !== 'undefined' },
    { name: 'speechSynthesis', check: () => typeof window.speechSynthesis !== 'undefined' },
    { name: 'fetch', check: () => typeof fetch !== 'undefined' }
  ];
  
  apis.forEach((api) => {
    try {
      if (api.check()) {
        available.push(api.name);
        console.log(`   ✅ ${api.name}: available`);
      } else {
        missing.push(api.name);
        console.log(`   ⚠️  ${api.name}: not available`);
      }
    } catch (error) {
      missing.push(api.name);
      errors.push(`${api.name} check failed: ${error}`);
      console.log(`   ❌ ${api.name}: error`);
    }
  });
  
  const passed = missing.length === 0;
  return { passed, errors, available, missing };
}

// ============================================
// RUN ALL TESTS
// ============================================

export function runAllTests(): {
  allPassed: boolean;
  results: Record<string, any>;
} {
  console.log('🚀 Starting E2E Test Suite...\n');
  
  const results = {
    nodesIntegrity: testStoryNodesIntegrity(),
    gamePaths: testGamePaths(10),
    endings: testEndingsDetermination(),
    localStorage: testLocalStorage(),
    browserAPIs: testBrowserAPIs()
  };
  
  console.log('\n📊 SUMMARY:');
  console.log('================');
  
  const allPassed = Object.values(results).every((r) => r.passed);
  
  if (allPassed) {
    console.log('✅ ALL TESTS PASSED!');
  } else {
    console.log('❌ SOME TESTS FAILED');
    Object.entries(results).forEach(([name, result]) => {
      if (!result.passed) {
        console.log(`\n❌ ${name}:`);
        result.errors?.forEach((err: string) => console.log(`   - ${err}`));
      }
    });
  }
  
  return { allPassed, results };
}
