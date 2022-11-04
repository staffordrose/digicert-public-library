import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: ${({ theme }) => theme.space[8]};
  width: 100%;
  max-width: ${({ theme }) => theme.breakpoints.xl};
  margin: 0 auto;
`;

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: calc(100vh - ${({ theme }) => theme.space[16]});

  & > :nth-child(2) {
    flex: 1;
  }
`;

export const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: ${({ theme }) => theme.space[4]};
  margin-top: ${({ theme }) => theme.space[8]};
  padding: 0 ${({ theme }) => theme.space[4]};

  & > h1 {
    margin: 0;
    padding: 0;
  }
  & > button {
    margin-top: ${({ theme }) => theme.space[1]};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    & > button {
      display: none;
      visibility: hidden;
    }
  }
`;
