import type { ReactNode } from 'react';
import AnimateHeight from 'react-animate-height';

interface DisclosureProps {
  isOpen: boolean;
  animateOpacity?: boolean;
  duration?: number;
  startingHeight?: 'auto' | number | `${number}%`;
  endingHeight?: 'auto' | number | `${number}%`;
  children: ReactNode;
}

export default function Disclosure({
  isOpen,
  duration,
  animateOpacity = false,
  startingHeight = 0,
  endingHeight = 'auto',
  children,
}: DisclosureProps) {
  return (
    <AnimateHeight
      duration={duration}
      animateOpacity={animateOpacity}
      height={isOpen ? endingHeight : startingHeight}
    >
      {children}
    </AnimateHeight>
  );
}
