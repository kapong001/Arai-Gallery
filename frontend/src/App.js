import { Routes, Route } from "react-router-dom";
import LandPage from "./pages/LandPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Notfoundpage from "./pages/Notfoundpage";
import ContactPage from "./pages/ContactPage";
import ServicePage from "./pages/ServicePage";
import SocialPage from "./pages/SocialPage";
import PrivateRoute from "./components/Routes/Private";
import DashboardPage from "./pages/DashboardPage";
import AdminRoute from "./components/Routes/AdminRoute";
import AdminDashboardPage from "./pages/Admin/AdminDashboard";
import CreateCatagory from "./pages/Admin/CreateCatagory";
import CreateProduct from "./pages/Admin/CreateProduct";
import Users from "./pages/Admin/Users";
import Products from "./pages/Admin/Products";
import UpdateProducts from "./pages/Admin/UpdateProducts";
import CollectionPage from "./pages/CollectionPage";
import SearchResult from "./pages/SearchResult";
import ProductDetail from "./pages/ProductDetail";
import EPLCollectionPage from "./pages/EPLCollectionPage";
import ProfileUser from "./pages/ProfileUser";
import LikeCollectionPage from "./pages/LikeCollectionPage";
import RequestProduct from "./pages/UserRequestProduct";
import RequestCollection from "./pages/Admin/RequestCollection";
import UserRequestCollection from "./pages/UserRequestCollection";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandPage />} />

        <Route path="/account/login" element={<LoginPage />} />
        <Route path="/account/register" element={<RegisterPage />} />


        <Route path="/usercollection" element={<UserRequestCollection />} />

        <Route path="/collection" element={<CollectionPage />} />
        <Route path="/category/:slug" element={<EPLCollectionPage />} />

        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<DashboardPage />} />
          <Route path="user/profile" element={<ProfileUser />} />
          <Route path="user/likes" element={<LikeCollectionPage />} />
          <Route path="user/products-request" element={<RequestProduct />} />
        </Route>

        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboardPage />} />
          <Route path="admin/create-category" element={<CreateCatagory />} />
          <Route path="admin/create-product" element={<CreateProduct />} />
          <Route path="admin/products/:slug" element={<UpdateProducts />} />
          <Route path="admin/products" element={<Products />} />
          <Route path="admin/users" element={<Users />} />
          <Route path="admin/user-request" element={<RequestCollection />} />
        </Route>

        <Route path="/product/:slug" element={<ProductDetail />} />
        <Route path="/search" element={<SearchResult />} />
      
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/services" element={<ServicePage />} />
        <Route path="/social" element={<SocialPage />} />
        <Route path="*" element={<Notfoundpage />} />
      </Routes>
    </>
  );
}
export default App;