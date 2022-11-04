import { forwardRef } from 'react';
import type { ForwardedRef } from 'react';
import { Link as RRLink } from 'react-router-dom';
import type { LinkProps as RRLinkProps } from 'react-router-dom';
import styled from 'styled-components';

const StyledCard = styled(RRLink)`
  display: block;
  border-radius: ${({ theme }) => theme.space[0.5]};
  text-decoration: none;
  color: ${({ theme }) => theme.colors.black};

  &:hover {
    background-color: ${({ theme }) => theme.colors.navy[200]};
  }
  &:focus {
    background-color: ${({ theme }) => theme.colors.navy[300]};
  }
`;

interface CardProps extends RRLinkProps {}

const Card = forwardRef(
  (props: CardProps, ref: ForwardedRef<HTMLAnchorElement>) => {
    return <StyledCard ref={ref} {...props} />;
  }
);

export default Card;
