import styled from 'styled-components';

export const StyledHeader = styled.header`
  position: sticky;
  z-index: 1400;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  width: 100%;
  min-height: ${({ theme }) => theme.space[16]};
  border-bottom: 1px solid ${({ theme }) => theme.colors.navy[100]};
  background-color: ${({ theme }) => theme.colors.white};

  & > div {
    width: 100%;
    max-width: ${({ theme }) => theme.breakpoints.xl};
    margin: 0 auto;
    padding: 0 ${({ theme }) => theme.space[4]};
  }

  & > div > nav > ul {
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.space[4]};
    margin: 0;
    padding: 0;
    list-style-type: none;

    & > :last-child {
      margin-left: auto;
    }
  }
`;
