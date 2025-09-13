import React, { useRef } from 'react';
import { Modal, ModalContent, ModalFooter, Button } from '../ui';
import { ShareCard } from './ShareCard';
import { ExportOptions } from './ExportOptions';
import { QRCodeGenerator } from './QRCodeGenerator';

export const ShareModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Share your weekend" size="xl">
      <ModalContent>
        <div className="space-y-4">
          <div ref={cardRef as any}>
            <ShareCard />
          </div>
          <div className="flex items-start justify-between gap-4">
            <ExportOptions targetRef={cardRef as any} />
            <QRCodeGenerator data={window.location.href} />
          </div>
        </div>
      </ModalContent>
      <ModalFooter>
        <Button variant="ghost" onClick={onClose}>Close</Button>
      </ModalFooter>
    </Modal>
  );
};



