import { forwardRef } from 'react';
import type { ComponentPropsWithoutRef, ForwardedRef } from 'react';
import styled from 'styled-components';

interface StyledFormProps {}

const StyledForm = styled.form<StyledFormProps>`
  display: flex;
  flex-direction: column;
`;

interface FormProps extends ComponentPropsWithoutRef<'form'> {}

const Form = forwardRef(
  (props: FormProps, ref: ForwardedRef<HTMLFormElement>) => {
    return <StyledForm ref={ref} {...props} />;
  }
);

export default Form;
