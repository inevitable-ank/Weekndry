import React, { createContext, useCallback, useContext, useState } from 'react';

interface AnnouncerContextValue {
  announce: (message: string) => void;
}

const AnnouncerContext = createContext<AnnouncerContextValue | undefined>(undefined);

export const A11yAnnouncer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [message, setMessage] = useState('');

  const announce = useCallback((m: string) => {
    // clear then set to ensure screen readers read changes
    setMessage('');
    // small timeout to force DOM change for AT
    setTimeout(() => setMessage(m), 0);
  }, []);

  return (
    <AnnouncerContext.Provider value={{ announce }}>
      {children}
      <div aria-live="polite" aria-atomic="true" className="sr-only" role="status">
        {message}
      </div>
    </AnnouncerContext.Provider>
  );
};

export function useAnnouncer() {
  const ctx = useContext(AnnouncerContext);
  if (!ctx) throw new Error('useAnnouncer must be used within A11yAnnouncer');
  return ctx;
}

