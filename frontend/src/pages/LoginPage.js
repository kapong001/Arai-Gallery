import React,{useState} from "react";
import Layout from "../components/Layout";
import axios from 'axios';
import { useNavigate,useLocation } from "react-router-dom";
import { Link } from 'react-router-dom';
import toast from "react-hot-toast";
import { useAuth } from "../context/auth";
const LoginPage = () =>{
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [auth, setAuth] = useAuth();

    const navigate = useNavigate();
    const location = useLocation();

    //from function
    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
            const res = await axios.post(`http://localhost:8080/api/account/login`,{ 
                email, 
                password
            });
            if(res && res.data.success){
                toast.success(res.data && res.data.message);
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token,
                });
                localStorage.setItem('auth', JSON.stringify(res.data));
                navigate(location.state || "/");
            }else{
                toast.error(res.data.message);
            }
        }catch(error){
            console.log(error);
            toast.error("Something went wrong");
        }
    };
    return(
        <Layout>
            
            <form className='form-login' onSubmit={handleSubmit}>
                <h2 className='login'>LOGIN</h2>
                <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
                id = "exampleInputEmail1"
                placeholder="EMAIL"
                style={{ borderRadius: 0}}
                required
                />
                <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
                id = "exampleInputPassword1"
                placeholder="PASSWORD"
                style={{ borderRadius: 0}}
                required
                />
                <button type="submit" className="loginbtn" >SIGN IN</button>
                <Link to='/account/register' className="unregister">REGISTER AN ACCOUNT</Link>
                
            </form>
        </Layout>
    );
};

export default LoginPage;