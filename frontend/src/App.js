import {Routes, Route} from "react-router-dom"
import LandPage from "./pages/LandPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CommuPage from "./pages/CommuPage";
import Notfoundpage from "./pages/Notfoundpage";
import ContactPage from "./pages/ContactPage";
import ServicePage from "./pages/ServicePage";
import SocialPage from "./pages/SocialPage";
import PrivateRoute from "./components/Routes/Private";
import DashboardPage from "./pages/DashboardPage";
import AdminRoute from "./components/Routes/AdminRoute"
import AdminDashboardPage from "./pages/Admin/AdminDashboard";
import CreateCatagory from "./pages/Admin/CreateCatagory";
import CreateProduct from "./pages/Admin/CreateProduct";
import Users from "./pages/Admin/Users";
import Products from "./pages/Admin/Products";
import UpdateProducts from "./pages/Admin/UpdateProducts";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandPage/>}/>
        <Route path="/account/login" element={<LoginPage/>}/>
        <Route path="/account/register" element={<RegisterPage/>}/>
        
        <Route path="/dashboard" element={<PrivateRoute/>}> 
          <Route path="user" element={<DashboardPage/>}/>
        </Route> 

        
        <Route path="/dashboard" element={<AdminRoute/>}> 
          <Route path="admin" element={<AdminDashboardPage/>}/>
          <Route path="admin/create-category" element={<CreateCatagory/>}/>
          <Route path="admin/create-product" element={<CreateProduct/>}/>
          <Route path="admin/products/:slug" element={<UpdateProducts/>}/>
          <Route path="admin/products" element={<Products/>}/>
          <Route path="admin/users" element={<Users/>}/>
        </Route>

        <Route path="/community" element={<CommuPage/>}/>    
        <Route path="/contact" element={<ContactPage/>}/> 
        <Route path="/services" element={<ServicePage/>}/> 
        <Route path="/social" element={<SocialPage/>}/> 
        <Route path="/community" element={<CommuPage/>}/> 
        <Route path="*" element={<Notfoundpage/>}/>
      </Routes>
    </>
  );
}

export default App;
