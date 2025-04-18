import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from './routes';
import { Provider } from 'react-redux';

import '@ant-design/v5-patch-for-react-19';
import 'antd/dist/reset.css';
import './index.css';

import { store } from './store/index';

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
