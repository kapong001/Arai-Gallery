import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/auth';
import { FaUser } from 'react-icons/fa';
import { BsFillCollectionFill } from 'react-icons/bs';

const Header = () => {
  const [auth] = useAuth();
  const [isResponsive, setIsResponsive] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsResponsive(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const renderCommunity = () => {
    if (isResponsive) {
      return <BsFillCollectionFill />;
    } else {
      return 'COLLECTION';
    }
  };

  const renderAccount = () => {
    if (isResponsive) {
      return <FaUser />;
    } else {
      return 'ACCOUNT';
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container">
          <NavLink to="/collection" className="navbar-brand">
            {renderCommunity()}
          </NavLink>
          <NavLink to="/" className="navbar-brand mx-auto">
            <h2>ARAI</h2>
          </NavLink>
          {!auth.user ? (
            <>
              <NavLink to="/account/login" className="navbar-brand">
                {renderAccount()}
              </NavLink>
            </>
          ) : (
            <>
              <NavLink
                to={`/dashboard/${
                  auth?.user?.role === 1 ? 'admin' : 'user'
                }`}
                className="navbar-brand"
              >
                {renderAccount()}
              </NavLink>
            </>
          )}
        </div>
      </nav>
    </>
  );
};

export default Header;
