import type { Ending } from '../types';

// ============================================
// FINALI DEL GIOCO
// ============================================

export const endings: Record<string, Ending> = {
  // FINALE 1: Predominanza Gentilezza
  healer_of_hearts: {
    id: 'healer_of_hearts',
    title: '💝 Il Guaritore dei Cuori',
    description: `Hai attraversato il Regno dei Sogni con gentilezza e compassione. Ogni creatura che hai incontrato, ogni essere che hai aiutato, ora ricorda il tuo nome con amore.

I sette cristalli brillano nella tua mano, ma il vero potere non viene da loro. Viene dal tuo cuore, che ha capito la lezione più importante: chi cura gli altri, cura il mondo intero.

Il Regno dei Sogni e la Realtà si sono riuniti, non attraverso la forza, ma attraverso l'amore. E tu sei diventato il loro ponte vivente.

Gli animali della foresta ti hanno incoronato loro protettore. Il Vecchio Orologiaio ti ha donato un piccolo orologio che segna non il tempo, ma i momenti di gentilezza nel mondo.

"Ogni volta che qualcuno fa un atto gentile," ti dice sorridendo, "il tuo orologio suona. E saprai che non sei mai solo."`,
    image: 'healer_ending.jpg',
    achievementText: '✨ Hai sbloccato il finale: IL GUARITORE DEI CUORI\nHai completato il viaggio con gentilezza suprema.',
  },

  // FINALE 2: Predominanza Coraggio
  keeper_of_flame: {
    id: 'keeper_of_flame',
    title: '🔥 Il Custode della Fiamma',
    description: `Hai affrontato ogni paura, ogni ombra, ogni sfida con coraggio indomito. Il drago della Montagna dell'Eco ti ha riconosciuto come guerriero spirituale.

I sette cristalli nella tua mano non sono più solo pietre luminose—sono diventati fiamme viventi che ardono con la tua determinazione. Il potere che hanno rilasciato non distrugge, ma trasforma.

Hai capito che il vero coraggio non è l'assenza di paura, ma la scelta di agire nonostante essa. E questa lezione ha risvegliato nel Regno dei Sogni una forza antica.

Ora sei il Custode della Fiamma—non una fiamma che brucia, ma una fiamma che illumina. Ogni bambino che ha paura può chiamarti, e una piccola scintilla di coraggio apparirà nel loro cuore.

Il Lupo Solitario ti ha donato una piuma di fenice. "Non brucia mai," ti dice. "Come il tuo spirito."`,
    image: 'flame_ending.jpg',
    achievementText: '✨ Hai sbloccato il finale: IL CUSTODE DELLA FIAMMA\nHai completato il viaggio con coraggio supremo.',
  },

  // FINALE 3: Predominanza Curiosità
  weaver_of_tales: {
    id: 'weaver_of_tales',
    title: '📚 Il Tessitore di Storie',
    description: `Hai esplorato ogni sentiero, posto ogni domanda, scoperto ogni segreto. La Farfalla dei Segreti ti ha mostrato la Biblioteca Nascosta—un luogo tra i sogni dove vivono tutte le storie mai raccontate.

I sette cristalli si sono trasformati in pagine luminose. Ogni cristallo è diventato un libro che si scrive da solo, contenente tutte le avventure possibili, tutti i "cosa sarebbe successo se..."

Hai capito che la curiosità non è solo volere sapere—è riconoscere che ogni risposta apre dieci nuove domande, e che questo è bellissimo.

Ora sei il Tessitore di Storie. Ogni notte, i sogni dei bambini ti raggiungono come fili colorati, e tu li intrecci in nuove storie che loro ricorderanno al risveglio come ispirazione.

Il Vecchio Orologiaio ti ha donato una penna che non finisce mai l'inchiostro. "Perché le storie," ti dice, "non finiscono mai davvero."`,
    image: 'weaver_ending.jpg',
    achievementText: '✨ Hai sbloccato il finale: IL TESSITORE DI STORIE\nHai completato il viaggio con curiosità suprema.',
  },

  // FINALE 4: Equilibrio Perfetto
  dream_walker: {
    id: 'dream_walker',
    title: '🌙 Il Camminatore di Sogni',
    description: `Hai bilanciato gentilezza, coraggio e curiosità in perfetta armonia. I sette cristalli non brillano più singolarmente—si sono fusi in un'unica luce che contiene tutti i colori e nessuno specificamente.

Sei diventato qualcosa di raro: un Camminatore di Sogni. Puoi muoverti liberamente tra il mondo dei sogni e la realtà, portando messaggi, guarendo ferite dell'anima, ispirando chi ha perso la speranza.

Il Regno dei Sogni e la Realtà non sono più separati. Sono due facce della stessa medaglia, e tu sei il ponte che le tiene unite.

Ogni creatura che hai incontrato—il Lupo Solitario, la Farfalla dei Segreti, il Vecchio Orologiaio, lo Scoiattolino, persino il Drago—ora ti considera famiglia.

"Non sei più solo Rocco," dice la Farfalla. "Non sei più solo Zara. Sei diventato ciò che serve al momento giusto. E questo è il dono più grande."

Un cristallo piccolo appare nella tua mano. "Per il prossimo bambino che si perderà tra i sogni," sussurra il Vecchio Orologiaio. "Trova loro. Guidali. Come qualcuno ha guidato te."`,
    image: 'walker_ending.jpg',
    achievementText: '✨ Hai sbloccato il finale: IL CAMMINATORE DI SOGNI\nHai completato il viaggio in perfetto equilibrio.',
  },

  // FINALE 5: Se hai salvato tutti
  bridge_builder: {
    id: 'bridge_builder',
    title: '🌉 Il Costruttore di Ponti',
    description: `Non hai lasciato nessuno indietro. Ogni creatura in difficoltà, ogni anima perduta, ogni cuore spezzato—hai teso la mano a tutti.

I sette cristalli hanno creato qualcosa di nuovo: ponti di luce che connettono cuore a cuore, sogno a sogno, mondo a mondo. Nessuno sarà più solo nel Regno dei Sogni.

Hai capito che la vera magia non è il potere su qualcosa, ma la connessione con qualcuno. E quella lezione ha trasformato l'intero regno.

Ora ogni volta che qualcuno si sente solo—in qualsiasi mondo, in qualsiasi tempo—può camminare su uno dei tuoi ponti di luce e trovare un amico.

"I ponti che costruisci," dice il Vecchio Orologiaio con le lacrime agli occhi, "sono fatti della sostanza più forte che esista: la volontà di capire, di perdonare, di includere."

Tutti i tuoi alleati—umani, animali, creature magiche—ora formano un cerchio intorno a te. Non per proteggerti, ma per celebrarti. Sei la prova vivente che la gentilezza è contagiosa.`,
    image: 'bridge_ending.jpg',
    achievementText: '✨ Hai sbloccato il finale: IL COSTRUTTORE DI PONTI\nHai salvato e aiutato ogni creatura che hai incontrato.',
  },

  // FINALE 6: Se hai trovato tutti i segreti
  keeper_of_mysteries: {
    id: 'keeper_of_mysteries',
    title: '🔮 Il Custode dei Misteri',
    description: `Hai trovato ogni sentiero nascosto, ogni porta segreta, ogni sussurro tra le ombre. Il Regno dei Sogni ti ha rivelato i suoi segreti più profondi perché ha riconosciuto in te un vero cercatore.

I sette cristalli si sono trasformati in chiavi—non chiavi che aprono porte, ma chiavi che aprono menti, cuori, possibilità.

Hai scoperto la verità: il Regno dei Sogni non è un luogo separato dalla realtà. È lo spazio tra ciò che è e ciò che potrebbe essere. È l'immaginazione stessa, resa tangibile.

Ora sei il Custode dei Misteri. Quando qualcuno sta per arrendersi, tu sussurri un segreto al loro orecchio—qualcosa che solo loro possono sentire, che riaccende la loro curiosità e li spinge a continuare.

"I misteri," ti dice la Farfalla dei Segreti, ormai tua sorella spirituale, "non sono problemi da risolvere. Sono porte da attraversare. E tu hai capito la differenza."

Nelle tue mani appare un ultimo cristallo—trasparente, quasi invisibile. "È per te," dicono tutti all'unisono. "Il mistero più grande: chi diventerai domani."`,
    image: 'mysteries_ending.jpg',
    achievementText: '✨ Hai sbloccato il finale: IL CUSTODE DEI MISTERI\nHai trovato tutti i segreti nascosti del Regno.',
  },

  // FINALE 7: Percorso veloce/efficiente
  swift_dreamer: {
    id: 'swift_dreamer',
    title: '⚡ Il Sognatore Fulmineo',
    description: `Hai attraversato il Regno dei Sogni con determinazione e focus. Sapevi cosa cercavi, e l'hai trovato nel modo più diretto possibile.

I sette cristalli brillano nella tua mano, raccolti con efficienza impressionante. Il loro potere si è attivato rapidamente, e Regno dei Sogni e Realtà si sono riuniti senza drammi, senza esitazioni.

Hai capito che a volte la via più semplice è quella giusta. Non sempre servono deviazioni, non sempre serve esplorare ogni angolo. A volte serve solo sapere cosa vuoi e andare dritto verso quello.

"Sei stato efficiente," dice il Vecchio Orologiaio con rispetto. "In un mondo che spesso si perde in complessità inutili, tu hai visto l'essenziale. Questo è un dono raro."

Il Regno ti dona un compasso che punta sempre verso il tuo vero desiderio. "Per quando ti sentirai perso," sussurra il vento. "Ricorda: sai già dove andare."`,
    image: 'swift_ending.jpg',
    achievementText: '✨ Hai sbloccato il finale: IL SOGNATORE FULMINEO\nHai completato il viaggio nel minor numero di passi possibile.',
  },

  // FINALE 8: SEGRETO - Sbloccabile solo con condizioni speciali
  awakened_dreamer: {
    id: 'awakened_dreamer',
    title: '🌟 Il Sognatore Risvegliato',
    description: `Hai fatto qualcosa che pochissimi riescono: hai capito la vera natura del Regno dei Sogni.

I sette cristalli si dissolvono nelle tue mani—non perché scompaiono, ma perché si sono fusi con te. Sei diventato tu stesso il cristallo. Sei diventato tu stesso il sogno.

"Non sei venuto qui per salvare il Regno," dice una voce che è tutte le voci insieme—il Lupo, la Farfalla, l'Orologiaio, lo Scoiattolino, persino Rocco e Zara parlano come uno.

"Sei venuto qui per ricordare chi sei sempre stato."

Il Regno dei Sogni e la Realtà non si riuniscono—perché non sono mai stati separati. Quella separazione era un'illusione, un gioco che giocavamo per imparare.

Ora puoi vedere entrambi i mondi simultaneamente. Puoi sentire i sogni di ogni persona, animale, pianta. E capisci che tutti sognano la stessa cosa, in fondo: connessione, significato, amore.

"Sei risvegliato," dicono le voci. "Ma non come chi si sveglia da un sogno. Come chi si sveglia NEL sogno, e realizza che il sogno è reale quanto tutto il resto."

Nelle tue mani appare... niente. Nessun cristallo, nessun oggetto magico. Solo le tue mani. E capisci che è perfetto così.

Perché la vera magia sei tu. Sempre lo è stata.

🌟 FINALE SEGRETO SBLOCCATO 🌟`,
    image: 'awakened_ending.jpg',
    achievementText: '✨✨✨ HAI SBLOCCATO IL FINALE SEGRETO! ✨✨✨\nIL SOGNATORE RISVEGLIATO\nHai scoperto la verità più profonda del Regno dei Sogni.',
    isSecret: true,
  },
};

