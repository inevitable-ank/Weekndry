import React, { useRef } from 'react';
import { Button } from '../components/ui';
import { ShareCard } from '../components/share/ShareCard';
import { ExportOptions } from '../components/share/ExportOptions';
import { QRCodeGenerator } from '../components/share/QRCodeGenerator';
import { SocialShare } from '../components/share/SocialShare';

export const SchedulePage: React.FC = () => {
  const exportRef = useRef<HTMLDivElement>(null);

  return (
    <section className="max-w-6xl mx-auto pt-10 pb-24 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Your Weekend Schedule</h2>
          <p className="text-gray-600">Clean, printable view. Share or export below.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" onClick={() => window.print()} icon="🖨️">Print</Button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto h-px bg-gradient-to-r from-transparent via-black/10 to-transparent" />

      <div ref={exportRef as any}>
        <ShareCard />
      </div>

      <div className="flex flex-col md:flex-row items-start justify-between gap-6">
        <ExportOptions targetRef={exportRef as any} />
        <div className="flex items-center gap-6">
          <SocialShare text="Check out my Weekendly plan!" />
          <QRCodeGenerator data={window.location.href} />
        </div>
      </div>
    </section>
  );
};


