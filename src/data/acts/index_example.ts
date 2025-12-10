/**
 * ESEMPIO: Come mergiare tutti gli atti
 *
 * QUESTO FILE È UN ESEMPIO - NON È USATO AL MOMENTO
 *
 * Quando sarai pronto a usare la struttura modulare:
 * 1. Rinomina questo file in `index.ts`
 * 2. Uncommenta import di act1, act2, act3
 * 3. Aggiorna `../storyNodes.ts` per importare da qui
 */

import type { StoryNode } from '../../types';

// import act1Nodes from './act1';
// import act2Nodes from './act2';
// import act3Nodes from './act3';

/**
 * Merge di tutti i nodi da tutti gli atti
 */
export const storyNodes: Record<string, StoryNode> = {
  // Spread tutti gli atti
  // ...act1Nodes,
  // ...act2Nodes,
  // ...act3Nodes,
};

/**
 * Utility: Ottieni nodi per atto
 */
export const getNodesByAct = (actNumber: 1 | 2 | 3) => {
  switch (actNumber) {
    case 1:
      // return act1Nodes;
      return {};
    case 2:
      // return act2Nodes;
      return {};
    case 3:
      // return act3Nodes;
      return {};
  }
};

/**
 * Utility: Determina atto da node ID
 */
export const getActNumber = (nodeId: string): 1 | 2 | 3 => {
  // Convenzione naming: act1_*, act2_*, act3_*
  // O logica custom basata su prefissi

  if (nodeId.startsWith('start') ||
      nodeId.startsWith('rocco') ||
      nodeId.startsWith('zara') ||
      nodeId.startsWith('forest') ||
      nodeId.startsWith('mountain') ||
      nodeId.startsWith('lake')) {
    return 1;
  }

  if (nodeId.startsWith('ombra') ||
      nodeId.startsWith('clockmaker') ||
      nodeId.startsWith('dragon')) {
    return 2;
  }

  return 3; // Default Atto 3
};

/**
 * Export named per flessibilità
 */
// export { act1Nodes, act2Nodes, act3Nodes };
