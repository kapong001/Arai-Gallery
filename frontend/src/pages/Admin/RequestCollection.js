import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import axios from "axios";
import AdminMenu from "../../components/AdminMenu";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import CardActions from '@mui/material/CardActions';

const UserCollection = () => {
    const [requestProducts, setRequestProducts] = useState([]);
    const [categoryMap, setCategoryMap] = useState({});

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

    const approveRequest = async (id) => {
        try {
            await axios.post(
                `http://localhost:8080/api/product/approve-request/${id}`
            );
            getRequestCollection();
        } catch (error) {
            console.log(error);
        }
    };

    const rejectRequest = async (id) => {
        try {
            await axios.post(
                `http://localhost:8080/api/product/reject-request/${id}`
            );
            getRequestCollection();
        } catch (error) {
            console.log(error);
        }
    };

    const getCategoryName = async (categoryId) => {
        try {
            const { data } = await axios.get(
                `http://localhost:8080/api/category/singleid-category/${categoryId}`
            );
            if (data?.category) {
                setCategoryMap(prevState => ({
                    ...prevState,
                    [categoryId]: data.category.name
                }));
            } else {
                console.log("data or category is undefined");
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getRequestCollection();
    }, []);

    useEffect(() => {
        const categoryIds = requestProducts.map(p => p.category);
        categoryIds.forEach(categoryId => {
            if (!categoryMap[categoryId]) {
                getCategoryName(categoryId);
            }
        });
    }, [requestProducts]);

    return (
        <Layout>
            <div className="container-fluid m-3 p-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <div className="d-flex flex-wrap justify-content-start">
                            {requestProducts.map((p) => (
                                <Card sx={{ maxWidth: 400 }} key={p} className="mx-2 mb-3" >
                                    <CardActionArea>
                                        <div 
                                            className="card"
                                            style={{ width: '25rem', borderRadius: 0 }}>
                                            <CardMedia
                                                image={`data:image/png;base64,${p.photo}`}
                                                component="img"
                                                className="card-img-top"
                                                style={{ height: '40rem', objectFit: 'contain', borderRadius: 0 }}
                                            />
                                            <CardContent>
                                                <div className="card-body" style={{ padding: '0rem' }}>
                                                    <Typography gutterBottom variant="h5" component="div">{p.name}</Typography>
                                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                                        {categoryMap[p.category]} / {p.team} / {p.kit}
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary">{p.description}</Typography>

                                                    <CardActions>
                                                        <button
                                                            className="btn btn-outline-success "
                                                            style={{ borderRadius: 0, width: '100%' }}
                                                            onClick={() => { approveRequest(p._id); }}
                                                        >
                                                            APPROVE
                                                        </button>
                                                        <button
                                                            className="btn btn-outline-danger "
                                                            style={{ borderRadius: 0, width: '100%' }}
                                                            onClick={() => { rejectRequest(p._id); }}
                                                        >
                                                            REJECT
                                                        </button>
                                                    </CardActions>
                                                </div>
                                            </CardContent>
                                        </div>
                                    </CardActionArea>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default UserCollection;