// Funzione helper per determinare quale finale mostrare
export function determineEnding(
  stats: { courage: number; kindness: number; curiosity: number; magic: number },
  crystalsFound: number,
  secretsUnlocked: number,
  pathLength: number,
  savedAllAllies: boolean,
  _resonancePattern: string[] // Prefixed with _ to indicate intentionally unused
): string {
  // FINALE SEGRETO - condizioni molto specifiche
  if (
    stats.courage >= 15 &&
    stats.kindness >= 15 &&
    stats.curiosity >= 15 &&
    stats.magic >= 5 &&
    crystalsFound === 7 &&
    secretsUnlocked >= 10 &&
    savedAllAllies
  ) {
    return 'awakened_dreamer';
  }

  // FINALE COSTRUTTORE DI PONTI - ha salvato tutti
  if (savedAllAllies && crystalsFound === 7) {
    return 'bridge_builder';
  }

  // FINALE CUSTODE DEI MISTERI - ha trovato tutti i segreti
  if (secretsUnlocked >= 12 && crystalsFound === 7) {
    return 'keeper_of_mysteries';
  }

  // FINALE SOGNATORE FULMINEO - percorso veloce
  if (pathLength <= 15 && crystalsFound === 7) {
    return 'swift_dreamer';
  }

  // FINALE CAMMINATORE DI SOGNI - equilibrio perfetto
  const maxStat = Math.max(stats.courage, stats.kindness, stats.curiosity);
  const minStat = Math.min(stats.courage, stats.kindness, stats.curiosity);
  const isBalanced = maxStat - minStat <= 3;

  if (isBalanced && crystalsFound === 7) {
    return 'dream_walker';
  }

  // FINALI BASATI SU STAT PREDOMINANTE
  if (stats.kindness > stats.courage && stats.kindness > stats.curiosity) {
    return 'healer_of_hearts';
  }

  if (stats.courage > stats.kindness && stats.courage > stats.curiosity) {
    return 'keeper_of_flame';
  }

  if (stats.curiosity > stats.kindness && stats.curiosity > stats.courage) {
    return 'weaver_of_tales';
  }

  // Default (bilanciato ma non perfetto)
  return 'dream_walker';
}
