import { useEffect, useState, useCallback } from 'react';

export default () => {
  const isClient = typeof window === 'object';

  // keep function reference
  const getSize = useCallback(() => {
    return {
      width: isClient ? window.innerWidth : undefined,
      height: isClient ? window.innerHeight : undefined
    };
  }, [isClient]);

  const [windowSize, setWindowSize] = useState(getSize);

  useEffect(() => {
    if (!isClient) {
      return false;
    }

    function handleResize() {
      // TODO: Review what to do here
      if (0)
        setWindowSize(getSize());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isClient, getSize]); // Empty array ensures that effect is only run on mount and unmount

  return windowSize;
}
