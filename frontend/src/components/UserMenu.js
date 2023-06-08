import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../context/auth";
import Swal from 'sweetalert2'
const UserMenu = () => {
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
            title: "LOGOUT BYEBYE",
        })
    };
    return (
        <>
            <div className="text-center" style={{ borderRadius: 0 }}>
                <div className="list-group" style={{ borderRadius: 0 }}>
                    <Link
                        to="/dashboard/user"
                        className="list-group-item list-group-item-light"
                    >
                        <h5>USER DASHBOARD</h5>
                    </Link>

                    <NavLink
                        to="/dashboard/user/profile"
                        className="list-group-item list-group-item-light"
                    >
                        UPDATE PROFILE
                    </NavLink>
                    <NavLink
                        to="/dashboard/user/likes"
                        className="list-group-item list-group-item-light"
                    >
                        LIKE
                    </NavLink>
                    
                    <NavLink
                        to="/dashboard/user/products-request"
                        className="list-group-item list-group-item-light"
                    >
                        REQUEST
                    </NavLink>
                    <NavLink
                        to="/usercollection"
                        className="list-group-item list-group-item-light"
                    >
                        REQUEST STATUS
                    </NavLink>
                    <NavLink
                        onClick={handleLogout}
                        to="/"
                        className="list-group-item list-group-item-light"
                    >
                        LOGOUT
                    </NavLink>
                </div>
            </div>
        </>
    );
};

export default UserMenu;