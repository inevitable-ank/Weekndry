import React from 'react';
import { Button } from '../components/ui';

export const HomePage: React.FC<{ onStart?: () => void }> = ({ onStart }) => {
  return (
    <section className="max-w-4xl mx-auto text-center pt-16 pb-24">
      <h2 className="text-5xl font-extrabold weekendly-text mb-4">Weekendly</h2>
      <p className="text-gray-600 mb-8">Design your perfect weekend with activities, vibes, and a beautiful shareable plan.</p>
      <Button size="lg" onClick={onStart} icon="✨">Start Planning</Button>
    </section>
  );
};
