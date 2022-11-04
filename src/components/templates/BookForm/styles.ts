import styled from 'styled-components';

interface FormRowProps {
  cols?: 2 | 3 | 4;
}

export const FormRow = styled.div<FormRowProps>`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.space[4]};
  margin-bottom: ${({ theme }) => theme.space[4]};

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: ${({ cols }) => `repeat(${cols}, 1fr)`};
  }
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;
