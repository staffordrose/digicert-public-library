import { forwardRef } from 'react';
import type { ComponentPropsWithoutRef, ForwardedRef } from 'react';
import styled from 'styled-components';

type FeedbackType = 'success' | 'error';

interface StyledFeedbackProps {
  type: FeedbackType;
}

const StyledFeedback = styled.span<StyledFeedbackProps>`
  color: ${({ theme, type }) =>
    theme.colors[type === 'success' ? 'green' : 'red'][700]};
`;

interface FeedbackProps extends ComponentPropsWithoutRef<'div'> {
  type: FeedbackType;
}

const Feedback = forwardRef(
  (props: FeedbackProps, ref: ForwardedRef<HTMLSpanElement>) => {
    return <StyledFeedback ref={ref} {...props} />;
  }
);

export default Feedback;
