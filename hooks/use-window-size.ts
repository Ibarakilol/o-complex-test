'use client';

import { useEffect, useState } from 'react';

import { DEFAULT_LISTENER_DEBOUNCE_INTERVAL } from '@/constants';
import { debounce } from '@/utils';

export const getInitialValues = () => {
  if (typeof window !== 'undefined') {
    return {
      height: window.innerHeight,
      width: window.innerWidth,
    };
  }

  return {
    height: 0,
    width: 0,
  };
};

export const useWindowSize = (interval = DEFAULT_LISTENER_DEBOUNCE_INTERVAL) => {
  const [windowSize, setWindowSize] = useState(getInitialValues);

  useEffect(() => {
    const onWindowResize = () =>
      setWindowSize({
        height: window.innerHeight,
        width: window.innerWidth,
      });

    const handleResize = debounce(onWindowResize, interval);

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [interval]);

  return windowSize;
};
