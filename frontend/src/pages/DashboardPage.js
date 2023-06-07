import React from 'react';
import Layout from "../components/Layout";
import { useAuth } from '../context/auth';
import UserMenu from '../components/UserMenu';
const DashboardPage = () => {
  const [auth, setAuth] = useAuth();

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
  };

  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu handleLogout={handleLogout} />
          </div>
          <div className="col-md-9 col-lg-9 d-flex justify-content-center">
            <div className="card w-100 p-3 p-sm-4" style={{ borderRadius: 0 }}>
              <h4>Name: {auth?.user?.name}</h4>
              <h4>Email: {auth?.user?.email}</h4>
              <h4>Contact: {auth?.user?.contact}</h4>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardPage;
