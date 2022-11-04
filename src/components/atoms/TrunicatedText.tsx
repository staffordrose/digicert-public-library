import { forwardRef } from 'react';
import type { ComponentPropsWithoutRef, ForwardedRef } from 'react';
import styled from 'styled-components';

interface StyledTrunicatedTextProps {
  lines: number;
}

const StyledTrunicatedText = styled.p<StyledTrunicatedTextProps>`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: ${({ lines }) => lines};
  line-clamp: ${({ lines }) => lines};
  -webkit-box-orient: vertical;
`;

interface TrunicatedTextProps extends ComponentPropsWithoutRef<'p'> {
  lines?: number;
}

const TrunicatedText = forwardRef(
  (
    { lines = 1, ...props }: TrunicatedTextProps,
    ref: ForwardedRef<HTMLParagraphElement>
  ) => {
    return <StyledTrunicatedText ref={ref} {...props} lines={lines} />;
  }
);

export default TrunicatedText;
