import {
  FolderGit2,
  Plus,
  ShoppingBasket,
  CirclePlus,
  ListOrdered,
  Logs,
  ImagePlus,
} from "lucide-react";
import { Link, NavLink, Outlet } from "react-router-dom";

const Layouts = () => {
  return (
    <>
      <div className="flex font-class mx-auto max-w-6xl ">
        {/* dashboard side bar */}
        <div className="lg:w-64 min-h-screen  bg-[#ece7d4a8] bg-gradient-to-r from-[#ece7d4a8] via-[#fff0b3] backdrop-blur-lg">
          <ul className="menu space-y-2 p-4 text-xl text-black">
            <>
              <li>
                <img
                  className="lg:w-[250px] w-[300px]"
                  src="https://i.ibb.co/PtyxSjS/logo.png"
                />
              </li>
              <li>
                <Link to="/">
                  <ShoppingBasket className="me-3" />
                  All Products
                </Link>
              </li>
              <li>
                <NavLink to="/addProduct">
                  <Plus className="me-3" />
                  Add Product
                </NavLink>
              </li>

              <li>
                <NavLink to="/allCategories">
                  <FolderGit2 className="me-3" />
                  All Categories
                </NavLink>
              </li>

              <li>
                <NavLink to="/addCategories">
                  <CirclePlus className="me-3" />
                  Add Categories
                </NavLink>
              </li>

              <li>
                <NavLink to="/allOrders">
                  <Logs className="me-3" />
                  Orders
                </NavLink>
              </li>
              <li>
                <NavLink to="/allBanners">
                  <ImagePlus className="me-3" />
                  Banners
                </NavLink>
              </li>
            </>
          </ul>
        </div>
        {/* dashboard content */}
        <div className="flex-1 p-8 bg-[#fffaf0] backdrop-blur-lg">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Layouts;
