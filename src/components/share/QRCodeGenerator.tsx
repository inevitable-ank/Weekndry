import React from 'react';

export const QRCodeGenerator: React.FC<{ data: string; size?: number; className?: string }> = ({ data, size = 160, className = '' }) => {
  const src = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(data)}`;
  return (
    <img src={src} alt="QR code" width={size} height={size} className={className} />
  );
};




