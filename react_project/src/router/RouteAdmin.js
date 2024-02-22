import BrandEdit from "../pages/backend/brand/BrandEdit";
import BrandIndex from "../pages/backend/brand/BrandIndex";
import BrandTrash from "../pages/backend/brand/BrandTrash";

import CategoryIndex from "../pages/backend/category/CategoryIndex";
import CategoryEdit from "../pages/backend/category/CategoryEdit";
import CategoryTrash from "../pages/backend/category/CategoryTrash";

import BannerIndex from "../pages/backend/banner/BannerIndex";
import BannerEdit from "../pages/backend/banner/BannerEdit";
import BannerTrash from "../pages/backend/banner/BannerTrash";

import ProductIndex from "../pages/backend/product/ProductIndex";
import ProductEdit from "../pages/backend/product/ProductEdit";
import ProductCreate from "../pages/backend/product/ProductCreate";
import ProductImport from "../pages/backend/product/ProductImport";
import ProductSale from "../pages/backend/product/ProductSale";
import ProductStoreSale from "../pages/backend/product/ProductStoreSale";
import ProductEditSale from "../pages/backend/product/ProductEditSale";
import ProductTrash from "../pages/backend/product/ProductTrash";

import TopicIndex from "../pages/backend/topic/TopicIndex";
import TopicEdit from "../pages/backend/topic/TopicEdit";
import TopicTrash from "../pages/backend/topic/TopicTrash";

import PostIndex from "../pages/backend/post/PostIndex";
import PostEdit from "../pages/backend/post/PostEdit";
import PostTrash from "../pages/backend/post/PostTrash";

import PageIndex from "../pages/backend/page/PageIndex";
import PageEdit from "../pages/backend/page/PageEdit";
import PageTrash from "../pages/backend/page/PageTrash";

import OrderIndex from "../pages/backend/order/OrderIndex";
import OrderEdit from "../pages/backend/order/OrderEdit";
import OrderExport from "../pages/backend/order/OrderExport";
import OrderTrash from "../pages/backend/order/OrderTrash";
import OrderDetail from "../pages/backend/order/OrderDetail";

import MenuIndex from "../pages/backend/menu/MenuIndex";
import MenuTrash from "../pages/backend/menu/MenuTrash";
import MenuEdit from "../pages/backend/menu/MenuEdit";

import ConfigIndex from "../pages/backend/config/ConfigIndex";

import UserIndex from "../pages/backend/user/UserIndex";
import UserTrash from "../pages/backend/user/UserTrash";
import UserEdit from "../pages/backend/user/UserEdit";
import UserAdd from "../pages/backend/user/UserAdd";
import ContactIndex from "../pages/backend/contact/ContactIndex";
import ContactReply from "../pages/backend/contact/ContactReply";
import ContactTrash from "../pages/backend/contact/ContactTrash";
import StaffIndex from "../pages/backend/staff/StaffIndex";
import StaffTrash from "../pages/backend/staff/StaffTrash";
import StaffAdd from "../pages/backend/staff/StaffAdd";
import StaffEdit from "../pages/backend/staff/StaffEdit";



const RouteAdmin = [
    //brand
    { path: '/admin/brand/index', component: BrandIndex },
    { path: '/admin/brand/edit/:id', component: BrandEdit },
    { path: '/admin/brand/trash', component: BrandTrash },
    //category
    { path: '/admin/category/index', component: CategoryIndex },
    { path: '/admin/category/edit/:id', component: CategoryEdit },
    { path: '/admin/category/trash', component: CategoryTrash },
    //banner
    { path: '/admin/banner/index', component: BannerIndex },
    { path: '/admin/banner/edit/:id', component: BannerEdit },
    { path: '/admin/banner/trash', component: BannerTrash },
    //product
    { path: '/admin/product/index', component: ProductIndex },
    { path: '/admin/product/trash', component: ProductTrash },
    { path: '/admin/product/create', component: ProductCreate },
    { path: '/admin/product/import', component: ProductImport },
    { path: '/admin/product/sale', component: ProductSale },
    { path: '/admin/product/edit/:id', component: ProductEdit },
    { path: '/admin/product/editsale/:id', component: ProductEditSale },
    { path: '/admin/product/storesale/:id', component: ProductStoreSale },
    //topic
    { path: '/admin/topic/index', component: TopicIndex },
    { path: '/admin/topic/trash', component: TopicTrash },
    { path: '/admin/topic/edit/:id', component: TopicEdit },
    //menu
    { path: '/admin/menu/index', component: MenuIndex },
    { path: '/admin/menu/trash', component: MenuTrash },
    { path: '/admin/menu/edit/:id', component: MenuEdit },
    //post
    { path: '/admin/post/index', component: PostIndex },
    { path: '/admin/post/trash', component: PostTrash },
    { path: '/admin/post/edit/:id', component: PostEdit },
    //page
    { path: '/admin/page/index', component: PageIndex },
    { path: '/admin/page/trash', component: PageTrash },
    { path: '/admin/page/edit/:id', component: PageEdit },
    //order
    { path: '/admin/order/index', component: OrderIndex },
    { path: '/admin/order/trash', component: OrderTrash },
    { path: '/admin/order/export', component: OrderExport },
    { path: '/admin/order/edit/:id', component: OrderEdit },
    { path: '/admin/order/show/:id', component: OrderDetail },
    //config
    { path: '/admin/config/index', component: ConfigIndex },
    //contact
    { path: '/admin/contact/index', component: ContactIndex },
    { path: '/admin/contact/trash', component: ContactTrash },
    { path: '/admin/contact/reply/:id', component: ContactReply },
    //user
    { path: '/admin/user/index', component: UserIndex },
    { path: '/admin/user/trash', component: UserTrash },
    { path: '/admin/user/add', component: UserAdd },
    { path: '/admin/user/edit/:id', component: UserEdit },
    { path: '/admin/staff/index', component: StaffIndex },
    { path: '/admin/staff/trash', component: StaffTrash },
    { path: '/admin/staff/add', component: StaffAdd },
    { path: '/admin/staff/edit/:id', component: StaffEdit },
];
export default RouteAdmin;
