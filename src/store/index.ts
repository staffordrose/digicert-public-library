import { configureStore } from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook,
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector,
} from 'react-redux';
import booksReducer from './slices/books';

export const store = configureStore({
  reducer: {
    books: booksReducer,
  },
});

export type Dispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useDispatch: () => Dispatch = useReduxDispatch;
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
