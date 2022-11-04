import { forwardRef } from 'react';
import type { ComponentPropsWithoutRef, ForwardedRef } from 'react';
import styled from 'styled-components';

interface StyledTextareaProps {
  $isInvalid: boolean;
}

const StyledTextarea = styled.textarea<StyledTextareaProps>`
  width: 100%;
  min-height: ${({ theme }) => theme.space[10]};
  padding: ${({ theme }) => `${theme.space[2]} ${theme.space[2]}`};
  border: 1px solid
    ${({ theme, $isInvalid }) =>
      $isInvalid ? theme.colors.red[500] : theme.colors.navy[500]};
  border-radius: ${({ theme }) => theme.space[0.5]};
  background-color: ${({ theme, $isInvalid }) =>
    $isInvalid ? theme.colors.red[100] : theme.colors.white};
  resize: vertical;

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

interface TextareaProps extends ComponentPropsWithoutRef<'textarea'> {
  rows?: number;
  isInvalid?: boolean;
}

const Textarea = forwardRef(
  (
    { rows = 8, isInvalid = false, ...props }: TextareaProps,
    ref: ForwardedRef<HTMLTextAreaElement>
  ) => {
    return (
      <StyledTextarea
        ref={ref}
        {...props}
        rows={rows}
        $isInvalid={isInvalid} // Rename as transient prop
      />
    );
  }
);

export default Textarea;
