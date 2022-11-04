import { forwardRef } from 'react';
import type { ComponentPropsWithoutRef, ForwardedRef } from 'react';
import styled from 'styled-components';

interface StyledInputProps {
  $isInvalid: boolean;
}

const StyledInput = styled.input<StyledInputProps>`
  width: 100%;
  min-height: ${({ theme }) => theme.space[10]};
  padding: ${({ theme }) => `${theme.space[0.5]} ${theme.space[2]}`};
  border: 1px solid
    ${({ theme, $isInvalid }) =>
      $isInvalid ? theme.colors.red[500] : theme.colors.navy[500]};
  border-radius: ${({ theme }) => theme.space[0.5]};
  background-color: ${({ theme, $isInvalid }) =>
    $isInvalid ? theme.colors.red[100] : theme.colors.white};

  &:hover {
    border-color: ${({ theme, $isInvalid }) =>
      $isInvalid ? theme.colors.red[500] : theme.colors.navy[600]};
  }
  &:focus {
    border-color: ${({ theme, $isInvalid }) =>
      $isInvalid ? theme.colors.red[500] : theme.colors.navy[600]};
    outline: 1px solid
      ${({ theme, $isInvalid }) =>
        $isInvalid ? theme.colors.red[500] : theme.colors.navy[600]};
  }
`;

interface InputProps extends ComponentPropsWithoutRef<'input'> {
  isInvalid?: boolean;
}

const Input = forwardRef(
  (
    { type = 'text', isInvalid = false, ...props }: InputProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <StyledInput
        ref={ref}
        {...props}
        type={type}
        $isInvalid={isInvalid} // Rename as transient prop
      />
    );
  }
);

export default Input;
