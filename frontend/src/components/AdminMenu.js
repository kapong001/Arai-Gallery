import React from 'react';
import { NavLink,Link } from 'react-router-dom';
import { useAuth } from '../context/auth'; 
import Swal from 'sweetalert2'

const AdminMenu = () => {
  const [auth, setAuth] = useAuth();

  const handleLogout = () => {
      setAuth({
      ...auth,
      user: null,
      token: "",
      });
      localStorage.removeItem("auth");
      Swal.fire({
        icon: 'success',
        title: "LOGOUT BYEBYE I HUA POKE",
    })
  };

  return (
    <>
      <div className='text-center' style={{ borderRadius: 0}}>
        <div className='list-group' style={{ borderRadius: 0}}>
          <Link to="/dashboard/admin" className="list-group-item list-group-item-light" >
            <h5>Admin Dashboard</h5>
          </Link>
          <NavLink to="/dashboard/admin/create-category" className="list-group-item list-group-item-light">
            Create Category
          </NavLink>
          <NavLink to="/dashboard/admin/create-product" className="list-group-item list-group-item-light">
            Create Product
          </NavLink>
          <NavLink to="/dashboard/admin/products" className="list-group-item list-group-item-light">
            Products
          </NavLink>
          {/* <NavLink to="/dashboard/admin/users" className="list-group-item list-group-item-light">
            Users
          </NavLink> */}
          <NavLink onClick={handleLogout} to="/"className="list-group-item list-group-item-light">
            Logout
          </NavLink>
        </div>
      </div> 
    </>
  );
}; 


export default AdminMenu;
