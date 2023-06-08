import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import UserMenu from "../components/UserMenu";

const UserRequestCollection = () => {
    const [requestProducts, setRequestProducts] = useState([]);

    const getRequestCollection = async () => {
        try {
            const { data } = await axios.get(
                `http://localhost:8080/api/product/product-request-list`
            );

            if (data?.productRequests) {
                setRequestProducts(data.productRequests);
            } else {
                console.log("data or productRequest is undefined");
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getRequestCollection();
    }, []);

    return (
        <Layout>
            <div className="container-fluid m-3 p-3">
                <div className="row">
                    <div className="col-md-3">
                        <UserMenu />
                    </div>

                    <div className="col-md-9">
                        <div className="d-flex flex-wrap justify-content-start">
                            {requestProducts.map((p) => (
                                <div className="card mx-2 mb-3" key={p._id} style={{ width: '25rem', borderRadius: 0 }}>
                                    <img
                                        src={`data:image/png;base64,${p.photo}`}
                                        className="card-img-top"
                                        alt={p.name}
                                        style={{ objectFit: "contain", height: "40rem", borderRadius: 0 }}
                                    />
                                    <div className="card-body" style={{ padding: "0rem" }}>
                                        <p className="card-title text-center" style={{color:'green'}}>
                                            PENDING
                                        </p>
                                        <p className="card-title text-center" >
                                            {p.name}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default UserRequestCollection;