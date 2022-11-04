import { forwardRef } from 'react';
import type { ForwardedRef } from 'react';
import { Link as RRLink } from 'react-router-dom';
import type { LinkProps as RRLinkProps } from 'react-router-dom';
import styled from 'styled-components';

const StyledLink = styled(RRLink)`
  text-decoration: none;
  color: ${({ theme }) => theme.colors.black};

  &:hover {
    text-decoration: underline;
  }
`;

interface LinkProps extends RRLinkProps {}

const Link = forwardRef(
  (props: LinkProps, ref: ForwardedRef<HTMLAnchorElement>) => {
    return <StyledLink ref={ref} {...props} />;
  }
);

export default Link;
