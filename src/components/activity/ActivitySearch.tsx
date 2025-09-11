import React from 'react';
import { Input } from '../ui';

interface ActivitySearchProps {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}

export const ActivitySearch: React.FC<ActivitySearchProps> = ({ value, onChange, placeholder = 'Search activities...' }) => {
  return (
    <Input
      placeholder={placeholder}
      aria-label="Search activities"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      icon="🔎"
      className="md:max-w-sm"
    />
  );
};


