import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from '../pages/home-page/HomePage';
import Products from '../pages/products/Products';
import CreateProduct from '../pages/create-product/CreateProduct';
import ProductInfo from '../pages/product-info/ProductInfo';

const routes = [
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/products',
    element: <Products />,
  },
  {
    path: '/products/:id',
    element: <ProductInfo />,
  },
  {
    path: '/create-product',
    element: <CreateProduct />,
  },
];

const router = createBrowserRouter(routes, { basename: '/alfa-test' });

export default function Router() {
  return <RouterProvider router={router} />;
}
