import { Fragment, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import queryString from 'query-string';
import { BiEditAlt } from 'react-icons/bi';
import { languages } from '../../../data';
import { useSmallScreenMediaQuery } from '../../../hooks';
import { useDispatch, useSelector } from '../../../store';
import { fetchBookByIdThunk } from '../../../store/slices/books';
import { ButtonLink, Link, Table } from '../../atoms';
import { PageFeedback } from '../../templates';
import { Article, ButtonContainer, Main } from './styles';

export default function BookDetail() {
  const isSmallScreen = useSmallScreenMediaQuery();

  const dispatch = useDispatch();

  const { bookId } = useParams<{ bookId: string }>();

  useEffect(() => {
    const handler = async () => {
      await dispatch(fetchBookByIdThunk(bookId));
    };

    handler();
  }, [dispatch, bookId]);

  const book = useSelector((state) =>
    state.books.books.find((b) => b.id === bookId)
  );
  const isFetching = useSelector((state) => state.books.isFetching);
  const error = useSelector((state) => state.books.error);

  if (isFetching) {
    return <PageFeedback type='loading' />;
  }

  if (error) {
    return <PageFeedback type='error'>{error.message}</PageFeedback>;
  }

  if (!book) {
    return (
      <PageFeedback type='empty'>
        It doesn't look like this book exists
      </PageFeedback>
    );
  }

  const {
    title,
    subtitle,
    publisher,
    published_date,
    description,
    image_link_thumb,
    language,
    authors,
    categories,
  } = book;

  return (
    <Main>
      <ButtonContainer>
        {isSmallScreen ? (
          <ButtonLink
            variant='outline'
            isSquare
            aria-label='Edit book'
            to={`/${bookId}/edit`}
          >
            <BiEditAlt />
          </ButtonLink>
        ) : (
          <ButtonLink
            variant='outline'
            aria-label='Edit book'
            to={`/${bookId}/edit`}
          >
            <BiEditAlt />
            <span>Book</span>
          </ButtonLink>
        )}
      </ButtonContainer>

      <Article>
        <div>
          <h1>{title}</h1>
        </div>

        <div>
          <Table
            templateColumns='120px 1fr'
            tableRows={[
              {
                header: 'Thumbnail',
                columns: [
                  image_link_thumb ? (
                    <img
                      src={image_link_thumb}
                      alt={`${title} Thumbnail`}
                      width='80px'
                    />
                  ) : null,
                ],
              },
              {
                header: 'Title',
                columns: [title],
              },
              {
                header: 'Subtitle',
                columns: [subtitle],
              },
              {
                header: 'Authors',
                columns: [
                  authors?.map(({ name }, i) => (
                    <Fragment key={name}>
                      <Link
                        to={`?${queryString.stringify({
                          author: name,
                        })}`}
                      >
                        {name}
                      </Link>
                      {i < authors.length - 1 && <span>{`, `}</span>}
                    </Fragment>
                  )),
                ],
              },
              {
                header: 'Categories',
                columns: [
                  categories?.map(({ name }, i) => (
                    <Fragment key={name}>
                      <Link
                        to={`?${queryString.stringify({
                          category: name,
                        })}`}
                      >
                        {name}
                      </Link>
                      {i < categories.length - 1 && <span>{`, `}</span>}
                    </Fragment>
                  )),
                ],
              },
              {
                header: 'Description',
                columns: [description],
              },
              {
                header: 'Publisher',
                columns: [publisher],
              },
              {
                header: 'Published date',
                columns: [published_date],
              },
              {
                header: 'Language',
                columns: [languages[language]],
              },
            ]}
          />
        </div>
      </Article>
    </Main>
  );
}
