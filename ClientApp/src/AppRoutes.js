import { Counter } from './components/Counter';
import { FetchData } from './components/FetchData';
import Authors from './components/Authors';
import { Home } from './components/Home';
import EditAuthors from './components/EditAuthors';
import EditBook from './components/EditBook';
import Books from './components/Books.tsx';
import Book from './components/Book.tsx';

const AppRoutes = [
  {
    index: true,
    element: <Home />,
  },
  {
    path: '/counter',
    element: <Counter />,
  },
  {
    path: '/fetch-data',
    element: <FetchData />,
  },
  {
    path: '/admin/books',
    element: <Books />,
  },
  {
    path: '/admin/book/:id',
    element: <Book />,
  },
  {
    path: '/admin/book/edit/:id',
    element: <EditBook />,
  },
  {
    path: '/admin/authors/edit',
    element: <EditAuthors />,
  },
  {
    path: '/admin/authors',
    element: <Authors />,
  },
];

export default AppRoutes;
