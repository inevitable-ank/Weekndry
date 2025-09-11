import React from 'react';
import { Button } from '../ui';
import { exportElementToPng } from '../../services/exportService';

export const ExportOptions: React.FC<{ targetRef: React.RefObject<HTMLElement> }> = ({ targetRef }) => {
  const onPng = async () => {
    if (!targetRef.current) return;
    await exportElementToPng(targetRef.current as HTMLElement, 'Weekendly-Plan.png');
  };
  return (
    <div className="flex flex-wrap gap-2">
      <Button onClick={onPng} icon="📸">Export PNG</Button>
      <Button variant="secondary" disabled>Export PDF</Button>
    </div>
  );
};


