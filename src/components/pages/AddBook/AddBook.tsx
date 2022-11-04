import { useHistory } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';
import { Book } from '../../../types';
import { useDispatch } from '../../../store';
import { Button } from '../../atoms';
import { BookForm } from '../../templates';
import type { BookFormValues } from '../../templates';
import { Main, Title } from './styles';
import { createBookThunk } from '../../../store/slices/books';

export default function AddBook() {
  const history = useHistory();

  const dispatch = useDispatch();

  const handleSubmit = async (values: BookFormValues) => {
    try {
      const book = await dispatch(createBookThunk(values as Book));

      if (book?.id) {
        history.push(`/${book.id}`);
      }
    } catch (error) {
      // TODO: Handle error
      console.log(error);
    }
  };

  return (
    <Main>
      <Title>
        <h1>Add Book</h1>

        <Button
          size='lg'
          isSquare
          aria-label='Go back'
          onClick={history.goBack}
        >
          <BiArrowBack />
        </Button>
      </Title>

      <BookForm
        book={{} as Book}
        onSubmit={(values: BookFormValues) => handleSubmit(values)}
      />
    </Main>
  );
}
