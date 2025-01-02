import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layout/MainLayout';
import Home from '../pages/Home';
import LostAndFound from '../pages/LostAndFound';
import Login from '../pages/Login';
import Register from '../pages/Register';
import PrivateRoute from './PrivateRoute';
import AddPost from '../pages/AddPost';
import UpdatePost from '../pages/UpdatePost';
import PostDetails from '../pages/PostDetails';
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
      {
        path: '/add-item',
        element: (
          <PrivateRoute>
            <AddPost />
          </PrivateRoute>
        ),
      },
      {
        path: '/update-item/:id',
        element: (
          <PrivateRoute>
            <UpdatePost />
          </PrivateRoute>
        ),
      },
      {
        path: '/post-details/:id',
        element: (
          <PrivateRoute>
            <PostDetails />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
