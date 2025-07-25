import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Layout from "./component/Layout/Layout";
import Product from "./component/Product/Product";
import Brands from "./component/Brands/Brands";
import Cart from "./component/Cart/Cart";
import Categories from "./component/Categories/Categories";
import NotFound from "./component/NotFound/NotFound";
import Home from "./component/Home/Home";
import Login from "./component/Login/Login";
import Register from "./component/Register/Register";
import AuthContextProvider from "./context/AuthContext";
import ProtectedRoute from "./component/ProtectedRoute/ProtectedRoute";
import ProtectedSign from "./component/ProtectedRoute/ProtectedSign";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProductDetails from "./component/ProductDetails/ProductDetails";
import CartContextProvider from "./context/CartContext";
import { Toaster } from "react-hot-toast";
import CheckOut from "./component/CheckOut/CheckOut";
import Allorders from "./component/Allorders/Allorders";


function App() {
  const router = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        {
          path: "home",
          element: (
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          ),
        },
        {
          index: true,
          element: (
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          ),
        },
        {
          path: "product",
          element: (
            <ProtectedRoute>
              <Product />
            </ProtectedRoute>
          ),
        },
        {
          path: "productDetails/:id/:cid",
          element: (
            <ProtectedRoute>
              <ProductDetails />
            </ProtectedRoute>
          ),
        },
       
        {
          path: "brands",
          element: (
            <ProtectedRoute>
              <Brands />
            </ProtectedRoute>
          ),
        },
        {
          path: "cart",
          element: (
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          ),
        },
        {
          path: "checkOut",
          element: (
            <ProtectedRoute>
              <CheckOut />
            </ProtectedRoute>
          ),
        },
        {
          path: "allorders",
          element: (
            <ProtectedRoute>
              <Allorders />
            </ProtectedRoute>
          ),
        },
        {
          path: "categories",
          element: (
            <ProtectedRoute>
              <Categories />
            </ProtectedRoute>
          ),
        },
        {
          path: "login",
          element: (
            <ProtectedSign>
              <Login />
            </ProtectedSign>
          ),
        },
        {
          path: "register",
          element: (
            <ProtectedSign>
              <Register />
            </ProtectedSign>
          ),
        },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <CartContextProvider>
          <RouterProvider router={router} />
          <Toaster />
          </CartContextProvider>
        </AuthContextProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
