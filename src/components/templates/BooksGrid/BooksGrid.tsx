import { useCallback, useEffect, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import queryString from 'query-string';
import { usePrevious } from '../../../hooks';
import { useDispatch, useSelector } from '../../../store';
import { fetchBooksThunk } from '../../../store/slices/books';
import { Card, TrunicatedHeading, TrunicatedText } from '../../atoms';
import { Pagination } from '../../organisms';
import { PageFeedback } from '../../templates';
import { StyledArticle, StyledSection } from './styles';

const ITEMS_PER_PAGE = 12;

export default function BooksGrid() {
  const history = useHistory();
  const { location } = history;

  const dispatch = useDispatch();

  const search = useMemo(
    () => queryString.parse(location.search),
    [location.search]
  );

  const prevSearch = usePrevious(search);

  const page = useMemo(() => (search.page ? Number(search.page) : 1), [search]);

  const setPage = useCallback(
    (change: number) => {
      history.push(
        `?${queryString.stringify({
          ...search,
          page: page + change,
        })}`
      );
    },
    [history, search, page]
  );

  const range = useMemo<[number, number]>(() => {
    return [(page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE - 1];
  }, [page]);

  const prevRange = usePrevious(range);

  useEffect(() => {
    const handler = async () => {
      try {
        const { author, category } = search;

        await dispatch(
          fetchBooksThunk({
            range,
            eq: author
              ? { tableName: 'authors', value: author as string }
              : category
              ? { tableName: 'categories', value: category as string }
              : undefined,
          })
        );
      } catch (error) {
        // TODO: Handle error
        console.log(error);
      }
    };

    if (!Object.is(prevRange, range) || !Object.is(prevSearch, search)) {
      handler();
    }
  }, [dispatch, prevRange, range, prevSearch, search]);

  const books = useSelector((state) => state.books.books);
  const booksCount = useSelector((state) => state.books.count);
  const isFetching = useSelector((state) => state.books.isFetching);
  const error = useSelector((state) => state.books.error);

  const totalPages = useMemo(
    () => Math.max(Math.ceil(booksCount / ITEMS_PER_PAGE), 1),
    [booksCount]
  );

  if (isFetching) {
    return <PageFeedback type='loading' />;
  }

  if (error) {
    return <PageFeedback type='error'>{error.message}</PageFeedback>;
  }

  if (!Array.isArray(books) || !books.length) {
    return <PageFeedback type='empty'>No books match your search</PageFeedback>;
  }

  return (
    <>
      <StyledSection>
        {books.map((book) => {
          return (
            <Card
              key={book.id}
              aria-label={`View ${book.title} details`}
              to={`/${book.id}`}
            >
              <StyledArticle key={book.id}>
                <img src={book.image_link_thumb} alt={book.title} />

                <div>
                  <TrunicatedHeading as='h3'>{book.title}</TrunicatedHeading>
                  <TrunicatedText lines={2}>
                    {book.description || `[No description]`}
                  </TrunicatedText>
                </div>
              </StyledArticle>
            </Card>
          );
        })}
      </StyledSection>

      <Pagination page={page} setPage={setPage} totalPages={totalPages} />
    </>
  );
}
