import { Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Footer, Header, PageFeedback } from './components/templates';

const AddBook = lazy(() => import('./components/pages/AddBook'));
const BookDetail = lazy(() => import('./components/pages/BookDetail'));
const Catalog = lazy(() => import('./components/pages/Catalog'));
const EditBook = lazy(() => import('./components/pages/EditBook'));

export default function App() {
  return (
    <>
      <Header />

      <Switch>
        <Route path='/:bookId/edit'>
          <Suspense fallback={<PageFeedback type='loading' />}>
            <EditBook />
          </Suspense>
        </Route>
        <Route path='/add'>
          <Suspense fallback={<PageFeedback type='loading' />}>
            <AddBook />
          </Suspense>
        </Route>
        <Route path='/:bookId'>
          <Suspense fallback={<PageFeedback type='loading' />}>
            <BookDetail />
          </Suspense>
        </Route>
        <Route path='/'>
          <Suspense fallback={<PageFeedback type='loading' />}>
            <Catalog />
          </Suspense>
        </Route>
      </Switch>

      <Footer />
    </>
  );
}
