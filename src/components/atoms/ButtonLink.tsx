import { forwardRef } from 'react';
import type { ForwardedRef } from 'react';
import { Link as RRLink } from 'react-router-dom';
import type { LinkProps as RRLinkProps } from 'react-router-dom';
import styled from 'styled-components';

const buttonLinkSizes = {
  xl: {
    minHeight: 14,
    fontSize: 5.5,
    iconSize: 8,
  },
  lg: {
    minHeight: 12,
    fontSize: 5,
    iconSize: 7,
  },
  md: {
    minHeight: 10,
    fontSize: 4,
    iconSize: 6,
  },
  sm: {
    minHeight: 8,
    fontSize: 3.5,
    iconSize: 5,
  },
  xs: {
    minHeight: 6,
    fontSize: 3,
    iconSize: 4,
  },
};

type ButtonLinkVariant = 'outline' | 'ghost';
type ButtonLinkSize = 'xl' | 'lg' | 'md' | 'sm' | 'xs';

interface StyledButtonLinkProps extends RRLinkProps {
  variant: ButtonLinkVariant;
  size: ButtonLinkSize;
  $isSquare: boolean;
}

const StyledButtonLink = styled(RRLink)<StyledButtonLinkProps>`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: ${({ theme }) => theme.space[2]};
  min-width: ${({ theme, size, $isSquare }) =>
    $isSquare && theme.space[buttonLinkSizes[size].minHeight]};
  min-height: ${({ theme, size }) =>
    theme.space[buttonLinkSizes[size].minHeight]};
  padding: ${({ theme, $isSquare }) =>
    $isSquare ? theme.space[1] : `${theme.space[1]} ${theme.space[4]}`};
  border: ${({ theme, variant }) =>
    variant === 'outline' ? `2px solid ${theme.colors.navy[700]}` : 'none'};
  border-radius: ${({ theme }) => theme.space[0.5]};
  font-size: ${({ theme, size }) =>
    theme.space[buttonLinkSizes[size].fontSize]};
  font-weight: ${({ theme }) => theme.fontWeights.semiBold};
  text-decoration: none;
  color: ${({ theme }) => theme.colors.navy[700]};
  background-color: transparent;

  &:hover {
    background-color: ${({ theme }) => theme.colors.navy[200]};
  }
  &:focus {
    background-color: ${({ theme }) => theme.colors.navy[300]};
  }

  & svg {
    width: ${({ theme, size }) => theme.space[buttonLinkSizes[size].iconSize]};
    height: ${({ theme, size }) => theme.space[buttonLinkSizes[size].iconSize]};
  }
`;

interface ButtonLinkProps extends RRLinkProps {
  variant?: ButtonLinkVariant;
  size?: ButtonLinkSize;
  isSquare?: boolean;
}

const ButtonLink = forwardRef(
  (
    {
      variant = 'ghost',
      size = 'md',
      isSquare = false,
      ...props
    }: ButtonLinkProps,
    ref: ForwardedRef<HTMLAnchorElement>
  ) => {
    return (
      <StyledButtonLink
        ref={ref}
        {...props}
        variant={variant}
        size={size}
        $isSquare={isSquare} // Rename as transient prop
      />
    );
  }
);

export default ButtonLink;
