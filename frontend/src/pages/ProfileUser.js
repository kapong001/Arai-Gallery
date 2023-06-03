import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import UserMenu from '../components/UserMenu'
import { useAuth } from '../context/auth'
import { toast } from 'react-hot-toast'
import axios from 'axios'
const ProfileUser = () => {
    //context
    const [auth, setAuth] = useAuth();
    //state
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [contact, setContact] = useState("");
    const [password, setPassword] = useState("");

    //get user data 
    useEffect(() =>{
        const {email, name, contact, } = auth.user
        setName(name)
        setEmail(email)
        setContact(contact)
    },[auth?.user])

    //from function
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const {data} = await axios.put(`http://localhost:8080/api/account/profile`, {
                name,
                email,
                contact,
                password
            });
            if(data?.error){
                toast.error(data?.error)
            }else{
                setAuth({...auth, user: data?.updatedUser});
                let ls = localStorage.getItem("auth");
                ls = JSON.parse(ls);
                ls.user = data.updatedUser;
                localStorage.setItem("auth", JSON.stringify(ls));
                toast.success("Profile Updated Succesfully")
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };
    ;
    return (
        <Layout>
            <div className="container-fluid m-3 p-3">
                <div className='row'>
                    <div className='col-md-3'>
                        <UserMenu />
                    </div>
                    <div className='col-md-9 '>
                        <form className="update-form " onSubmit={handleSubmit}>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="form-control"
                                id="exampleInputeEmail1"
                                placeholder="NAME"
                                style={{ borderRadius: 0}}
                                autoFocus
                            />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="form-control"
                                id="exampleInputEmail1"
                                placeholder="EMAIL"
                                style={{ borderRadius: 0}}
                                disabled
                            />
                            <input
                                type="text"
                                value={contact}
                                onChange={(e) => setContact(e.target.value)}
                                className="form-control"
                                id="exampleInputContact1"
                                placeholder="CONTACT"
                                style={{ borderRadius: 0}}
                            />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="form-control"
                                id="exampleInputPassword1"
                                placeholder="UPDATE PASSWORD"
                                style={{ borderRadius: 0}}
                            />
                            <button type="submit" className="regisbtn">UPDATE</button>

                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default ProfileUser
