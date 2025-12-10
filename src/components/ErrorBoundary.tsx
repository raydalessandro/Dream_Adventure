import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

/**
 * ErrorBoundary - Cattura errori React e mostra UI di fallback
 * Previene schermata bianca in caso di crash
 */
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    // Update state so the next render shows fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error to console for debugging
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({
      error,
      errorInfo
    });
  }

  handleReset = () => {
    // Reset error state and try to recover
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });

    // Reload to start fresh
    window.location.reload();
  };

  handleResetGame = () => {
    // Clear saved game and reload
    localStorage.removeItem('game_state');
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <div className="error-boundary-content">
            <div className="error-boundary-icon">😱</div>
            <h1 className="error-boundary-title">Oops! Qualcosa è andato storto</h1>

            <p className="error-boundary-message">
              Il gioco ha incontrato un problema inaspettato.
              Non preoccuparti, i tuoi progressi sono salvati!
            </p>

            <div className="error-boundary-actions">
              <button
                className="choice-button"
                onClick={this.handleReset}
              >
                <div className="choice-emoji">🔄</div>
                <div className="choice-content">
                  <div className="choice-text">Ricarica il gioco</div>
                  <div className="choice-preview">Mantiene il salvataggio</div>
                </div>
              </button>

              <button
                className="choice-button"
                onClick={this.handleResetGame}
              >
                <div className="choice-emoji">🆕</div>
                <div className="choice-content">
                  <div className="choice-text">Ricomincia da capo</div>
                  <div className="choice-preview">Cancella il salvataggio (solo se il gioco è bloccato)</div>
                </div>
              </button>
            </div>

            {/* Show error details in development */}
            {import.meta.env.DEV && this.state.error && (
              <details className="error-boundary-details">
                <summary>Dettagli tecnici (per sviluppatori)</summary>
                <pre className="error-boundary-stack">
                  <strong>Errore:</strong> {this.state.error.toString()}
                  {this.state.errorInfo && (
                    <>
                      <br /><br />
                      <strong>Stack:</strong>
                      {this.state.errorInfo.componentStack}
                    </>
                  )}
                </pre>
              </details>
            )}

            <p className="error-boundary-help">
              Se il problema persiste, prova a ricominciare da capo
              oppure contatta il supporto.
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
