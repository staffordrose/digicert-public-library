import styled from 'styled-components';

export const ModalHeader = styled.header`
  position: sticky;
  z-index: 100;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${({ theme }) => theme.space[4]};
  min-height: ${({ theme }) => theme.space[16]};
  padding: 0 ${({ theme }) => theme.space[4]};
  border-bottom: 1px solid ${({ theme }) => theme.colors.navy[100]};
  background-color: ${({ theme }) => theme.colors.white};

  & > h2 {
    visibility: hidden;
  }
`;

export const ModalBody = styled.div`
  padding: ${({ theme }) => theme.space[4]};
`;
