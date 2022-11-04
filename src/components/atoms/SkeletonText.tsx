import styled from 'styled-components';

const StyledSkeletonText = styled.span`
  display: flex;
  min-height: ${({ theme }) => theme.space[4]};
  border-radius: ${({ theme }) => theme.space[0.5]};
  background-color: ${({ theme }) => theme.colors.gray[100]};
`;

export default function SkeletonText() {
  return <StyledSkeletonText />;
}
