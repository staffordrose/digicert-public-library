import styled from 'styled-components';

interface MainProps {
  type: 'loading' | 'error' | 'empty';
}

export const Main = styled.main<MainProps>`
  width: 100%;
  background-color: ${({ theme, type }) =>
    type === 'error' ? theme.colors.red[50] : theme.colors.white};

  & > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: ${({ theme }) => theme.space[4]};
    width: 100%;
    max-width: ${({ theme }) => theme.breakpoints.xl};
    min-height: calc(100vh - ${({ theme }) => theme.space[16]});
    margin: 0 auto;
    text-align: center;
    color: ${({ theme, type }) =>
      type === 'error' ? theme.colors.red[700] : theme.colors.navy[700]};
    opacity: ${({ type }) => (type === 'loading' ? 0.25 : 1)};
  }
`;
