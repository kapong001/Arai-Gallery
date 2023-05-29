import React from 'react'
import Layout from "../components/Layout";
import { useAuth } from '../context/auth';
import { toast } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

const DashboardPage = () => {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setAuth({
    ...auth,
    user: null,
    token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout แล้วจ่ะ");
      navigate("/"); // Navigate to the home page
    };
  return (
    <Layout>
      <h1>DashboardPage</h1>
      <button onClick={handleLogout} className="logout-account">
        Logout
      </button>
    </Layout>
  )
}

export default DashboardPage
