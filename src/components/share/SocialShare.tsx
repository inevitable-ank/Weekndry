import React from 'react';
import { Button } from '../ui';

interface SocialShareProps {
  text: string;
  url?: string;
}

export const SocialShare: React.FC<SocialShareProps> = ({ text, url = window.location.href }) => {
  const shareText = encodeURIComponent(text);
  const shareUrl = encodeURIComponent(url);
  const twitter = `https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`;
  const whatsapp = `https://api.whatsapp.com/send?text=${shareText}%20${shareUrl}`;
  const facebook = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(`${text} ${url}`);
      alert('Copied to clipboard');
    } catch {}
  };

  return (
    <div className="flex flex-wrap gap-2">
      <Button variant="secondary" size="sm" onClick={() => window.open(twitter, '_blank', 'noopener')}>Twitter</Button>
      <Button variant="secondary" size="sm" onClick={() => window.open(whatsapp, '_blank', 'noopener')}>WhatsApp</Button>
      <Button variant="secondary" size="sm" onClick={() => window.open(facebook, '_blank', 'noopener')}>Facebook</Button>
      <Button variant="ghost" size="sm" onClick={copy} icon="📋">Copy</Button>
    </div>
  );
};




