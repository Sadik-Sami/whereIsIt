import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layout/MainLayout';
import Home from '../pages/Home';
import LostAndFound from '../pages/LostAndFound';
import Login from '../pages/Login';
import Register from '../pages/Register';
const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <div>No Routes</div>,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/lost-found',
        element: <LostAndFound />,
      },
      { path: '/login', element: <Login /> },
      { path: '/register', element: <Register /> },
    ],
  },
]);

export default router;
