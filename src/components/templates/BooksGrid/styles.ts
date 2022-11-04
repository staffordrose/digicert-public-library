import styled from 'styled-components';

export const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[4]};
  padding: ${({ theme }) => theme.space[4]};
`;

export const StyledArticle = styled.article`
  position: relative;
  display: grid;
  grid-template-columns: 80px 1fr;
  width: 100%;

  & > div {
    min-width: 0;
    padding: ${({ theme }) => theme.space[2]};
  }
`;
