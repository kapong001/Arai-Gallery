import React,{useState} from "react";
import Layout from "../components/Layout";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'
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
                Swal.fire({
                    icon: 'success',
                    title: 'SUCCESS',
                    text: `${res.data.message}`
                })
                navigate("/account/login");
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'FAIL',
                    text: `${res.data.message}`
                })
            }
        }catch(error){
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'FAIL',
                text: "Something went wrong"
            })
        }
    };
    return(
        <Layout>
            <form className="regis-form" onSubmit={handleSubmit}>
                <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-control"
                id = "exampleInputeEmail1"
                placeholder="NAME"
                style={{ borderRadius: 0}}
                required
                />
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
                type="text"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                className="form-control"
                id = "exampleInputContact1"
                placeholder="CONTACT"
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