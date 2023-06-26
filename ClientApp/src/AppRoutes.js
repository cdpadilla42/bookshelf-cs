import { Counter } from './components/Counter';
import { FetchData } from './components/FetchData';
import { Authors } from './components/Authors';
import { Home } from './components/Home';
import { EditAuthors } from './components/EditAuthors';

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
    path: '/edit/authors',
    element: <EditAuthors />,
  },
];

export default AppRoutes;
