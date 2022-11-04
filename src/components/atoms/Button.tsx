import { forwardRef } from 'react';
import type { ComponentPropsWithoutRef, ForwardedRef } from 'react';
import styled from 'styled-components';

const buttonSizes = {
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

type ButtonVariant = 'outline' | 'ghost';
type ButtonColorScheme = 'red' | 'navy';
type ButtonSize = 'xl' | 'lg' | 'md' | 'sm' | 'xs';

interface StyledButtonProps {
  variant: ButtonVariant;
  colorScheme: ButtonColorScheme;
  size: ButtonSize;
  isSquare: boolean;
}

const StyledButton = styled.button<StyledButtonProps>`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: ${({ theme }) => theme.space[2]};
  min-width: ${({ theme, size, isSquare }) =>
    isSquare && theme.space[buttonSizes[size].minHeight]};
  min-height: ${({ theme, size }) => theme.space[buttonSizes[size].minHeight]};
  padding: ${({ theme, isSquare }) =>
    isSquare ? theme.space[1] : `${theme.space[1]} ${theme.space[4]}`};
  border: ${({ theme, variant, colorScheme }) =>
    variant === 'outline'
      ? `2px solid ${theme.colors[colorScheme][700]}`
      : 'none'};
  border-radius: ${({ theme }) => theme.space[0.5]};
  font-size: ${({ theme, size }) => theme.space[buttonSizes[size].fontSize]};
  font-weight: ${({ theme }) => theme.fontWeights.semiBold};
  color: ${({ theme, colorScheme }) => theme.colors[colorScheme][700]};
  background-color: transparent;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme, colorScheme }) =>
      theme.colors[colorScheme][200]};
  }
  &:focus {
    background-color: ${({ theme, colorScheme }) =>
      theme.colors[colorScheme][300]};
  }
  &:disabled {
    background-color: transparent;
    opacity: 0.5;
    cursor: not-allowed;
  }

  & svg {
    width: ${({ theme, size }) => theme.space[buttonSizes[size].iconSize]};
    height: ${({ theme, size }) => theme.space[buttonSizes[size].iconSize]};
  }
`;

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  variant?: ButtonVariant;
  colorScheme?: ButtonColorScheme;
  size?: ButtonSize;
  isSquare?: boolean;
}

const Button = forwardRef(
  (
    {
      variant = 'ghost',
      colorScheme = 'navy',
      size = 'md',
      isSquare = false,
      ...props
    }: ButtonProps,
    ref: ForwardedRef<HTMLButtonElement>
  ) => {
    return (
      <StyledButton
        ref={ref}
        {...props}
        variant={variant}
        colorScheme={colorScheme}
        size={size}
        isSquare={isSquare}
      />
    );
  }
);

export default Button;
