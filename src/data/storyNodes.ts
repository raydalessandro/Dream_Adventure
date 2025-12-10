import type { StoryNode, GameState } from '../types';

// ============================================
// NODI DELLA STORIA
// ============================================

export const storyNodes: Record<string, StoryNode> = {
  
  // ============================================
  // INTRO: SELEZIONE PERSONAGGIO
  // ============================================
  
  start: {
    id: 'start',
    title: '✨ Il Risveglio',
    text: `"Svegliati... svegliati..."

Una voce gentile ti chiama. Apri gli occhi e ti trovi in un posto strano. Non è casa tua, ma non è nemmeno completamente estraneo.

Sei in una radura circondata da alberi che brillano debolmente. Il cielo sopra di te mostra contemporaneamente il sole e le stelle—come se il giorno e la notte avessero deciso di esistere insieme.

"Benvenuto nel Regno dei Sogni," dice la voce.

Davanti a te appaiono due figure di luce: un bambino coraggioso con gli occhi curiosi, e una bambina gentile con il sorriso luminoso.

"Puoi essere Rocco—avventuroso e determinato—oppure Zara—empatica e saggia. Chi vuoi essere oggi?"`,
    image: 'start_clearing.jpg',
    music: 'awakening.mp3',
    choices: [
      {
        id: 'choose_rocco',
        text: '⚡ Scelgo Rocco - Avventura e coraggio!',
        emoji: '⚡',
        preview: 'Rocco è coraggioso e ama esplorare. Affronta le sfide a testa alta!',
        next: 'rocco_intro',
        resonance: 'courage',
        stats: { courage: 2 },
        effects: (state: GameState) => {
          state.character = 'rocco';
        }
      },
      {
        id: 'choose_zara',
        text: '💝 Scelgo Zara - Empatia e saggezza!',
        emoji: '💝',
        preview: 'Zara è gentile e comprende gli altri. Risolve i problemi col cuore!',
        next: 'zara_intro',
        resonance: 'kindness',
        stats: { kindness: 2 },
        effects: (state: GameState) => {
          state.character = 'zara';
        }
      },
      {
        id: 'choose_both',
        text: '🌟 Voglio essere entrambi!',
        emoji: '🌟',
        preview: 'Perché scegliere? Puoi avere il meglio di entrambi!',
        next: 'both_intro',
        resonance: 'balance',
        stats: { courage: 1, kindness: 1 },
        effects: (state: GameState) => {
          state.character = 'rocco'; // Default ma con bonus bilanciato
          if (!state.specialItems?.includes('double_spirit')) {
            state.specialItems.push('double_spirit');
          }
        }
      }
    ]
  },

  rocco_intro: {
    id: 'rocco_intro',
    title: '⚡ Rocco si Risveglia',
    text: `La figura di Rocco ti avvolge come un abbraccio caldo. Senti il suo coraggio scorrere in te—la voglia di esplorare, di scoprire, di non fermarsi mai davanti a un ostacolo.

"Bene!" dice la voce. "Rocco, il Regno dei Sogni ha bisogno di te. Qualcosa si è rotto—i sogni e la realtà si sono mescolati in modo pericoloso. Devi trovare i Sette Cristalli dell'Armonia per rimettere le cose a posto."

Davanti a te si aprono tre sentieri luminosi:
🌲 La Foresta dei Sussurri - misteriosa e antica
🏔️ La Montagna dell'Eco - alta e sfidante  
🌊 Il Lago degli Specchi - calmo ma profondo

"Quale scegli per primo, giovane esploratore?"`,
    image: 'rocco_awakening.jpg',
    music: 'adventure_begins.mp3',
    choices: [
      {
        id: 'rocco_to_forest',
        text: '🌲 Esplora la Foresta dei Sussurri',
        emoji: '🌲',
        preview: 'Gli alberi antichi nascondono segreti...',
        next: 'forest_entrance',
        stats: { curiosity: 1 },
        resonance: 'curiosity'
      },
      {
        id: 'rocco_to_mountain',
        text: '🏔️ Scala la Montagna dell\'Eco',
        emoji: '🏔️',
        preview: 'Una sfida che fa battere il cuore!',
        next: 'mountain_base',
        stats: { courage: 1 },
        resonance: 'courage'
      },
      {
        id: 'rocco_to_lake',
        text: '🌊 Vai al Lago degli Specchi',
        emoji: '🌊',
        preview: 'Le acque riflettono più della tua immagine...',
        next: 'lake_shore',
        stats: { curiosity: 1 },
        resonance: 'curiosity'
      }
    ]
  },

  zara_intro: {
    id: 'zara_intro',
    title: '💝 Zara si Risveglia',
    text: `La figura di Zara ti avvolge come un abbraccio gentile. Senti la sua empatia scorrere in te—la capacità di capire gli altri, di sentire cosa prova chi hai intorno, di guarire col cuore.

"Perfetto!" dice la voce. "Zara, il Regno dei Sogni ha bisogno del tuo dono. I sogni e la realtà si sono mescolati, e molte creature sono confuse e spaventate. Devi trovare i Sette Cristalli dell'Armonia per portare di nuovo pace."

Davanti a te si aprono tre sentieri luminosi:
🌲 La Foresta dei Sussurri - senti pianti sommessi tra gli alberi
🏔️ La Montagna dell'Eco - qualcuno lassù chiama aiuto
🌊 Il Lago degli Specchi - percepisci tristezza provenire dall'acqua

"Dove senti di dover andare prima, dolce guaritrice?"`,
    image: 'zara_awakening.jpg',
    music: 'gentle_awakening.mp3',
    choices: [
      {
        id: 'zara_to_forest',
        text: '🌲 Aiuta chi piange nella Foresta',
        emoji: '🌲',
        preview: 'Qualcuno ha bisogno di te tra gli alberi...',
        next: 'forest_entrance',
        stats: { kindness: 1 },
        resonance: 'kindness'
      },
      {
        id: 'zara_to_mountain',
        text: '🏔️ Soccorri chi chiama sulla Montagna',
        emoji: '🏔️',
        preview: 'Una voce disperata chiama dal picco...',
        next: 'mountain_base',
        stats: { kindness: 1 },
        resonance: 'kindness'
      },
      {
        id: 'zara_to_lake',
        text: '🌊 Consola la tristezza del Lago',
        emoji: '🌊',
        preview: 'Le acque piangono lacrime invisibili...',
        next: 'lake_shore',
        stats: { kindness: 1 },
        resonance: 'kindness'
      }
    ]
  },

  both_intro: {
    id: 'both_intro',
    title: '🌟 Lo Spirito Duale',
    text: `Entrambe le figure—Rocco e Zara—si fondono insieme. Senti sia il coraggio che la gentilezza, sia la voglia di esplorare che quella di aiutare.

"Oh!" dice la voce, sorpresa. "Questo è raro... uno Spirito Duale. Puoi accedere al meglio di entrambi i mondi. Questo ti darà opzioni speciali durante il viaggio, ma dovrai bilanciare entrambe le nature."

Un piccolo cristallo trasparente appare nella tua mano—il Cristallo dell'Equilibrio. "Questo ti guiderà," sussurra la voce.

Davanti a te si aprono tre sentieri:
🌲 La Foresta dei Sussurri  
🏔️ La Montagna dell'Eco  
🌊 Il Lago degli Specchi

"Dove inizia il tuo viaggio, Spirito Duale?"`,
    image: 'dual_spirit_awakening.jpg',
    music: 'harmonic_awakening.mp3',
    choices: [
      {
        id: 'dual_to_forest',
        text: '🌲 Inizia dalla Foresta',
        emoji: '🌲',
        next: 'forest_entrance',
        stats: { curiosity: 1, kindness: 1 }
      },
      {
        id: 'dual_to_mountain',
        text: '🏔️ Inizia dalla Montagna',
        emoji: '🏔️',
        next: 'mountain_base',
        stats: { courage: 1, kindness: 1 }
      },
      {
        id: 'dual_to_lake',
        text: '🌊 Inizia dal Lago',
        emoji: '🌊',
        next: 'lake_shore',
        stats: { curiosity: 1, courage: 1 }
      }
    ]
  },

  // ============================================
  // ATTO 1: LA FORESTA DEI SUSSURRI
  // ============================================

  forest_entrance: {
    id: 'forest_entrance',
    title: '🌲 La Foresta dei Sussurri',
    text: `Entri nella foresta e immediatamente senti qualcosa di strano. Gli alberi parlano—non con parole che capisci, ma con sussurri che senti nel cuore.

"Aiuto... aiuto..." dice una voce piccola e spaventata.

Ti guardi intorno e vedi uno scoiattolino grigio intrappolato sotto un ramo caduto. I suoi occhioni ti guardano pieni di speranza.

Ma dall'altra parte, tra i cespugli, intravedi qualcosa che brilla con luce verde—potrebbe essere uno dei cristalli che cerchi!

E più in profondità nella foresta, senti una voce melodiosa cantare una canzone triste.

Cosa fai?`,
    image: 'forest_entrance.jpg',
    music: 'forest_whispers.mp3',
    choices: [
      {
        id: 'help_squirrel',
        text: '🐿️ Aiuta subito lo scoiattolino',
        emoji: '❤️',
        preview: 'Non puoi lasciare una creatura in difficoltà!',
        next: 'squirrel_saved',
        stats: { kindness: 2, courage: 1 },
        resonance: 'kindness'
      },
      {
        id: 'grab_crystal',
        text: '💎 Corri verso il cristallo verde',
        emoji: '✨',
        preview: 'La missione viene prima... vero?',
        next: 'crystal_priority',
        stats: { courage: 2 },
        resonance: 'courage'
      },
      {
        id: 'follow_song',
        text: '🎵 Segui la canzone triste',
        emoji: '🎵',
        preview: 'Chi canta così tristemente? Vuoi scoprirlo...',
        next: 'find_singer',
        stats: { curiosity: 2 },
        resonance: 'curiosity'
      }
    ],
    conditionalChoices: [
      {
        requires: (state) => state.specialItems.includes('double_spirit'),
        choice: {
          id: 'dual_action',
          text: '🌟 Usa lo Spirito Duale - Fai tutto!',
          emoji: '🌟',
          preview: 'Il tuo spirito duale ti permette di agire su più fronti!',
          next: 'dual_forest_solution',
          stats: { kindness: 2, courage: 2, curiosity: 2, magic: 1 },
          resonance: 'balance'
        }
      }
    ]
  },

  squirrel_saved: {
    id: 'squirrel_saved',
    title: '🐿️ Un Amico Salvato',
    text: `Con delicatezza sollevi il ramo. È pesante, ma ce la fai! Lo scoiattolino esce saltellando e ti guarda con gratitudine infinita.

"Grazie! Grazie! Grazie!" dice in una vocina acuta. Sei sorpreso—può parlare!

"Mi chiamo Nocino," dice lo scoiattolino. "Ero scappato da casa perché volevo essere coraggioso come i grandi esploratori. Ma poi... mi sono perso e il ramo è caduto e avevo così tanta paura e..."

Si ferma, respirando affannosamente. Poi ti guarda con occhi decisi.

"Tu mi hai salvato. Ora voglio aiutarti! So dove sono tutte le cose nascoste nella foresta. E guarda!"

Nocino fruga tra le sue ghiande e tira fuori qualcosa di brillante—il CRISTALLO VERDE!

"L'avevo trovato stamattina! È tuo. E... posso venire con te? Non voglio stare più solo."`,
    image: 'nocino_saved.jpg',
    onEnter: (state) => {
      if (!state.crystalsFound?.includes('verde')) {
        state.crystalsFound.push('verde');
      }
      if (!state.allies?.includes('Nocino')) {
        state.allies.push('Nocino');
      }
    },
    choices: [
      {
        id: 'accept_nocino',
        text: '🤗 Certo! Benvenuto nella squadra!',
        emoji: '❤️',
        preview: 'Nocino sembra così felice...',
        next: 'nocino_joins',
        stats: { kindness: 2 },
        resonance: 'kindness'
      },
      {
        id: 'gentle_refuse',
        text: '🏠 Aiuta Nocino a tornare a casa prima',
        emoji: '🏠',
        preview: 'Forse dovrebbe riunirsi con la sua famiglia...',
        next: 'nocino_home',
        stats: { kindness: 3, curiosity: 1 },
        resonance: 'kindness'
      }
    ]
  },

  crystal_priority: {
    id: 'crystal_priority',
    title: '💎 La Scelta Difficile',
    text: `Corri verso il cristallo verde. È bellissimo—pulsa con luce smeraldo come un battito di cuore. Lo afferri.

Dietro di te, senti lo scoiattolino piangere. "Aiuto... per favore..."

Ti volti. Il cristallo è freddo nella tua mano. Lo scoiattolino ti guarda, e nei suoi occhi vedi qualcosa: delusione. Non rabbia, non odio. Solo... tristezza.

"Va bene," sussurra. "Capisco. Il cristallo è più importante."

Qualcosa si stringe nel tuo petto. Hai il cristallo—obiettivo raggiunto—ma ti senti... vuoto.

Il cristallo verde improvvisamente diventa più pesante. E senti una voce sussurrare: "I cristalli dell'armonia risuonano solo con cuori che scelgono l'armonia."`,
    image: 'crystal_cold.jpg',
    onEnter: (state) => {
      if (!state.crystalsFound?.includes('verde')) {
        state.crystalsFound.push('verde');
      }
    },
    choices: [
      {
        id: 'realize_mistake',
        text: '😢 Torna indietro - aiuta lo scoiattolino ORA',
        emoji: '❤️',
        preview: 'Non è troppo tardi per fare la cosa giusta...',
        next: 'redemption_path',
        stats: { kindness: 3, courage: 2 },
        resonance: 'kindness'
      },
      {
        id: 'continue_alone',
        text: '😐 Continua - hai già il cristallo',
        emoji: '💎',
        preview: 'La missione è la missione...',
        next: 'lonely_path',
        stats: { courage: 2 },
        resonance: 'courage'
      }
    ]
  },

  find_singer: {
    id: 'find_singer',
    title: '🎵 La Canzone Triste',
    text: `Segui il canto più in profondità nella foresta. La voce è bellissima ma piena di malinconia, come se cantasse di qualcosa di perso per sempre.

Arrivi in una piccola radura dove cresce un albero diverso da tutti gli altri—ha fiori blu luminosi e foglie che sembrano fatte di cristallo liquido.

Sotto l'albero, seduta su un masso, c'è una bellissima farfalla—ma non come le farfalle normali. È grande quasi quanto te, con ali che mostrano immagini in continuo cambiamento: ricordi, sogni, speranze.

"Oh," dice quando ti vede, smettendo di cantare. "Un visitatore. È passato tanto tempo dall'ultima volta che qualcuno ha seguito il mio canto."

La sua voce è gentile ma infinitamente triste.

"Mi chiamo Memorìa. Sono la Custode dei Ricordi Perduti della foresta. Canto per tutti i momenti felici che le creature hanno dimenticato, sperando che qualcuno li ricordi."

Indica l'albero. "Quello è l'Albero del Tempo. Produce un cristallo ogni cento anni—quello verde che cercavi. Ma per coglierlo, devi prima dargli qualcosa."`,
    image: 'memoria_butterfly.jpg',
    choices: [
      {
        id: 'ask_what',
        text: '❓ Cosa devo dare all\'albero?',
        emoji: '🤔',
        preview: 'Vuoi capire prima di agire...',
        next: 'tree_riddle',
        stats: { curiosity: 2 },
        resonance: 'curiosity'
      },
      {
        id: 'comfort_memoria',
        text: '🤗 Prima consola Memorìa',
        emoji: '💝',
        preview: 'Sembra così triste... puoi aiutarla?',
        next: 'memoria_comforted',
        stats: { kindness: 3 },
        resonance: 'kindness'
      },
      {
        id: 'try_take',
        text: '⚡ Prova a prendere il cristallo direttamente',
        emoji: '💪',
        preview: 'Forse non serve dare nulla...',
        next: 'tree_reaction',
        stats: { courage: 2 },
        resonance: 'courage'
      }
    ]
  },

  // Continuo con più nodi...
  
  nocino_joins: {
    id: 'nocino_joins',
    title: '🐿️ Nocino l\'Esploratore',
    text: `Nocino fa un salto di gioia così alto che quasi sbatte contro un ramo!

"Davvero?! DAVVERO?! Oh grazie, grazie! Sarò il miglior aiutante del mondo! Guarda, guarda cosa so fare!"

Si arrampica su un albero in un secondo, poi salta giù e ti mostra una ghianda speciale. "Questa è una Ghianda della Visione—se la pianterete, cresce in un secondo e vi mostra dove andare!"

Nocino diventa il tuo primo vero alleato. È piccolo ma coraggioso, e conosce la foresta meglio di chiunque altro.

"Allora," dice con serietà comica sul suo musetto, "dove andiamo adesso, capo?"

La foresta si apre davanti a voi in tre direzioni:
🎵 Verso il canto triste che hai sentito prima
🏚️ Verso vecchie rovine coperte di muschio  
🌊 Verso il confine dove la foresta incontra il lago`,
    image: 'nocino_happy.jpg',
    choices: [
      {
        id: 'nocino_to_song',
        text: '🎵 Investigate il canto triste',
        emoji: '🎵',
        preview: 'Nocino dice che nessuno sa chi canta...',
        next: 'find_singer_with_nocino',
        stats: { curiosity: 1 }
      },
      {
        id: 'nocino_to_ruins',
        text: '🏚️ Esplora le rovine antiche',
        emoji: '🏚️',
        preview: 'Nocino trema un po\' - dice che lì è "spooky"',
        next: 'ancient_ruins',
        stats: { courage: 1 }
      },
      {
        id: 'nocino_to_lake',
        text: '🌊 Vai verso il lago',
        emoji: '🌊',
        preview: 'Una nuova zona da esplorare!',
        next: 'forest_to_lake',
        stats: { curiosity: 1 }
      }
    ]
  },

  // ============================================
  // ATTO 1: LA MONTAGNA DELL'ECO
  // ============================================

  mountain_base: {
    id: 'mountain_base',
    title: '🏔️ La Montagna dell\'Eco',
    text: `Ti trovi ai piedi di una montagna imponente. È così alta che la cima si perde tra le nuvole—no, aspetta, non sono nuvole. Sono cristalli di ghiaccio che fluttuano nell'aria, brillando con luce propria.

"ECO... eco... eco..." senti la tua voce rimbalzare contro le pareti rocciose.

Ma poi senti altro. Un ruggito lontano—profondo, potente, antico. Non è minaccioso, ma è... maestoso.

Tre sentieri partono dalla base della montagna:
⛰️ Il Sentiero Ripido - dritto verso la cima
🌉 Il Ponte di Corda - attraversa un burrone profondo  
🕳️ Una Grotta - si apre nel fianco della montagna

Quale scegli?`,
    image: 'mountain_base.jpg',
    music: 'mountain_winds.mp3',
    choices: [
      {
        id: 'steep_path',
        text: '⛰️ Scala il sentiero ripido',
        emoji: '💪',
        preview: 'La via più diretta—e più faticosa!',
        next: 'steep_climb',
        stats: { courage: 2 },
        resonance: 'courage'
      },
      {
        id: 'rope_bridge',
        text: '🌉 Attraversa il ponte di corda',
        emoji: '🌉',
        preview: 'Sembra traballante... ma affascinante!',
        next: 'bridge_crossing',
        stats: { courage: 1, curiosity: 1 },
        resonance: 'courage'
      },
      {
        id: 'explore_cave',
        text: '🕳️ Esplora la grotta misteriosa',
        emoji: '🔦',
        preview: 'Cosa nasconde il cuore della montagna?',
        next: 'crystal_cave',
        stats: { curiosity: 2 },
        resonance: 'curiosity'
      }
    ]
  },

  // ============================================
  // ATTO 1: IL LAGO DEGLI SPECCHI
  // ============================================

  lake_shore: {
    id: 'lake_shore',
    title: '🌊 Il Lago degli Specchi',
    text: `Ti trovi sulla riva di un lago perfettamente immobile. L'acqua è così calma che riflette tutto con perfezione assoluta—il cielo, gli alberi, te stesso.

Ma quando ti guardi riflesso nell'acqua, qualcosa è strano. Il tuo riflesso... si muove leggermente diverso da te. Come se avesse vita propria.

"Ciao," dice il tuo riflesso, e la tua voce arriva dall'acqua.

Fai un passo indietro, sorpreso. Il riflesso ride gentilmente.

"Non spaventarti. Questo è il Lago degli Specchi—qui, i riflessi possono parlare. Sono la parte di te che di solito non ascolti. La parte che sogna quando sei sveglio."

L'acqua si increspa leggermente, e vedi altre immagini apparire:
🔮 Un'isola al centro del lago con un tempio antico  
🐟 Pesci luminosi che nuotano in profondità
🌙 Una barca di legno legata alla riva

Cosa fai?`,
    image: 'mirror_lake.jpg',
    music: 'lake_serenity.mp3',
    choices: [
      {
        id: 'talk_reflection',
        text: '💭 Parla col tuo riflesso',
        emoji: '🤔',
        preview: 'Cosa vuole dirti la parte di te che sogna?',
        next: 'reflection_talk',
        stats: { curiosity: 2, kindness: 1 },
        resonance: 'curiosity'
      },
      {
        id: 'swim_to_island',
        text: '🏊 Nuota verso l\'isola',
        emoji: '🏊',
        preview: 'Quel tempio nasconde sicuramente qualcosa!',
        next: 'island_temple',
        stats: { courage: 2 },
        resonance: 'courage'
      },
      {
        id: 'follow_fish',
        text: '🐟 Segui i pesci luminosi',
        emoji: '✨',
        preview: 'Portano sicuramente a qualcosa di magico...',
        next: 'underwater_world',
        stats: { curiosity: 2, courage: 1 },
        resonance: 'curiosity'
      }
    ]
  },

  // Nodi addizionali Foresta
  
  redemption_path: {
    id: 'redemption_path',
    title: '❤️ Il Potere della Correzione',
    text: `Lasci cadere il cristallo e corri verso lo scoiattolino. Con tutta la tua forza sollevi il ramo.

"Aspetta," singhiozza Nocino, sorpreso. "Sei... sei tornato? Ma avevi il cristallo..."

"Il cristallo può aspettare," dici. "Tu no."

Nel momento in cui pronunci queste parole, succede qualcosa di magico. Il cristallo verde che avevi lasciato cadere non cade a terra—fluttua nell'aria e vola direttamente nelle tue mani, ma ora brilla molto più intensamente.

"Il cristallo dell'armonia riconosce chi sceglie l'armonia," dice una voce calda—Memorìa la farfalla appare tra gli alberi, sorridendo. "Hai superato il vero test."

Nocino ti abbraccia forte. "Vieni con me? Per favore?"

Il cristallo pulsa caldo nella tua mano. Hai imparato: tornare indietro non è debolezza, è coraggio.`,
    image: 'redemption.jpg',
    onEnter: (state) => {
      if (!state.allies?.includes('Nocino')) {
        state.allies.push('Nocino');
      }
      state.secretsUnlocked = (state.secretsUnlocked || 0) + 1;
    },
    choices: [
      {
        id: 'redemption_forward',
        text: '🌟 Continua insieme a Nocino',
        emoji: '🤗',
        next: 'nocino_joins',
        stats: { kindness: 3, courage: 2 }
      }
    ]
  },

  lonely_path: {
    id: 'lonely_path',
    title: '💎 Il Peso della Solitudine',
    text: `Continui attraverso la foresta da solo. Il cristallo verde è nella tua tasca, ma sembra pesare più di quanto dovrebbe.

Ogni tanto senti rumori tra gli alberi—altri animali che potrebbero aver bisogno di aiuto? Ma non ti fermi. La missione è la missione.

Arrivi a un bivio. Il sentiero si divide in tre direzioni, e c'è un cartello: "Chi viaggia solo può scegliere solo una via. Chi viaggia con amici può vedere tutte e tre."

Il cristallo diventa più freddo.`,
    image: 'lonely_path.jpg',
    choices: [
      {
        id: 'left_alone',
        text: '⬅️ Prendi il sentiero di sinistra',
        emoji: '⬅️',
        next: 'mountain_base',
        stats: { courage: 1 }
      },
      {
        id: 'right_alone',
        text: '➡️ Prendi il sentiero di destra',
        emoji: '➡️',
        next: 'lake_shore',
        stats: { curiosity: 1 }
      }
    ]
  },

  find_singer_with_nocino: {
    id: 'find_singer_with_nocino',
    title: '🎵 Memorìa e l\'Amico',
    text: `Nocino e tu seguite il canto insieme. Quando Memorìa vi vede, i suoi occhi si illuminano—non di uno ma di due visitatori!

"Oh!" dice felice. "È così tanto tempo che non vedo amici insieme. Gli alberi mi hanno detto di voi—di come hai salvato Nocino."

Nocino si nasconde timidamente dietro la tua gamba. "Sei... sei davvero grande," sussurra alla farfalla gigante.

Memorìa ride, un suono come campanellini. "E tu sei davvero coraggioso, piccolo esploratore. L'albero sarà felice—ama chi sa fare amicizia."

Si volta verso l'Albero del Tempo. "Di solito chiedo ai visitatori di dare un ricordo felice per il cristallo. Ma voi... voi ne state creando uno proprio ora. Questo è più che sufficiente."

Il cristallo verde cade dall'albero, direttamente nelle tue mani. Ma non è solo uno—ce ne sono DUE. Uno verde smeraldo, uno verde più chiaro come foglie giovani.

"Per entrambi," dice Memorìa. "Per l'amico che salva e per l'amico che viene salvato."`,
    image: 'memoria_happy.jpg',
    onEnter: (state) => {
      if (!state.crystalsFound?.includes('verde')) {
        state.crystalsFound.push('verde');
      }
      if (!state.allies?.includes('Memoria')) {
        state.allies.push('Memoria');
      }
      if (!state.specialItems?.includes('double_green_crystal')) {
        state.specialItems.push('double_green_crystal');
      }
      state.secretsUnlocked = (state.secretsUnlocked || 0) + 1;
    },
    choices: [
      {
        id: 'thank_memoria',
        text: '🙏 Ringrazia Memorìa e prosegui',
        emoji: '💝',
        next: 'forest_complete',
        stats: { kindness: 2, curiosity: 1 }
      }
    ]
  },

  memoria_comforted: {
    id: 'memoria_comforted',
    title: '💝 Il Conforto di Memorìa',
    text: `Ti siedi accanto a Memorìa sul masso. "Perché sei così triste?" chiedi gentilmente.

Lei sospira, le sue ali tremano leggermente. "Sono la Custode dei Ricordi Perduti. Significa che ricordo tutto ciò che gli altri dimenticano—le risate, gli abbracci, i momenti di gioia pura. Ma sono anche l'unica a ricordarli. È... pesante."

"Forse," dici pensando, "non devi ricordarli da sola. Puoi... condividerli?"

Memorìa ti guarda sorpresa. "Condividerli?"

"Sì! Raccontali. Insegnali. Fa' sì che altri conoscano questi momenti belli. Così non sarai più sola a ricordarli."

Le sue ali iniziano a brillare. "Io... non ci avevo mai pensato. Pensavo che il mio lavoro fosse custodire. Ma forse... forse è anche raccontare?"

L'Albero del Tempo improvvisamente fiorisce con mille fiori blu. Un cristallo verde cade, insieme a qualcosa altro—una piccola piuma di farfalla che brilla di luce propria.

"Questo è per te," dice Memorìa, ora sorridente per la prima volta. "La Piuma dei Ricordi Condivisi. Con questa, puoi vedere i momenti più belli vissuti da chiunque incontri. È il mio dono a te, che mi hai insegnato a non essere sola."`,
    image: 'memoria_healed.jpg',
    onEnter: (state) => {
      if (!state.crystalsFound?.includes('verde')) {
        state.crystalsFound.push('verde');
      }
      if (!state.allies?.includes('Memoria')) {
        state.allies.push('Memoria');
      }
      if (!state.specialItems?.includes('memory_feather')) {
        state.specialItems.push('memory_feather');
      }
      state.secretsUnlocked = (state.secretsUnlocked || 0) + 2;
    },
    choices: [
      {
        id: 'accept_gift',
        text: '✨ Accetta il dono con gratitudine',
        emoji: '🙏',
        next: 'forest_complete',
        stats: { kindness: 3, curiosity: 2, magic: 1 }
      }
    ]
  },

  tree_riddle: {
    id: 'tree_riddle',
    title: '🌳 L\'Enigma dell\'Albero',
    text: `"L'Albero del Tempo chiede un ricordo felice," spiega Memorìa. "Non te lo toglie—lo condividi. Diventa parte dell'albero, e l'albero ti dà in cambio il cristallo."

Ti concentri. Quale ricordo felice vuoi condividere?

Pensi a:
- La volta che hai riso così forte che ti faceva male la pancia
- Il giorno in cui qualcuno ti ha fatto sentire speciale
- Un momento di pura meraviglia davanti a qualcosa di bello

"Scegli col cuore," sussurra Memorìa. "L'albero sente la sincerità."`,
    image: 'tree_glowing.jpg',
    choices: [
      {
        id: 'share_laughter',
        text: '😄 Condividi il ricordo della risata',
        emoji: '😄',
        preview: 'La gioia pura è contagiosa...',
        next: 'tree_accepts_joy',
        stats: { kindness: 2 },
        resonance: 'kindness'
      },
      {
        id: 'share_special',
        text: '💖 Condividi quando ti sei sentito speciale',
        emoji: '💖',
        preview: 'Tutti meritano di sentirsi importanti...',
        next: 'tree_accepts_love',
        stats: { kindness: 2, courage: 1 },
        resonance: 'kindness'
      },
      {
        id: 'share_wonder',
        text: '✨ Condividi il momento di meraviglia',
        emoji: '✨',
        preview: 'La bellezza nutre l\'anima...',
        next: 'tree_accepts_wonder',
        stats: { curiosity: 2, kindness: 1 },
        resonance: 'curiosity'
      }
    ]
  },

  // Montagna nodes
  
  steep_climb: {
    id: 'steep_climb',
    title: '⛰️ La Salita Ripida',
    text: `Inizi a scalare il sentiero ripido. È faticoso—le gambe bruciano, il respiro si fa corto. Ma non ti arrendi.

Dopo un'ora di salita, arrivi a una piattaforma dove puoi finalmente riposare. E lì, seduto su una roccia, c'è un lupo. Un lupo enorme, con pelliccia grigia come la nebbia e occhi dorati che ti fissano intensamente.

Il tuo cuore salta un battito. I lupi sono pericolosi... vero?

Ma poi il lupo parla. "Ciao, scalatore. Hai scelto la via difficile. Rispetto."

La sua voce è profonda ma non minacciosa. Sembra... solitario?

"Mi chiamo Ombra," continua. "Vivo su questa montagna da quando mi sono perso dal mio branco. Stai salendo verso la cima?"

Annuisci. "Cerco il Cristallo Grigio."

Ombra annuisce lentamente. "È custodito dal Drago dell'Eco. Dovrai essere coraggioso. O intelligente. O entrambi. Vuoi compagnia per il resto della salita?"`,
    image: 'ombra_wolf.jpg',
    choices: [
      {
        id: 'accept_ombra',
        text: '🐺 Sì, saliamo insieme!',
        emoji: '🤝',
        preview: 'Ombra sembra forte e saggio...',
        next: 'ombra_joins',
        stats: { courage: 2, kindness: 2 },
        resonance: 'balance'
      },
      {
        id: 'refuse_ombra',
        text: '🚶 No grazie, vado da solo',
        emoji: '💪',
        preview: 'Vuoi provare a farcela con le tue forze...',
        next: 'solo_to_peak',
        stats: { courage: 3 },
        resonance: 'courage'
      },
      {
        id: 'ask_ombra_story',
        text: '❓ Chiedi prima perché si è perso',
        emoji: '🤔',
        preview: 'C\'è sempre una storia dietro...',
        next: 'ombra_backstory',
        stats: { curiosity: 2, kindness: 1 },
        resonance: 'curiosity'
      }
    ]
  },

  bridge_crossing: {
    id: 'bridge_crossing',
    title: '🌉 Il Ponte di Corda',
    text: `Il ponte si estende sul burrone. È fatto di corde vecchie e assi di legno che scricchiolano. Sotto, il burrone scende così in profondità che non ne vedi il fondo.

Fai un passo. Il ponte oscilla. Un altro passo. Scricchiolio.

A metà ponte, ti fermi. Guardi giù per errore e ti viene il capogiro. Le gambe tremano.

"Non guardare giù!" chiama una voce dall'altra parte. È un uccellino colorato che ti osserva da un ramo. "Guarda me! Guarda avanti!"

Ha ragione. Respiri profondamente e continui, step by step, guardando avanti.

Finalmente raggiungi l'altra parte. L'uccellino cinguetta felice. "Ce l'hai fatta! Io ti guardavo per farti coraggio. Mi chiamo Pipa!"

Davanti a te, il sentiero continua verso la cima. Ma c'è anche un sentiero laterale che sembra portare a una cascata nascosta.`,
    image: 'rope_bridge.jpg',
    choices: [
      {
        id: 'thank_pipa',
        text: '🐦 Ringrazia Pipa e vai verso la cima',
        emoji: '🙏',
        preview: 'Il suo incoraggiamento ti ha aiutato!',
        next: 'to_dragon_peak',
        stats: { courage: 2, kindness: 1 },
        effects: (state) => {
          if (!state.allies?.includes('Pipa')) {
            state.allies.push('Pipa');
          }
        }
      },
      {
        id: 'explore_waterfall',
        text: '💦 Esplora prima la cascata',
        emoji: '✨',
        preview: 'Cosa nasconde?',
        next: 'secret_waterfall',
        stats: { curiosity: 2 },
        resonance: 'curiosity'
      }
    ]
  },

  crystal_cave: {
    id: 'crystal_cave',
    title: '🕳️ La Grotta di Cristallo',
    text: `Entri nella grotta. All'inizio è buio, ma poi i tuoi occhi si abituano e vedi—cristalli ovunque! Pareti, soffitto, pavimento, tutto brilla con luce interna.

I cristalli cantano. Letteralmente. Emettono note diverse quando il vento li attraversa, creando una melodia ipnotica.

In fondo alla grotta c'è una piscina d'acqua cristallina. E sul fondo, brillante, vedi il CRISTALLO GRIGIO che cercavi!

Ma c'è qualcosa di strano. Riflesso nell'acqua non vedi solo il cristallo—vedi anche immagini. Momenti del futuro? Del passato? Non sei sicuro.

Una delle immagini mostra te stesso, più grande, con qualcuno accanto che non riconosci. State ridendo.

Un'altra mostra un momento triste—qualcuno che piange.

L'acqua sussurra: "Per prendere il cristallo della memoria, devi essere disposto a vedere tutti i ricordi—belli e brutti."`,
    image: 'crystal_cavern.jpg',
    choices: [
      {
        id: 'accept_all_memories',
        text: '💙 Accetto tutti i ricordi',
        emoji: '💙',
        preview: 'La vita ha momenti felici e tristi...',
        next: 'cave_wisdom',
        stats: { courage: 2, kindness: 2, curiosity: 2 },
        resonance: 'balance'
      },
      {
        id: 'want_only_happy',
        text: '😊 Voglio solo i ricordi felici',
        emoji: '😊',
        preview: 'Perché ricordare cose tristi?',
        next: 'cave_lesson',
        stats: { curiosity: 1 },
        resonance: 'courage'
      }
    ]
  },

  // Lago nodes
  
  reflection_talk: {
    id: 'reflection_talk',
    title: '💭 Conversazione con Te Stesso',
    text: `Ti siedi sulla riva e parli col tuo riflesso. È strano ma anche... liberatorio.

"Cosa vuoi dirmi?" chiedi.

Il riflesso sorride. "Voglio dirti che sei più forte di quanto pensi. Più gentile di quanto ti dai credito. Più curioso di quanto ti permetti di essere. A volte ti limiti perché hai paura di cosa penseranno gli altri."

"È vero," ammetti, sorpreso da quanto siano accurate quelle parole.

"Il Lago degli Specchi mostra la verità," continua il riflesso. "E la verità è che sei speciale. Non perfetto—speciale. E va bene."

L'acqua inizia a brillare. Dal fondo sale qualcosa—il CRISTALLO BLU, avvolto in bolle di luce.

"È tuo," dice il riflesso. "Perché hai avuto il coraggio di ascoltare la verità. Questo è il dono del lago."

Ma poi aggiunge: "Però c'è qualcun altro nel lago che ha bisogno di aiuto. I pesci luminosi non possono tornare alle acque profonde perché c'è qualcosa che blocca il passaggio. Vuoi aiutarli prima di andare?"`,
    image: 'reflection_wisdom.jpg',
    onEnter: (state) => {
      if (!state.crystalsFound?.includes('blu')) {
        state.crystalsFound.push('blu');
      }
    },
    choices: [
      {
        id: 'help_fish',
        text: '🐟 Aiuta i pesci luminosi',
        emoji: '❤️',
        preview: 'Non puoi lasciare creature in difficoltà...',
        next: 'help_fish_quest',
        stats: { kindness: 2 },
        resonance: 'kindness'
      },
      {
        id: 'leave_lake',
        text: '👋 Ringrazia e prosegui',
        emoji: '🙏',
        preview: 'Hai già il cristallo...',
        next: 'lake_departure',
        stats: { courage: 1 }
      }
    ]
  },

  island_temple: {
    id: 'island_temple',
    title: '🏛️ Il Tempio sull\'Isola',
    text: `Nuoti verso l'isola. L'acqua è sorprendentemente calda e accogliente. Quando arrivi, ti tiri sulla riva sabbiosa.

Il tempio è piccolo ma bellissimo—colonne di marmo bianco, un tetto dorato che cattura la luce in modi impossibili. La porta è aperta, invitante.

Entri. All'interno c'è una singola stanza circolare. Al centro, su un piedistallo, il CRISTALLO BLU brilla tranquillo.

Ma sulle pareti ci sono incise domande:
"Chi sei?"
"Cosa vuoi?"
"Perché sei qui?"

Una voce echeggia—non sai da dove viene—"Per prendere il cristallo della verità, devi rispondere con verità."`,
    image: 'island_temple.jpg',
    choices: [
      {
        id: 'answer_honestly',
        text: '💙 Rispondi onestamente',
        emoji: '💙',
        preview: 'La verità è importante...',
        next: 'temple_truth',
        stats: { courage: 2, kindness: 1 },
        resonance: 'courage'
      },
      {
        id: 'stay_silent',
        text: '🤫 Rimani in silenzio',
        emoji: '🤔',
        preview: 'A volte il silenzio è una risposta...',
        next: 'temple_silence',
        stats: { curiosity: 2 },
        resonance: 'curiosity'
      }
    ]
  },

  underwater_world: {
    id: 'underwater_world',
    title: '🐟 Il Mondo Sottomarino',
    text: `Seguendo i pesci luminosi, ti tuffi. Sorprendentemente, puoi respirare sott'acqua! Il lago ti ha dato un dono temporaneo.

I pesci ti guidano sempre più in profondità. Vedi cose meravigliose—giardini di alghe che danzano, conchiglie che cantano, cavallucci marini che ti salutano.

I pesci si fermano davanti a un'enorme roccia che blocca un passaggio. Sembrano tristi.

"Non possiamo tornare a casa," dice uno dei pesci (puoi capirli!). "Questa roccia è caduta e non riusciamo a spostarla. Le nostre famiglie sono dall'altra parte."

La roccia è enorme. Troppo pesante per te. Ma poi noti qualcosa—è appoggiata su un fulcro naturale. Forse con la giusta leva...`,
    image: 'underwater_garden.jpg',
    choices: [
      {
        id: 'move_rock',
        text: '💪 Usa una leva per muovere la roccia',
        emoji: '🔧',
        preview: 'Intelligenza e forza insieme!',
        next: 'rock_moved',
        stats: { courage: 2, curiosity: 2 },
        resonance: 'balance'
      },
      {
        id: 'find_another_way',
        text: '🔍 Cerca un altro passaggio',
        emoji: '🔎',
        preview: 'Forse c\'è un\'altra soluzione...',
        next: 'alternate_path',
        stats: { curiosity: 3 },
        resonance: 'curiosity'
      }
    ]
  },

  // ============================================
  // NODI PLACEHOLDER - Work in Progress
  // ============================================

  coming_soon: {
    id: 'coming_soon',
    title: '✨ In Arrivo...',
    text: `Hai esplorato tutto il contenuto disponibile in questa versione!

🚧 **Questa parte della storia è ancora in sviluppo.**

La tua avventura nel Regno dei Sogni continuerà presto con nuovi capitoli, cristalli da trovare e misteri da svelare.

Grazie per aver giocato! 🌟`,
    image: 'start_clearing.jpg',
    choices: [
      {
        id: 'restart_game',
        text: '🔄 Ricomincia l\'avventura',
        emoji: '🔄',
        preview: 'Gioca di nuovo e scopri percorsi diversi!',
        next: 'start',
        stats: {}
      }
    ],
    isEnding: true
  },

  // Stub nodes - redirect to coming_soon
  alternate_path: {
    id: 'alternate_path',
    title: '🔍 Un Altro Sentiero',
    text: 'Trovi un passaggio alternativo che ti porta verso nuove avventure...',
    choices: [{
      id: 'continue_alt',
      text: '→ Continua',
      emoji: '✨',
      next: 'coming_soon',
      stats: { curiosity: 1 }
    }]
  },

  ancient_ruins: {
    id: 'ancient_ruins',
    title: '🏛️ Rovine Antiche',
    text: 'Scopri rovine misteriose che nascondono segreti del passato...',
    choices: [{
      id: 'explore_ruins',
      text: '→ Esplora',
      emoji: '🔦',
      next: 'coming_soon',
      stats: { curiosity: 1 }
    }]
  },

  cave_lesson: {
    id: 'cave_lesson',
    title: '📚 La Lezione della Grotta',
    text: 'La grotta ti insegna una lezione importante sulla pazienza e la saggezza...',
    choices: [{
      id: 'learn_lesson',
      text: '→ Impara',
      emoji: '💡',
      next: 'coming_soon',
      stats: { magic: 1 }
    }]
  },

  cave_wisdom: {
    id: 'cave_wisdom',
    title: '🔮 Saggezza Antica',
    text: 'La grotta rivela saggezza antica incisa nelle sue pareti...',
    choices: [{
      id: 'gain_wisdom',
      text: '→ Continua',
      emoji: '📖',
      next: 'coming_soon',
      stats: { magic: 1 }
    }]
  },

  dual_forest_solution: {
    id: 'dual_forest_solution',
    title: '🌲 Soluzione Doppia',
    text: 'Utilizzi entrambe le tue nature per risolvere l\'enigma della foresta...',
    choices: [{
      id: 'dual_solve',
      text: '→ Procedi',
      emoji: '⚖️',
      next: 'coming_soon',
      stats: { courage: 1, kindness: 1 }
    }]
  },

  forest_complete: {
    id: 'forest_complete',
    title: '🌲 Foresta Completata',
    text: 'Hai esplorato tutta la Foresta dei Sussurri!',
    choices: [{
      id: 'leave_forest',
      text: '→ Continua l\'avventura',
      emoji: '🚶',
      next: 'coming_soon',
      stats: { courage: 1 }
    }]
  },

  forest_to_lake: {
    id: 'forest_to_lake',
    title: '🌲→🌊 Verso il Lago',
    text: 'Lasci la foresta e ti dirigi verso il Lago degli Specchi...',
    choices: [{
      id: 'reach_lake',
      text: '→ Raggiungi il lago',
      emoji: '🌊',
      next: 'lake_shore',
      stats: {}
    }]
  },

  help_fish_quest: {
    id: 'help_fish_quest',
    text: `I pesci ti guidano a una grotta sottomarina. All'interno, il CRISTALLO BLU splende con luce gentile.

"Grazie per averci aiutato!" cantano i pesci. "Questo cristallo è tuo."`,
    title: '🐟 La Ricompensa dei Pesci',
    choices: [{
      id: 'take_blue_crystal',
      text: '💙 Prendi il Cristallo Blu',
      emoji: '💎',
      next: 'coming_soon',
      stats: { kindness: 2 }
    }],
    onEnter: (state) => {
      if (!state.crystalsFound.includes('blu')) {
        state.crystalsFound.push('blu');
      }
    }
  },

  lake_departure: {
    id: 'lake_departure',
    title: '🌊 Partenza dal Lago',
    text: 'Ti congedi dal Lago degli Specchi e prosegui la tua avventura...',
    choices: [{
      id: 'leave_lake',
      text: '→ Avanti',
      emoji: '🚶',
      next: 'coming_soon',
      stats: {}
    }]
  },

  nocino_home: {
    id: 'nocino_home',
    title: '🐿️ Casa di Nocino',
    text: 'Nocino ti mostra la sua casa accogliente tra i rami...',
    choices: [{
      id: 'leave_home',
      text: '→ Prosegui insieme',
      emoji: '🤝',
      next: 'coming_soon',
      stats: { kindness: 1 }
    }]
  },

  ombra_backstory: {
    id: 'ombra_backstory',
    title: '🐺 La Storia di Ombra',
    text: 'Ombra ti racconta la sua storia di solitudine e ricerca...',
    choices: [{
      id: 'comfort_ombra',
      text: '→ Ascolta e conforta',
      emoji: '💙',
      next: 'coming_soon',
      stats: { kindness: 2 }
    }]
  },

  ombra_joins: {
    id: 'ombra_joins',
    title: '🐺 Ombra si Unisce',
    text: 'Ombra decide di unirsi alla tua avventura come fedele compagno!',
    choices: [{
      id: 'continue_with_ombra',
      text: '→ Continuate insieme',
      emoji: '🤝',
      next: 'coming_soon',
      stats: { courage: 1 }
    }],
    onEnter: (state) => {
      if (!state.allies.includes('Ombra')) {
        state.allies.push('Ombra');
      }
    }
  },

  rock_moved: {
    id: 'rock_moved',
    title: '💪 Roccia Spostata!',
    text: 'Con intelligenza e forza, riesci a spostare la roccia! I pesci possono tornare a casa.',
    choices: [{
      id: 'fish_reward',
      text: '→ I pesci ti ringraziano',
      emoji: '🐟',
      next: 'help_fish_quest',
      stats: { courage: 1, kindness: 1 }
    }]
  },

  secret_waterfall: {
    id: 'secret_waterfall',
    title: '💧 Cascata Segreta',
    text: 'Scopri una cascata nascosta che conduce a una grotta luminosa...',
    choices: [{
      id: 'enter_waterfall',
      text: '→ Attraversa la cascata',
      emoji: '💦',
      next: 'coming_soon',
      stats: { curiosity: 1 }
    }]
  },

  solo_to_peak: {
    id: 'solo_to_peak',
    title: '🏔️ Verso la Vetta',
    text: 'Decidi di continuare da solo verso la vetta della montagna...',
    choices: [{
      id: 'climb_alone',
      text: '→ Scala in solitaria',
      emoji: '⛰️',
      next: 'coming_soon',
      stats: { courage: 2 }
    }]
  },

  temple_silence: {
    id: 'temple_silence',
    title: '🤫 Il Silenzio Parla',
    text: `Rimani in silenzio. Il tempio rispetta la tua scelta.

Il CRISTALLO BLU brilla più luminoso. "Il silenzio è anche una forma di verità," dice la voce. "Il cristallo è tuo."`,
    choices: [{
      id: 'take_crystal_silence',
      text: '💙 Prendi il Cristallo Blu',
      emoji: '💎',
      next: 'coming_soon',
      stats: { magic: 2 }
    }],
    onEnter: (state) => {
      if (!state.crystalsFound.includes('blu')) {
        state.crystalsFound.push('blu');
      }
    }
  },

  temple_truth: {
    id: 'temple_truth',
    title: '💙 La Verità Libera',
    text: `Rispondi onestamente a tutte e tre le domande. Parli del tuo cuore, dei tuoi sogni, delle tue paure.

Il tempio vibra di luce blu. "La verità richiede coraggio," dice la voce, approvando. "Il CRISTALLO BLU è tuo."`,
    choices: [{
      id: 'take_crystal_truth',
      text: '💙 Prendi il Cristallo Blu',
      emoji: '💎',
      next: 'coming_soon',
      stats: { courage: 2 }
    }],
    onEnter: (state) => {
      if (!state.crystalsFound.includes('blu')) {
        state.crystalsFound.push('blu');
      }
    }
  },

  to_dragon_peak: {
    id: 'to_dragon_peak',
    title: '🐉 Il Picco del Drago',
    text: 'Ti dirigi verso il leggendario Picco del Drago...',
    choices: [{
      id: 'approach_peak',
      text: '→ Avvicinati',
      emoji: '⛰️',
      next: 'coming_soon',
      stats: { courage: 1 }
    }]
  },

  tree_accepts_joy: {
    id: 'tree_accepts_joy',
    title: '🌳 L\'Albero Gioisce',
    text: 'L\'albero riconosce la gioia nel tuo cuore e si illumina di luce verde...',
    choices: [{
      id: 'receive_blessing',
      text: '→ Ricevi la benedizione',
      emoji: '✨',
      next: 'coming_soon',
      stats: { kindness: 1 }
    }]
  },

  tree_accepts_love: {
    id: 'tree_accepts_love',
    title: '🌳 L\'Albero Accoglie l\'Amore',
    text: 'L\'albero sente l\'amore nelle tue parole e ti dona il suo cristallo...',
    choices: [{
      id: 'receive_green_crystal',
      text: '💚 Ricevi il Cristallo Verde',
      emoji: '💎',
      next: 'coming_soon',
      stats: { kindness: 2 }
    }],
    onEnter: (state) => {
      if (!state.crystalsFound.includes('verde')) {
        state.crystalsFound.push('verde');
      }
    }
  },

  tree_accepts_wonder: {
    id: 'tree_accepts_wonder',
    title: '🌳 L\'Albero si Meraviglia',
    text: 'L\'albero apprezza la tua meraviglia e curiosità verso il mondo...',
    choices: [{
      id: 'continue_wonder',
      text: '→ Continua l\'esplorazione',
      emoji: '🔍',
      next: 'coming_soon',
      stats: { curiosity: 1 }
    }]
  },

  tree_reaction: {
    id: 'tree_reaction',
    title: '🌳 La Reazione dell\'Albero',
    text: 'L\'albero reagisce alle tue parole con un fruscio di foglie...',
    choices: [{
      id: 'observe_reaction',
      text: '→ Osserva',
      emoji: '👀',
      next: 'coming_soon',
      stats: { curiosity: 1 }
    }]
  },

  // ... continuerò con Atto 2 e Atto 3 nelle prossime aggiunte

};
