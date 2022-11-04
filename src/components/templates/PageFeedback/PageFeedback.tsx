import type { ReactNode } from 'react';
import { Main } from './styles';

const FEEDBACK_TYPES = {
  loading: 'Loading...',
  error: 'Error',
  empty: 'Not Found',
};

interface PageFeedbackProps {
  type: 'loading' | 'error' | 'empty';
  children?: ReactNode;
}

export default function PageFeedback({ type, children }: PageFeedbackProps) {
  return (
    <Main type={type}>
      <div>
        <h2>{FEEDBACK_TYPES[type]}</h2>
        {typeof children === 'string' ? <p>{children}</p> : children}
      </div>
    </Main>
  );
}
