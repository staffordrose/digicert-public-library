import styled from 'styled-components';

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  width: 100%;
  max-width: ${({ theme }) => theme.breakpoints.xl};
  margin: ${({ theme }) => theme.space[8]} auto;
  min-height: calc(100vh - ${({ theme }) => theme.space[16]});
  padding: ${({ theme }) => theme.space[4]};

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    margin: ${({ theme }) => theme.space[16]} auto;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const Article = styled.article`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[8]};
  width: 100%;
  margin-top: ${({ theme }) => theme.space[8]};

  & > div:first-child {
    flex-shrink: 0;
    width: 100%;
  }
  & > div:last-child {
    width: 100%;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    flex-direction: row;
    margin-top: ${({ theme }) => theme.space[16]};

    & > div:first-child {
      width: 320px;
    }
  }
`;
