import { createBrowserRouter, RouterProvider ,Navigate} from 'react-router-dom';
import { LoginPage } from './pages/Login';
import { decodeToken } from './utils/jwtService';
import { LandingPage } from './pages/LandingPage';
import ProductList from './pages/ProductList';
import ProductDetails from './pages/ProductDetails';
import MyCart from './pages/MyCart';
import Checkout from './pages/Checkout';
import PaymentSuccess from './pages/paymentSuccess';
import ProtectCheckout from './components/protectCheckout';

const PrivateRoute = ({ element }) => {
  const user = decodeToken(); 
  return user ? element : <Navigate to="/" replace />;
};

const router = createBrowserRouter([
  {
    path: '/Login',
    element: <LoginPage />,
  },
  {
    path : '/MyCart',
    element : <PrivateRoute element={<MyCart />} />
  },
  {
    path :'/',
    element : <LandingPage />
  },
  {
    path : '/ProductList',
    element : <ProductList />
  },
  {
    path : '/Productdetails',
    element : <ProductDetails />
  },
  {
    path : '/Checkout',
    element : <PrivateRoute element={<ProtectCheckout><Checkout /></ProtectCheckout>} />
  },
  {
    path : '/paymentSuccess',
    element : <PrivateRoute element={<PaymentSuccess />} />
  }
  
]);

export function Router() {
  return <RouterProvider router={router} />;
}
