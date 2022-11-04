import { useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import useResizeObserver from 'use-resize-observer';
import { BiFilter } from 'react-icons/bi';
import { Button } from '../../atoms';
import { BooksGrid, CatalogSidebar } from '../../templates';
import { Container, Main, Title } from './styles';

export default function Catalog() {
  const location = useLocation();

  const query = useMemo(
    () => queryString.parse(location.search),
    [location.search]
  );

  const [maxHeight, setMaxHeight] = useState(0);

  // TODO: onResize doesn't trigger when selecting author/category,
  // because the height of aside element prevents DOM recalculation for `main` element
  const { ref: mainRef } = useResizeObserver<HTMLElement>({
    onResize: ({ height = 0 }) => {
      setMaxHeight(height + 64 > window.innerHeight ? height : 0);
    },
  });

  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);

  return (
    <Container>
      <CatalogSidebar
        asideContentMaxHeight={maxHeight}
        isModalOpen={isModalOpen}
        setModalOpen={setModalOpen}
      />

      <Main ref={mainRef}>
        <Title>
          <h1>
            {query.category
              ? `Books in "${query.category}"`
              : query.author
              ? `Books by ${query.author}`
              : `All Books`}
          </h1>

          <Button variant='outline' size='md' isSquare onClick={openModal}>
            <BiFilter />
          </Button>
        </Title>

        <BooksGrid />
      </Main>
    </Container>
  );
}
