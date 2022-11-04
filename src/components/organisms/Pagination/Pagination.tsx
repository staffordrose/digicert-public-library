import { forwardRef } from 'react';
import type { ForwardedRef } from 'react';
import { Button } from '../../atoms';
import { Container, PageInfo } from './styles';

interface PaginationProps {
  page: number;
  setPage: (change: number) => void;
  totalPages: number;
}

const Pagination = forwardRef(
  (
    { page, setPage, totalPages }: PaginationProps,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    return (
      <Container ref={ref}>
        <Button
          variant='outline'
          size='sm'
          aria-label='Go to previous page'
          disabled={page === 1}
          onClick={() => {
            setPage(-1);

            window.scrollTo({
              top: 0,
              behavior: 'smooth',
            });
          }}
        >
          Prev
        </Button>

        <PageInfo aria-label={`Page ${page} of ${totalPages}`}>
          {page} / {totalPages}
        </PageInfo>

        <Button
          variant='outline'
          size='sm'
          aria-label='Go to next page'
          disabled={page === totalPages}
          onClick={() => {
            setPage(1);

            window.scrollTo({
              top: 0,
              behavior: 'smooth',
            });
          }}
        >
          Next
        </Button>
      </Container>
    );
  }
);

export default Pagination;
