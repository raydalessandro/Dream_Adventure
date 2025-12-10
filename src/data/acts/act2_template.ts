import type { StoryNode, GameState } from '../../types';

/**
 * ATTO 2: GLI INCONTRI
 *
 * Nodi per il secondo atto della storia.
 * Copiare questo template e riempire con i nodi veri.
 */

export const act2Nodes: Record<string, StoryNode> = {

  // ============================================
  // OMBRA IL LUPO - SVILUPPO
  // ============================================

  ombra_joins: {
    id: 'ombra_joins',
    title: '🐺 Ombra Si Unisce',
    text: `Ombra il lupo vi guarda con occhi pieni di gratitudine.

"Non ho mai avuto amici come voi," dice sottovoce. "Posso... posso venire con voi nella vostra avventura?"

Il suo pelo grigio brilla sotto la luce del Regno dei Sogni. Sembra più giovane ora, meno solitario.`,

    choices: [
      {
        id: 'welcome_ombra',
        text: '❤️ Benvenuto nel gruppo, Ombra!',
        emoji: '❤️',
        preview: 'Ombra diventa un alleato fedele',
        next: 'ombra_backstory',
        resonance: 'kindness',
        stats: { kindness: 2 }
      },
      {
        id: 'refuse_ombra',
        text: '🚶 Preferiamo andare da soli',
        emoji: '🚶',
        preview: 'Ombra rimane indietro, triste',
        next: 'solo_to_peak',
        stats: { courage: 1 }
      }
    ],

    onEnter: (_state: GameState) => {
      // Questo nodo si sblocca solo se hai salvato Ombra prima
      // Logica implementata altrove
      // _state può essere usato per modificare lo stato se necessario
    }
  },

  ombra_backstory: {
    id: 'ombra_backstory',
    title: '📖 Storia del Branco Perduto',
    text: `Mentre camminate insieme, Ombra vi racconta la sua storia...

[TODO: Scrivere la backstory di Ombra - Il branco perduto, la solitudine, perché è nel Regno dei Sogni]

"E ora, grazie a voi, non sono più solo."`,

    choices: [
      {
        id: 'continue_with_ombra',
        text: '➡️ Proseguiamo insieme',
        emoji: '➡️',
        preview: 'Continuate l\'avventura',
        next: 'mountain_peak_with_ally',  // TODO: creare questo nodo
        stats: { magic: 1 }
      }
    ],

    onEnter: (state: GameState) => {
      state.allies.push('Ombra');
    }
  },

  // ============================================
  // IL VECCHIO OROLOGIAIO
  // ============================================

  clockmaker_intro: {
    id: 'clockmaker_intro',
    title: '⏰ Il Vecchio Orologiaio',
    text: `[TODO: Scrivere introduzione Orologiaio]

Arrivate a una torre antica dove abita un vecchio orologiaio.
Gli orologi qui mostrano tempi diversi—passato, futuro, mai.

"Cercate il Cristallo Oro del Tempo?" chiede. "Dovrete risolvere il mio enigma."`,

    choices: [
      {
        id: 'accept_riddle',
        text: '🧩 Accetto la sfida',
        emoji: '🧩',
        preview: 'Prova a risolvere l\'enigma del tempo',
        next: 'time_riddle',
        stats: { curiosity: 2 }
      },
      {
        id: 'skip_clockmaker',
        text: '🏃 Cerchiamo il cristallo da soli',
        emoji: '🏃',
        preview: 'Eviti l\'orologiaio',
        next: 'time_tower_hard_path',  // TODO: percorso alternativo
        stats: { courage: 1 }
      }
    ]
  },

  time_riddle: {
    id: 'time_riddle',
    title: '🤔 L\'Enigma del Tempo',
    text: `[TODO: Scrivere enigma del tempo]

L'orologiaio vi pone un enigma...

"Cosa è sempre davanti a te ma non lo puoi vedere?
Cosa può viaggiare in tutte le direzioni ma non si muove mai?
Cosa tutti sprecano ma nessuno può comprare?"`,

    choices: [
      {
        id: 'answer_future',
        text: '🔮 Il futuro!',
        emoji: '🔮',
        preview: 'Risposta filosofica',
        next: 'clockmaker_gift',
        stats: { curiosity: 2, magic: 1 },
        resonance: 'curiosity'
      },
      {
        id: 'answer_time',
        text: '⏰ Il tempo!',
        emoji: '⏰',
        preview: 'Risposta pratica',
        next: 'clockmaker_gift',
        stats: { curiosity: 3 },
        resonance: 'curiosity'
      },
      {
        id: 'give_up',
        text: '😵 Mi arrendo...',
        emoji: '😵',
        preview: 'Non riesci a risolvere',
        next: 'clockmaker_hint',  // TODO: nodo con aiuto
        stats: { kindness: 1 }
      }
    ]
  },

  clockmaker_gift: {
    id: 'clockmaker_gift',
    title: '🎁 Il Dono del Tempo',
    text: `[TODO: Scrivere ricompensa orologiaio]`,

    choices: [
      {
        id: 'continue_tower',
        text: '⏫ Sali alla Torre del Tempo',
        emoji: '⏫',
        preview: 'Cerca il Cristallo Oro',
        next: 'time_tower_entrance',
        stats: { courage: 1 }
      }
    ],

    onEnter: (state: GameState) => {
      state.specialItems.push('Orologio del Tempo');
      state.secretsUnlocked += 1;
    }
  },

  // ============================================
  // PLACEHOLDER - DA IMPLEMENTARE
  // ============================================

  // TODO: Aggiungere altri nodi Atto 2:
  // - dragon_encounter
  // - dragon_test
  // - dragon_ally
  // - Altri incontri

};

// Export default per import facile
export default act2Nodes;
