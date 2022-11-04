import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  min-height: ${({ theme }) => theme.space[14]};
  padding: 0 ${({ theme }) => theme.space[4]};
  border-top: 1px solid ${({ theme }) => theme.colors.navy[100]};
`;

export const PageInfo = styled.span`
  font-size: 1.125rem;
  font-weight: ${({ theme }) => theme.fontWeights.semiBold};
  color: ${({ theme }) => theme.colors.navy[800]};
`;
