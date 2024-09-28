import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from '../pages/home-page/HomePage';
import Products from '../pages/products/Products';
import CreateProduct from '../pages/create-product/CreateProduct';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/products',
    element: <Products />,
  },
  {
    path: '/create-product',
    element: <CreateProduct />,
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
