import styled from 'styled-components';

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  width: 100%;
  max-width: ${({ theme }) => theme.breakpoints.lg};
  min-height: calc(100vh - ${({ theme }) => theme.space[16]});
  margin: 0 auto;
  padding: ${({ theme }) => theme.space[4]};
`;

export const Title = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space[3]};
  align-items: center;
  margin-bottom: ${({ theme }) => theme.space[8]};
  padding: ${({ theme }) => theme.space[4]} 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.navy[100]};

  & > h1 {
    order: 2;
  }
  & > a {
    order: 1;
  }
`;
