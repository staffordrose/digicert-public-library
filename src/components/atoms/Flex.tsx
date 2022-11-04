import { forwardRef } from 'react';
import type { ComponentPropsWithoutRef, ForwardedRef } from 'react';
import styled from 'styled-components';

type FlexDir = 'row' | 'column';
type Gap = number;

interface StyledFlexProps {
  flexDir?: FlexDir;
  gap?: Gap;
}

const StyledFlex = styled.div<StyledFlexProps>`
  display: flex;
  flex-direction: ${({ flexDir }) => flexDir};
  gap: ${({ gap }) => `${gap}px`};
`;

interface FlexProps extends ComponentPropsWithoutRef<'div'> {
  flexDir?: FlexDir;
  gap?: Gap;
}

const Flex = forwardRef(
  (props: FlexProps, ref: ForwardedRef<HTMLDivElement>) => {
    return <StyledFlex ref={ref} {...props} />;
  }
);

export default Flex;
