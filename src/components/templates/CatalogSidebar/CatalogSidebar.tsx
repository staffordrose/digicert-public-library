import { forwardRef, useEffect, useMemo, useState } from 'react';
import type { ForwardedRef } from 'react';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import {
  fetchAuthorsWithBooksCount,
  fetchCategoriesWithBooksCount,
} from '../../../lib/db';
import { AuthorWithBooksCount, CategoryWithBooksCount } from '../../../types';
import { Button, Link } from '../../atoms';
import { Accordion } from '../../molecules';
import { Modal } from '../../organisms';
import { Aside, AsideContent, List } from './styles';

interface FilterMenuProps {
  query: { page?: number; category?: string; author?: string };
  categories?: CategoryWithBooksCount[];
  authors?: AuthorWithBooksCount[];
  onLinkClick?: () => void;
}

function FilterMenu({
  query,
  categories,
  authors,
  onLinkClick,
}: FilterMenuProps) {
  return (
    <Accordion
      items={[
        {
          title: 'Categories',
          mb: 4,
          children: (
            <>
              <List>
                {Array.isArray(categories) &&
                  categories.length > 0 &&
                  categories.map((category) => {
                    return (
                      <li key={category.id}>
                        <Link
                          to={`?${queryString.stringify({
                            page: 1,
                            category: category.name,
                          })}`}
                          onClick={onLinkClick}
                          style={{
                            fontWeight:
                              category.name === query.category ? 600 : 400,
                          }}
                        >
                          {category.name}
                          {typeof category.books_count === 'number' &&
                            category.books_count > 1 &&
                            ` (${category.books_count})`}
                        </Link>
                      </li>
                    );
                  })}
              </List>
              <Button
                variant='outline'
                size='sm'
                aria-label='Load more categories'
                onClick={() => alert('This has not been setup')} // TODO:
              >
                More
              </Button>
            </>
          ),
        },
        {
          title: 'Authors',
          children: (
            <>
              <List>
                {Array.isArray(authors) &&
                  authors.length > 0 &&
                  authors.map((author) => {
                    return (
                      <li key={author.id}>
                        <Link
                          to={`?${queryString.stringify({
                            page: 1,
                            author: author.name,
                          })}`}
                          onClick={onLinkClick}
                          style={{
                            fontWeight:
                              author.name === query.author ? 600 : 400,
                          }}
                        >
                          {author.name}
                          {typeof author.books_count === 'number' &&
                            author.books_count > 1 &&
                            ` (${author.books_count})`}
                        </Link>
                      </li>
                    );
                  })}
              </List>
              <Button
                variant='outline'
                size='sm'
                aria-label='Load more authors'
                onClick={() => alert('This has not been setup')} // TODO:
              >
                More
              </Button>
            </>
          ),
        },
      ]}
    />
  );
}

interface CatalogSidebarProps {
  asideContentMaxHeight?: number;
  isModalOpen: boolean;
  setModalOpen: (isModalOpen: boolean) => void;
}

const CatalogSidebar = forwardRef(
  (
    {
      asideContentMaxHeight = 0,
      isModalOpen,
      setModalOpen,
    }: CatalogSidebarProps,
    ref: ForwardedRef<HTMLElement>
  ) => {
    const location = useLocation();

    const query = useMemo(
      () => queryString.parse(location.search),
      [location.search]
    );

    // TODO: Manage this state in redux
    const [categories, setCategories] = useState<any[]>([]);

    useEffect(() => {
      const handler = async () => {
        const { data } = await fetchCategoriesWithBooksCount();
        setCategories(data);
      };

      handler();
    }, []);

    // TODO: Manage this state in redux
    const [authors, setAuthors] = useState<any[]>([]);

    useEffect(() => {
      const handler = async () => {
        const { data } = await fetchAuthorsWithBooksCount();
        setAuthors(data);
      };

      handler();
    }, []);

    const closeModal = () => setModalOpen(false);

    return (
      <>
        <Modal title='Filter' isOpen={isModalOpen} setOpen={setModalOpen}>
          <FilterMenu
            query={query}
            categories={categories}
            authors={authors}
            onLinkClick={() => {
              closeModal();

              window.scrollTo({
                top: 0,
                behavior: 'smooth',
              });
            }}
          />
        </Modal>

        <Aside ref={ref}>
          <AsideContent maxHeight={asideContentMaxHeight}>
            <FilterMenu
              query={query}
              categories={categories}
              authors={authors}
              onLinkClick={() => {
                window.scrollTo({
                  top: 0,
                  behavior: 'smooth',
                });
              }}
            />
          </AsideContent>
        </Aside>
      </>
    );
  }
);

export default CatalogSidebar;
