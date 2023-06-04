import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { Checkbox } from "antd";
import SearchInput from "../components/Form/SearchInput";
import { Link } from "react-router-dom";
const scrollToTop = () => {
    window.scrollTo(0, 0);
};
const CollectionPage = () => {
    const [products, setProducts] = useState([]);
    const [category, setcategory] = useState([]);
    const [checked, setChecked] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    // get all category
    const getAllcategory = async () => {
        try {
            const { data } = await axios.get(`http://localhost:8080/api/category/get-category`);
            if (data?.success) {
                setcategory(data?.category);
            }
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getAllcategory();
        getTotal();
    }, []);
    // get all products
    const getAllProducts = async () => {
        try {
            setLoading(true)
            const { data } = await axios.get(`http://localhost:8080/api/product/product-list/${page}`);
            setLoading(false)
            setProducts(data.products);
        } catch (error) {
            setLoading(false)
            console.log(error);
        }
    };
    //get total count 
    const getTotal = async () => {
        try {
            const { data } = await axios.get(`http://localhost:8080/api/product/product-count`)
            setTotal(data?.total)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (page === 1) return;
        loadMore();
    }, [page]);
    //loadmore
    const loadMore = async () => {
        try {
            setLoading(true)
            const { data } = await axios.get(`http://localhost:8080/api/product/product-list/${page}`)
            setLoading(false)
            setProducts([...products, ...data?.products]);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    //filter bt category
    const handleFilter = (value, id) => {
        let all = [...checked];
        if (value) {
            all.push(id);
        } else {
            all = all.filter((c) => c !== id);
        }
        setChecked(all);
    };

    useEffect(() => {
        if (!checked.length) getAllProducts();
    }, [checked.length]);

    useEffect(() => {
        if (checked.length) filterProducts();
    }, [checked]);

    // filter products
    const filterProducts = async () => {
        try {
            const { data } = await axios.post("http://localhost:8080/api/product/product-filters", {
                checked,
            });
            setProducts(data?.products);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Layout>
            <div className="container-fluid row mt-3">
                <div className="col-md-2">
                    <div className="text-center">
                        <SearchInput />
                    </div>
                    <div className="text-center mt-3">
                        <h6>Filter League</h6>
                    </div>
                    <div className="d-flex flex-column text-center">
                        {category?.map((c) => (
                            <div key={c._id} >
                                <Checkbox onChange={(e) => handleFilter(e.target.checked, c._id)}>
                                    {c.name}
                                </Checkbox>
                            </div>
                        ))}
                    </div>
                    <div className="d-flex flex-column text-center mt-3">
                        <button
                            className="btn btn-dark"
                            onClick={() => window.location.reload()}
                            style={{ borderRadius: 0, width: '100%' }}
                        >
                            RESET FILTER
                        </button>
                    </div>
                </div>
                <div className="col-md-10">
                    <div className="d-flex flex-wrap">
                        {products?.map((p) => (
                            <Link to={`/product/${p.slug}`} key={p._id} onClick={scrollToTop}>
                                <div
                                    className="card m-2"
                                    style={{ width: "30rem", borderRadius: 0 }}
                                    key={p._id}
                                >
                                    <img
                                        src={`http://localhost:8080/api/product/product-photo/${p._id}`}
                                        className="card-img-top"
                                        alt={p.name}
                                        style={{ height: "40rem", objectFit: "cover" }}
                                    />
                                    <div className="card-body" style={{ padding: "0rem" }}>
                                        <p className="card-title text-center">{p.name}</p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                    <div className="m-2 p-3">
                        {products && products.length < total && (
                            <button
                                className="btn btn-light"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setPage(page + 1);
                                }}
                                style={{ borderRadius: 0, width: '96%'}}
                            >
                                {loading ? " Loading ..." : "Loadmore"}
                            </button>
                        )}
                    </div>

                </div>
            </div>
        </Layout>
    );
};

export default CollectionPage;