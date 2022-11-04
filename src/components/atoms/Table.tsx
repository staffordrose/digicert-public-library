import { forwardRef } from 'react';
import type { ForwardedRef, ReactNode } from 'react';
import styled from 'styled-components';

interface StyledTableProps {
  templateColumns: string;
}

const StyledTable = styled.ul<StyledTableProps>`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[4]};
  margin: 0;
  padding: 0;
  list-style-type: none;

  & > li {
    display: grid;
    grid-template-columns: ${({ templateColumns }) => templateColumns};
    gap: ${({ theme }) => theme.space[4]};

    & > span:first-child {
      font-weight: ${({ theme }) => theme.fontWeights.semiBold};
    }
  }
  & > li:not(:last-child) {
    position: relative;

    &::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: -${({ theme }) => theme.space[2]};
      width: 100%;
      border-bottom: 1px solid ${({ theme }) => theme.colors.navy[100]};
    }
  }
`;

interface TableProps {
  templateColumns?: string;
  tableRows: {
    header: string;
    columns: ReactNode[];
  }[];
}

const Table = forwardRef(
  (
    { templateColumns = '1fr', tableRows, ...props }: TableProps,
    ref: ForwardedRef<HTMLUListElement>
  ) => {
    return (
      <StyledTable ref={ref} {...props} templateColumns={templateColumns}>
        {Array.isArray(tableRows) &&
          tableRows.length > 0 &&
          tableRows.map(({ header, columns }) => {
            return (
              <li key={header}>
                <span>{header}</span>
                {Array.isArray(columns) &&
                  columns.length > 0 &&
                  columns.map((column, i) => {
                    return <span key={`${header}-${i}`}>{column}</span>;
                  })}
              </li>
            );
          })}
      </StyledTable>
    );
  }
);

export default Table;
