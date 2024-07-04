import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layouts/Layout";
import AddProduct from "../Pages/Add Product/AddProduct";
import AllProducts from "../Pages/AllProducts/AllProducts";
import AllCategories from "../Pages/AllCategories/AllCategories";
import AddCategories from "../Pages/AddCategories/AddCategories";
import AllOrders from "../Pages/AllOrders/AllOrders";
import Banners from "../Pages/Banners/Banners";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    // errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <AllProducts />,
      },

      {
        path: "/addProduct",
        element: <AddProduct />,
      },
      {
        path: "/allCategories",
        element: <AllCategories />,
      },
      {
        path: "/addCategories",
        element: <AddCategories />,
      },
      {
        path: "/allBanners",
        element: <Banners />,
      },
      {
        path: "/allOrders",
        element: <AllOrders />,
      },
      //   {
      //     path: "/categoryWiseProducts/:id/:category_name",
      //     element: <CategoryWiseProducts />,
      //   },
    ],
  },
]);

export default Router;
