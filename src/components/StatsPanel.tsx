import type { Stats } from '../types';

interface StatsPanelProps {
  stats: Stats;
}

const statConfig = {
  courage: {
    label: 'Coraggio',
    emoji: '💪',
    color: '#ef4444',
    max: 20
  },
  kindness: {
    label: 'Gentilezza',
    emoji: '💝',
    color: '#ec4899',
    max: 20
  },
  curiosity: {
    label: 'Curiosità',
    emoji: '🔍',
    color: '#8b5cf6',
    max: 20
  },
  magic: {
    label: 'Magia',
    emoji: '✨',
    color: '#f59e0b',
    max: 10
  }
};

export function StatsPanel({ stats }: StatsPanelProps) {
  return (
    <div className="stats-panel">
      <div className="stats-header">
        <span className="stats-title">📊 Le Tue Qualità</span>
      </div>
      
      <div className="stats-grid">
        {Object.entries(statConfig).map(([key, config]) => {
          const value = stats[key as keyof Stats];
          const percentage = Math.min((value / config.max) * 100, 100);
          
          return (
            <div key={key} className="stat-item">
              <div className="stat-label">
                <span className="stat-emoji">{config.emoji}</span>
                <span className="stat-name">{config.label}</span>
                <span className="stat-value">{value}/{config.max}</span>
              </div>
              <div className="stat-bar-container">
                <div
                  className="stat-bar-fill"
                  style={{
                    width: `${percentage}%`,
                    background: config.color,
                  }}
                >
                  <div className="stat-bar-shimmer" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Total power indicator */}
      <div className="stats-total">
        <span className="stats-total-label">Potere Totale:</span>
        <span className="stats-total-value">
          {stats.courage + stats.kindness + stats.curiosity + stats.magic}
        </span>
      </div>
    </div>
  );
}
