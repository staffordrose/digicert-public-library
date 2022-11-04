import styled from 'styled-components';

export const StyledFooter = styled.footer`
  width: 100%;
  padding: ${({ theme }) => theme.space[8]} 0;
  border-top: 1px solid ${({ theme }) => theme.colors.navy[100]};

  & > div {
    display: grid;
    grid-template-columns: 1fr;
    align-items: flex-start;
    gap: ${({ theme }) => theme.space[8]};
    width: 100%;
    max-width: ${({ theme }) => theme.breakpoints.xl};
    margin: 0 auto;

    & > div {
      width: 100%;
      padding: 0 ${({ theme }) => theme.space[4]};

      & > h5 {
        margin-bottom: ${({ theme }) => theme.space[4]};
      }
      & > ul {
        display: flex;
        flex-direction: column;
        gap: ${({ theme }) => theme.space[2]};
        margin: 0;
        padding: 0;
        list-style-type: none;
      }
    }
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    & > div {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    & > div {
      grid-template-columns: repeat(3, 1fr);
    }
  }
`;
