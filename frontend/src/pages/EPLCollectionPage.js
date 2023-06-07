import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const scrollToTop = () => {
    window.scrollTo(0, 0);
};

const EPLCollectionPage = () => {
    const params = useParams();
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState([]);

    useEffect(() => {
        if (params?.slug) {
            getProductsByCategory();
        }
    }, [params?.slug]);

    const getProductsByCategory = async () => {
        try {
            const { data } = await axios.get(
                `http://localhost:8080/api/product/product-category/${params.slug}`
            );
            setProducts(data?.products);
            setCategory(data?.category);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Layout>
            <div className='container mt-3'>
                <div className='text-center'>
                    {/* <h1>{category?.name}</h1>
                    <h1>{products?.length}</h1> */}
                    <div className='d-flex flex-wrap justify-content-center'>
                        {products.map((p) => (
                            <Link
                                onClick={scrollToTop}
                                to={`/product/${p.slug}`}
                                key={p._id}
                                className='card m-2'
                                style={{ width: '25rem', borderRadius: 0 }}
                            >
                                <img
                                    src={`http://localhost:8080/api/product/product-photo/${p._id}`}
                                    className='card-img-top'
                                    alt={p.name}
                                    style={{ height: '40rem', objectFit: 'contain', borderRadius: 0 }}
                                />
                                <div
                                    className='card-body'
                                    style={{ padding: '0rem' }}
                                >
                                    <p className='card-title text-center'>
                                        {p.name}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default EPLCollectionPage;
