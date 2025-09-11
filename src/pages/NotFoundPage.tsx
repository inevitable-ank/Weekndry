import React from 'react';
import { Button } from '../components/ui';
import { Link } from 'react-router-dom';

export const NotFoundPage: React.FC = () => (
  <section className="max-w-3xl mx-auto text-center pt-20 pb-24">
    <div className="text-6xl mb-4">🧭</div>
    <h2 className="text-3xl font-bold mb-2">Page not found</h2>
    <p className="text-gray-600 mb-6">The page you’re looking for doesn’t exist.</p>
    <div className="max-w-3xl mx-auto h-px bg-gradient-to-r from-transparent via-black/10 to-transparent my-8" />
    <Link to="/planner"><Button icon="🏠">Go to Planner</Button></Link>
  </section>
);

