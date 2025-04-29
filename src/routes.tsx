import { createBrowserRouter, Navigate } from 'react-router-dom';
import RootLayout from './layouts/RouterLayout';
import TodoListPage from './pages/TodoListPage';
import ProfilePage from './pages/ProfilePage';
import AuthLayout from './layouts/AuthLayout';
import LoginForm from './components/AuthForm/LoginForm';
import RegisterForm from './components/RegistrationForm/RegisterForm';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      {
        path: '/login',
        element: <LoginForm />,
      },
      {
        path: '/register',
        element: <RegisterForm />,
      },
    ],
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
