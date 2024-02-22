import Home from "../pages/frontend/Home";
import User from "../pages/frontend/User";
import AboutUs from "../pages/frontend/AboutUs";
import Cart from "../pages/frontend/Cart";
import ProductDetail from "../pages/frontend/ProductDetail";
import SignUp from "../pages/frontend/userComponent/SignUp";
import CartDetail from "../pages/frontend/CartDetail";
import Order from "../pages/frontend/Order";
import AllProductByCategory from "../pages/frontend/AllProductByCategory";
import AllProductByBrand from "../pages/frontend/AllProductByBrand";
import PostDetail from "../pages/frontend/PostDetail";
import AllProduct from "../pages/frontend/AllProduct";
import SinglePage from "../pages/frontend/SinglePage";
import UserUpdate from "../pages/frontend/userComponent/UserUpdate";
const RouteSite = [
    { path: '/', component: Home },
    { path: '/user', component: User },
    { path: '/signup', component: SignUp },
    { path: '/cart', component: Cart },
    { path: '/userupdate/:id', component: UserUpdate },
    { path: '/order', component: Order },
    { path: '/cartdetail/:id', component: CartDetail },
    { path: '/aboutus', component: AboutUs },
    { path: '/:slug', component: SinglePage },
    { path: '/allproduct', component: AllProduct },
    { path: '/productdetail/:id', component: ProductDetail },
    { path: '/allproductbycategory/:id', component: AllProductByCategory },
    { path: '/allproductbybrand/:id', component: AllProductByBrand },
    { path: '/postdetail/:id', component: PostDetail },
];
export default RouteSite;