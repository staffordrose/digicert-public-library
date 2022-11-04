import { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';
import { useDispatch, useSelector } from '../../../store';
import {
  deleteBookThunk,
  fetchBookByIdThunk,
  updateBookThunk,
} from '../../../store/slices/books';
import { Book } from '../../../types';
import { Button } from '../../atoms';
import { BookForm, PageFeedback } from '../../templates';
import type { BookFormValues } from '../../templates';
import { Main, Title } from './styles';

export default function EditBook() {
  const history = useHistory();
  const { bookId } = useParams<{ bookId: string }>();

  const dispatch = useDispatch();

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

  const handleSubmit = async (values: BookFormValues) => {
    if (!book?.id) return;

    try {
      await dispatch(updateBookThunk({ id: book.id, ...values } as Book));

      history.push(`/${book.id}`);
    } catch (error) {
      // TODO: Handle error
      console.log(error);
    }
  };

  const handleDelete = async () => {
    if (!book?.id) return;

    try {
      await dispatch(deleteBookThunk(book.id));

      history.push('/');
    } catch (error) {
      // TODO: Handle error
      console.log(error);
    }
  };

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

  return (
    <Main>
      <Title>
        <h1>Edit Book</h1>

        <Button
          size='lg'
          isSquare
          aria-label='Go back to book detail'
          onClick={history.goBack}
        >
          <BiArrowBack />
        </Button>
      </Title>

      <BookForm
        book={book}
        onSubmit={(values: BookFormValues) => handleSubmit(values)}
        handleDelete={handleDelete}
      />
    </Main>
  );
}
