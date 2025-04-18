import { createBrowserRouter, Navigate } from 'react-router-dom';
import RootLayout from './pages/RouterLayout';
import TodoListPage from './pages/TodoListPage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />, 
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/todolist" replace />,
      },
      { path: 'todolist', element: <TodoListPage /> },
      {
        path: 'profile',
        element: <ProfilePage />,
      },
    ],
  },
]);

export default router;
