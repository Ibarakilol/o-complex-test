'use client';

import { useEffect } from 'react';

export const useWindowScrollBlock = (isBlock: boolean) => {
  useEffect(() => {
    if (isBlock) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isBlock]);
};
