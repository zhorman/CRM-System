import { createBrowserRouter, Navigate, redirect } from 'react-router-dom';
import { store } from './store';
import RootLayout from './pages/RouterLayout';
import TodoListPage from './pages/TodoListPage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import UsersPage from './pages/UsersPage';
import UserProfilePage from './pages/UserProfilePage';

const adminLoader = async () => {
  const state = store.getState();
  const user = state.user.userData;
  if (!user || !user.roles.includes('ADMIN')) {
    return redirect('/');
  }
  return null;
};

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
