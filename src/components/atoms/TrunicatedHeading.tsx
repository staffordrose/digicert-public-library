import { forwardRef } from 'react';
import type { ComponentPropsWithoutRef, ForwardedRef } from 'react';
import styled from 'styled-components';

// Parent must have `min-width` set to 0

const StyledTrunicatedHeading = styled.h6`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

interface TrunicatedHeadingProps extends ComponentPropsWithoutRef<'h6'> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

const TrunicatedHeading = forwardRef(
  (props: TrunicatedHeadingProps, ref: ForwardedRef<HTMLHeadingElement>) => {
    return <StyledTrunicatedHeading ref={ref} {...props} />;
  }
);

export default TrunicatedHeading;
