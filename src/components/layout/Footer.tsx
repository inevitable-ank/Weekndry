import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-16 border-t border-white/30 bg-white/50 backdrop-blur">
      <div className="max-w-6xl mx-auto px-6 py-6 text-sm text-gray-600 flex flex-col md:flex-row items-center justify-between gap-2">
        <p>© {new Date().getFullYear()} Weekendly</p>
        <p className="opacity-80">Plan well. Live better.</p>
      </div>
    </footer>
  );
};


