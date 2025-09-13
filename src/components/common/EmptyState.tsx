import React from 'react';
import { Button } from '../ui';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ icon = '✨', title, description, actionLabel, onAction }) => {
  return (
    <div className="text-center p-10 bg-white/60 rounded-2xl border border-dashed">
      <div className="text-4xl mb-3" aria-hidden>{icon}</div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      {description && <p className="text-gray-500 mb-4">{description}</p>}
      {actionLabel && onAction && (
        <Button onClick={onAction}>{actionLabel}</Button>
      )}
    </div>
  );
};


