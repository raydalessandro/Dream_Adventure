import { useState } from 'react';
import { runAllTests } from '../utils/testSuite';

export function TestRunner() {
  const [testResults, setTestResults] = useState<any>(null);
  const [isRunning, setIsRunning] = useState(false);

  const handleRunTests = () => {
    setIsRunning(true);
    
    // Run tests after small delay to show loading state
    setTimeout(() => {
      const results = runAllTests();
      setTestResults(results);
      setIsRunning(false);
    }, 100);
  };

  return (
    <div className="test-runner">
      <div className="test-header">
        <h2>🧪 E2E Test Suite</h2>
        <button 
          className="test-button"
          onClick={handleRunTests}
          disabled={isRunning}
        >
          {isRunning ? '⏳ Running...' : '▶️ Run Tests'}
        </button>
      </div>

      {testResults && (
        <div className="test-results">
          <div className={`test-summary ${testResults.allPassed ? 'passed' : 'failed'}`}>
            {testResults.allPassed ? '✅ ALL TESTS PASSED' : '❌ SOME TESTS FAILED'}
          </div>

          <div className="test-details">
            {Object.entries(testResults.results).map(([name, result]: [string, any]) => (
              <div key={name} className="test-item">
                <div className="test-item-header">
                  <span className="test-icon">{result.passed ? '✅' : '❌'}</span>
                  <span className="test-name">{name}</span>
                </div>
                
                {result.errors && result.errors.length > 0 && (
                  <div className="test-errors">
                    {result.errors.map((error: string, i: number) => (
                      <div key={i} className="test-error">• {error}</div>
                    ))}
                  </div>
                )}
                
                {result.stats && (
                  <div className="test-stats">
                    <span>Completed: {result.stats.completed}</span>
                    <span>Crashed: {result.stats.crashed}</span>
                    <span>Stuck: {result.stats.stuck}</span>
                  </div>
                )}
                
                {result.available && (
                  <div className="test-apis">
                    <strong>Available:</strong> {result.available.join(', ')}
                    {result.missing.length > 0 && (
                      <><br /><strong>Missing:</strong> {result.missing.join(', ')}</>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="test-info">
        <p><strong>Note:</strong> Press F12 to see detailed console output</p>
      </div>
    </div>
  );
}
