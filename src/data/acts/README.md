# 📚 Struttura Modulare Story Nodes

## Perché questa cartella?

Con 50+ nodi narrativi, il file `storyNodes.ts` diventa grande (3000+ righe).

Questa struttura opzionale ti permette di organizzare la storia per atti.

## Come Usare (Opzionale)

### Opzione 1: File Unico (Attuale)

Continua ad aggiungere nodi in `../storyNodes.ts` come stai facendo ora.

**Pro:**
- Semplice
- Tutto in un posto
- Funziona bene fino a ~100 nodi

**Contro:**
- File lungo da navigare
- Difficile collaborare in team

### Opzione 2: Struttura Modulare (Raccomandata per 50+ nodi)

Dividi la storia in atti:

```
src/data/acts/
  ├── act1.ts    # Nodi Atto 1 (esistenti)
  ├── act2.ts    # Nodi Atto 2 (da creare)
  ├── act3.ts    # Nodi Atto 3 (da creare)
  └── index.ts   # Merge di tutti gli atti
```

Poi in `../storyNodes.ts`:

```typescript
// Opzione A: Import tutto
export { storyNodes } from './acts';

// Opzione B: Re-export
import { storyNodes as allNodes } from './acts';
export const storyNodes = allNodes;
```

## Template Atto

Vedi `act2_template.ts` per uno schema di base.

## Migrazione da File Unico

Se vuoi migrare da `storyNodes.ts` a struttura modulare:

1. Crea `act1.ts` e copia i nodi esistenti
2. Crea `act2.ts` con i nuovi nodi
3. Crea `index.ts` per mergiare tutto
4. Aggiorna `storyNodes.ts` per importare da `./acts`
5. Testa che tutto funzioni

## Lazy Loading Futuro

Per lazy loading vero (carica nodi on-demand):

```typescript
// In useGameState.ts
const loadNode = async (nodeId: string) => {
  const actNumber = getActNumber(nodeId);
  const nodes = await import(`./data/acts/act${actNumber}`);
  return nodes[nodeId];
}
```

**Nota:** Implementazione avanzata, non necessaria ora.

## Quando Usare Modulare?

- **File unico**: ≤ 30 nodi, 1 sviluppatore
- **Modulare**: ≥ 30 nodi, team, o preferisci organizzazione

## Attuale

Per ora, `storyNodes.ts` funziona benissimo. Questa cartella è per il futuro!
