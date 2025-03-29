import { createBrowserRouter, redirect } from 'react-router-dom';
import RootLayout from './pages/RouterLayout';
import TodoListPage from './pages/TodoListPage';
import ProfilePage from './pages/ProfiePage';

const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    children: [
      {
        index: true,
        loader: () => redirect('/todolist'),
      },
      { path: 'todolist', Component: TodoListPage },
      {
        path: 'profile',
        Component: ProfilePage,
      },
    ],
  },
]);

export default router;
