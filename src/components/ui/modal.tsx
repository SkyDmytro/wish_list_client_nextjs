'use client';

import { XIcon } from 'lucide-react';

import Portal from '../Portal/Portal';

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  title: string;
  onClose: () => void;
  actions?: React.ReactNode;
}

export const Modal = ({
  children,
  isOpen,
  title,
  onClose,
  actions,
}: ModalProps) => {
  if (!isOpen) return null;

  return (
    <Portal>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 "
        onClick={onClose}
      >
        <div
          className="relative md:w-1/4 sm:w-2/3 min-h-1/2 max-h-2/3 rounded-2xl bg-gray-900 text-white shadow-lg p-6"
          onClick={(e) => e.stopPropagation()}
        >
          <header className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">{title}</h2>
            <button onClick={onClose} aria-label="Close">
              <XIcon />
            </button>
          </header>
          <main className="overflow">{children}</main>
          {actions && <footer className="mt-4">{actions}</footer>}
        </div>
      </div>
    </Portal>
  );
};
