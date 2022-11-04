import styled from 'styled-components';

export const Aside = styled.aside`
  flex-shrink: 0;
  position: relative;
  z-index: 0;
  display: none;
  visibility: hidden;
  width: 280px;
  border-right: 1px solid ${({ theme }) => theme.colors.navy[100]};
  background-color: ${({ theme }) => theme.colors.navy[50]};

  &::before {
    content: '';
    position: absolute;
    z-index: 1;
    top: 0;
    right: 100%;
    width: 1800px;
    height: 100%;
    background-color: ${({ theme }) => theme.colors.navy[50]};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: block;
    visibility: visible;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.xl}) {
    width: 320px;
  }
`;

interface AsideContentProps {
  maxHeight?: number;
}

export const AsideContent = styled.div<AsideContentProps>`
  overflow-y: auto;
  width: 100%;
  max-height: ${({ theme, maxHeight }) =>
    maxHeight ? `${maxHeight}px` : `calc(100vh - ${theme.space[16]})`};
  padding: ${({ theme }) => theme.space[4]};
`;

export const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[1]};
  margin: 0;
  margin-bottom: ${({ theme }) => theme.space[4]};
  padding: 0;
  list-style-type: none;
`;
