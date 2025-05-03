import { createBrowserRouter, Navigate, redirect } from 'react-router-dom';
import { store } from './store';
import RootLayout from './layouts/RouterLayout';
import TodoListPage from './pages/TodoListPage';
import ProfilePage from './pages/ProfilePage';
import AuthLayout from './layouts/AuthLayout';
import LoginForm from './components/AuthForm/LoginForm';
import RegisterForm from './components/RegistrationForm/RegisterForm';
import UsersPage from './pages/UsersPage';
import UserProfilePage from './pages/UserProfilePage';

const adminLoader = async () => {
  const state = store.getState();
  const user = state.user.userData;
  if (
    !user ||
    (!user.roles.includes('ADMIN') && !user.roles.includes('MODERATOR'))
  ) {
    return redirect('/');
  }
  return null;
};

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
      {
        path: 'users',
        element: <UsersPage />,
        loader: adminLoader,
      },
      {
        path: 'users/:id',
        element: <UserProfilePage />,
      },
    ],
  },
]);

export default router;
