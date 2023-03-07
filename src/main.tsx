import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Register from './routes/Register';
import Login from './routes/Login';
import Start from './routes/Start';
import ErrorPage from './error-page';
import Dashboard from './routes/auth/Dashboard';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Start />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/dashboard',
    element: localStorage.getItem('isAuth') ? <Dashboard /> : <Login />,
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
