import React,{useState} from "react";
import Layout from "../components/Layout";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import toast from "react-hot-toast";
const RegisterPage = () =>{
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [contact,setContact] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();
    //from function
    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
            const res = await axios.post(`http://localhost:8080/api/account/register`,{
                name, 
                email, 
                contact, 
                password
            });
            if(res.data.success){
                toast.success(res.data.message);
                navigate("/account/login");
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
            <form onSubmit={handleSubmit}>
                <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-control"
                id = "exampleInputeEmail1"
                placeholder="NAME"
                required
                />
                <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
                id = "exampleInputEmail1"
                placeholder="EMAIL"
                required
                />
                <input
                type="text"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                className="form-control"
                id = "exampleInputContact1"
                placeholder="CONTACT"
                required
                />
                <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
                id = "exampleInputPassword1"
                placeholder="PASSWORD"
                required
                />
                {/* <input
                type="password"
                className="form-control"
                id = "exampleInputPassword1"
                placeholder="CONFIRM PASSWORD"
                /> */}
                <button type="submit" className="regisbtn">CREATE</button>
                <Link to='/account/login' className="registered">ALREADY REGISTERED? LOGIN</Link>
                
            </form>
        </Layout>
    );
};

export default RegisterPage;