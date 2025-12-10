import { useState, useRef } from 'react';

interface SaveManagerProps {
  onExport: () => boolean;
  onImport: (file: File) => Promise<boolean>;
}

export function SaveManager({ onExport, onImport }: SaveManagerProps) {
  const [importStatus, setImportStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    const success = onExport();
    if (success) {
      // Show visual feedback
      console.log('Save exported successfully!');
    }
  };

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setImportStatus('idle');
    const success = await onImport(file);

    if (success) {
      setImportStatus('success');
      setTimeout(() => setImportStatus('idle'), 3000);
    } else {
      setImportStatus('error');
      setTimeout(() => setImportStatus('idle'), 3000);
    }

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="save-manager">
      <h3 className="save-manager-title">💾 Backup</h3>

      <div className="save-manager-actions">
        <button
          className="save-manager-button export"
          onClick={handleExport}
          title="Scarica il salvataggio come file"
        >
          <span className="save-manager-icon">📥</span>
          <span className="save-manager-text">Esporta</span>
        </button>

        <button
          className="save-manager-button import"
          onClick={triggerFileInput}
          title="Carica salvataggio da file"
        >
          <span className="save-manager-icon">📤</span>
          <span className="save-manager-text">Importa</span>
        </button>

        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          onChange={handleImport}
          style={{ display: 'none' }}
        />
      </div>

      {importStatus === 'success' && (
        <div className="save-manager-status success">
          ✅ Salvataggio caricato!
        </div>
      )}

      {importStatus === 'error' && (
        <div className="save-manager-status error">
          ❌ Errore nel caricamento
        </div>
      )}

      <p className="save-manager-help">
        Esporta per backup, importa per ripristinare
      </p>
    </div>
  );
}
