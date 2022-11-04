import { createSlice } from '@reduxjs/toolkit';
import {
  createBook as createBookApi,
  deleteBook as deleteBookApi,
  fetchBookById as fetchBookByIdApi,
  fetchBooks as fetchBooksApi,
  updateBook as updateBookApi,
} from '../../lib/db';
import { Book } from '../../types';
import { Dispatch, RootState } from '../index';

interface BooksState {
  books: Book[];
  isFetching: boolean;
  count: number;
  error: Error | null;
}

const initialState: BooksState = {
  books: [],
  isFetching: false,
  count: 0,
  error: null,
};

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    booksError(state: BooksState, action: { payload: Error }) {
      state.error = action.payload;
    },
    addBook(state: BooksState, action: { payload: Book }) {
      state.books.push(action.payload);
    },
    deleteBook(state: BooksState, action: { payload: Book['id'] }) {
      return {
        ...state,
        books: state.books.filter((book: Book) => book.id !== action.payload),
      };
    },
    endFetch(state: BooksState) {
      state.isFetching = false;
    },
    replaceAllBooks(
      state: BooksState,
      action: { payload: { books: Book[]; count: number } }
    ) {
      state.books = action.payload.books;
      state.count = action.payload.count;
    },
    startFetch(state: BooksState) {
      state.isFetching = true;
    },
    updateBook(state: BooksState, action: { payload: Book }) {
      const bookIndex = state.books.findIndex(
        (book: Book) => book.id === action.payload.id
      );
      state.books[bookIndex] = action.payload;
    },
  },
});

export const fetchBooksThunk =
  ({
    range,
    eq,
  }: {
    range: [number, number];
    eq?: { tableName: string; value: string };
  }) =>
  async (dispatch: Dispatch) => {
    dispatch(startFetch());

    try {
      const { data, count } = await fetchBooksApi({ range, eq });

      dispatch(replaceAllBooks({ books: data, count: count ?? 0 }));
    } catch (error: any) {
      dispatch(booksError(error));
    } finally {
      dispatch(endFetch());
    }
  };

export const fetchBookByIdThunk =
  (bookId: Book['id']) =>
  async (dispatch: Dispatch, getState: () => RootState) => {
    const state = getState();

    dispatch(startFetch());

    try {
      if (state.books.books.some((book) => book.id === bookId)) {
        return;
      }

      const { data } = await fetchBookByIdApi(bookId);

      dispatch(addBook(data));
    } catch (error: any) {
      dispatch(booksError(error));
    } finally {
      dispatch(endFetch());
    }
  };

export const createBookThunk = (values: Book) => async (dispatch: Dispatch) => {
  dispatch(startFetch());

  try {
    const { data } = await createBookApi(values);

    dispatch(addBook(data));

    return data;
  } catch (error: any) {
    dispatch(booksError(error));
  } finally {
    dispatch(endFetch());
  }
};

export const updateBookThunk = (values: Book) => async (dispatch: Dispatch) => {
  dispatch(startFetch());

  try {
    const { data } = await updateBookApi(values);

    dispatch(updateBook(data));

    return data;
  } catch (error: any) {
    dispatch(booksError(error));
  } finally {
    dispatch(endFetch());
  }
};

export const deleteBookThunk =
  (bookId: Book['id']) => async (dispatch: Dispatch) => {
    dispatch(startFetch());

    try {
      await deleteBookApi(bookId);

      dispatch(deleteBook(bookId));
    } catch (error: any) {
      dispatch(booksError(error));
    } finally {
      dispatch(endFetch());
    }
  };

export const {
  addBook,
  booksError,
  deleteBook,
  endFetch,
  replaceAllBooks,
  startFetch,
  updateBook,
} = booksSlice.actions;
export default booksSlice.reducer;
