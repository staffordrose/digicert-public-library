import { useEffect, useRef } from 'react';

// From useHooks (https://usehooks.com/usePrevious)

export default function usePrevious(value: any) {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}
