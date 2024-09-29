import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from '../pages/home-page/HomePage';
import Products from '../pages/products/Products';
import CreateProduct from '../pages/create-product/CreateProduct';
import ProductInfo from '../pages/product-info/ProductInfo';

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
    path: '/products/:id',
    element: <ProductInfo />,
  },
  {
    path: '/create-product',
    element: <CreateProduct />,
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
