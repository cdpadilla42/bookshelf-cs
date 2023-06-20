import { Counter } from './components/Counter';
import { FetchData } from './components/FetchData';
import { Authors } from './components/Authors';
import { Home } from './components/Home';

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
    path: '/authors',
    element: <Authors />,
  },
];

export default AppRoutes;
