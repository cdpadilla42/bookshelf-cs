import { Counter } from './components/Counter';
import { FetchData } from './components/FetchData';
import Authors from './components/Authors';
import { Home } from './components/Home';
import EditAuthors from './components/EditAuthors';
import EditBook from './components/EditBook';
import Books from './components/Books.tsx';

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
    path: '/page/authors',
    element: <Authors />,
  },
  {
    path: '/page/books',
    element: <Books />,
  },
  {
    path: '/edit/authors',
    element: <EditAuthors />,
  },
  {
    path: '/edit/books',
    element: <EditBook />,
  },
  {
    path: '/edit/books/:id',
    element: <EditBook />,
  },
];

export default AppRoutes;
