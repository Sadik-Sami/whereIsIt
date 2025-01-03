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
import MyPosts from '../pages/MyPosts';
import RecoveredItems from '../pages/RecoveredItems';
import ErrorPage from '../pages/ErrorPage';
const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
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
      {
        path: '/my-items',
        element: (
          <PrivateRoute>
            <MyPosts />
          </PrivateRoute>
        ),
      },
      {
        path: '/recovered',
        element: (
          <PrivateRoute>
            <RecoveredItems />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
