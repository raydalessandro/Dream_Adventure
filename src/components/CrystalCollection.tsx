import type { CrystalColor } from '../types';

interface CrystalCollectionProps {
  crystalsFound: CrystalColor[];
}

const crystalData: Record<CrystalColor, { emoji: string; name: string; color: string }> = {
  verde: { emoji: '💚', name: 'Cristallo Verde', color: '#10b981' },
  blu: { emoji: '💙', name: 'Cristallo Blu', color: '#3b82f6' },
  grigio: { emoji: '🩶', name: 'Cristallo Grigio', color: '#6b7280' },
  oro: { emoji: '💛', name: 'Cristallo Oro', color: '#f59e0b' },
  viola: { emoji: '💜', name: 'Cristallo Viola', color: '#8b5cf6' },
  argento: { emoji: '🤍', name: 'Cristallo Argento', color: '#e5e7eb' },
  rosso: { emoji: '❤️', name: 'Cristallo Rosso', color: '#ef4444' }
};

const allCrystals: CrystalColor[] = ['verde', 'blu', 'grigio', 'oro', 'viola', 'argento', 'rosso'];

export function CrystalCollection({ crystalsFound }: CrystalCollectionProps) {
  const foundCount = crystalsFound.length;
  const totalCount = allCrystals.length;
  
  return (
    <div className="crystal-collection">
      <div className="crystal-header">
        <span className="crystal-title">💎 Cristalli dell'Armonia</span>
        <span className="crystal-count">
          {foundCount}/{totalCount}
        </span>
      </div>
      
      <div className="crystal-grid">
        {allCrystals.map((crystal) => {
          const found = crystalsFound.includes(crystal);
          const data = crystalData[crystal];
          
          return (
            <div
              key={crystal}
              className={`crystal-slot ${found ? 'found' : 'locked'}`}
              title={found ? data.name : '???'}
            >
              {found ? (
                <div
                  className="crystal-gem"
                  style={{
                    color: data.color,
                    textShadow: `0 0 10px ${data.color}`
                  }}
                >
                  {data.emoji}
                </div>
              ) : (
                <div className="crystal-locked">🔒</div>
              )}
            </div>
          );
        })}
      </div>

      {foundCount === totalCount && (
        <div className="crystal-complete">
          <div className="crystal-complete-text">
            ✨ Collezione Completa! ✨
          </div>
          <div className="crystal-complete-subtext">
            Hai trovato tutti i Cristalli dell'Armonia!
          </div>
        </div>
      )}

      {foundCount > 0 && foundCount < totalCount && (
        <div className="crystal-progress-text">
          Continua a esplorare per trovare gli altri cristalli!
        </div>
      )}
    </div>
  );
}
