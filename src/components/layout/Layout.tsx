import React from 'react';
import { Header } from './Header';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col items-stretch">
      <Header />
      <main className="flex-1 px-6">
        {children}
      </main>
    </div>
  );
};
