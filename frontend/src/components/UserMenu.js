import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useAuth } from '../context/auth';
import { toast } from 'react-hot-toast';
const UserMenu = () => {
    const [auth, setAuth] = useAuth();

    const handleLogout = () => {
        setAuth({
            ...auth,
            user: null,
            token: "",
        });
        localStorage.removeItem("auth");
        toast.success("Logout แล้วจ่ะ");
    };
    return (
        <>
            <div className='text-center' style={{ borderRadius: 0 }}>
                <div className='list-group' style={{ borderRadius: 0 }}>
                    <Link to="/dashboard/user" className="list-group-item list-group-item-light" >
                        <h5>User Dashboard</h5>
                    </Link>

                    <NavLink to="/dashboard/user/profile" className="list-group-item list-group-item-light">
                        Profile
                    </NavLink>
                    <NavLink onClick={handleLogout} to="/" className="list-group-item list-group-item-light">
                        Logout
                    </NavLink>
                </div>
            </div>
        </>
    );
};


export default UserMenu;
