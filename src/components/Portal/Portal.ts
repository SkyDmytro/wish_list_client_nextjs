'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const Portal = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = useState(false);
  const [portalElement, setPortalElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const element = document.createElement('div');
    document.body.appendChild(element);
    setPortalElement(element);
    setMounted(true);
    return () => {
      document.body.removeChild(element);
    };
  }, []);

  if (!mounted || !portalElement) return null;

  return createPortal(children, portalElement);
};

export default Portal;
