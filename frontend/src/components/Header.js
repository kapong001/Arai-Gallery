import React from 'react';
import { NavLink,Link } from 'react-router-dom';
import { useAuth } from '../context/auth';
const Header = () => {
  const [auth] = useAuth();
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container">
          <NavLink to="/community" className="navbar-brand">
            Community
          </NavLink>
          <Link to="/" className="navbar-brand mx-auto">
            <h2>ARAI</h2>
          </Link>
          {
            !auth.user ? (<>
              <NavLink to="/account/login" className="navbar-brand">
                Login
              </NavLink>
            </>) : (<>
              <NavLink 
              to={`/dashboard/${
                auth?.user?.role === 1 ? "admin" : "user"
              }`} 
              className="navbar-brand">
                Account
              </NavLink>
              </>)
              
          }
        </div>
      </nav>
    </>
  );
};

export default Header;
