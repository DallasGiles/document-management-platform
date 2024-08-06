import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';


import {createBrowserRouter, RouterProvider} from'react-router-dom';
import ManagementPage from './pages/ManagementPage';
import EmployeePage from './pages/EmployeePage';
import Login from './pages/Login';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Login />
      },
      {
        path: '/management',
        element: <ManagementPage />
      },
      {
        path: '/employee',
        element: <EmployeePage />
      }
    ]
  }
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
=======
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')

);
