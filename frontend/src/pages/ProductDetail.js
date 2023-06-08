import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Swal from 'sweetalert2';
const scrollToTop = () => {
  window.scrollTo(0, 0);
};

const ProductDetail = () => {
  const params = useParams();
  const [product, setProduct] = useState();
  const [relateProducts, setRelateProducts] = useState([]);

  // initial details
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  // getProduct
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/product/single-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProducts(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  // get similar products
  const getSimilarProducts = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/product/related-product/${pid}/${cid}`
      );
      setRelateProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  // LIKE
  const likeProduct = async () => {
    try {
      await axios.post(`http://localhost:8080/api/product/like/${product._id}`);
      Swal.fire({
        icon: 'success',
        title: 'LIKED'
      });
    } catch (error) {
      console.log(error);
      toast.error('Failed to add product to collection.');
    }
  };

  return (
    <Layout>
      <div className="row container mt-3">
        <div className="col-md-9 text-center">
          {product && (
            <img
              src={`http://localhost:8080/api/product/product-photo/${product._id}`}
              alt={product.name}
              className="card-img-top luxury-image mx-auto d-block"
              style={{ width: '70%', height: '50rem', objectFit: 'contain' }}
            />
          )}
        </div>
        <div className="col-md-3 d-flex flex-column justify-content-center">
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              {product && (
                <>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {product.category?.name}
                  </Typography>
                  <Typography variant="h5" component="div">
                    {product.name}
                  </Typography>
                  <Typography sx={{ mb: 0 }} color="text.secondary">
                    {product.team}    /   {product.kit}
                  </Typography>
                  <Typography sx={{ mb: 0 }} color="text.secondary">
                    BY: {product.owner_by}
                  </Typography>
                  <Typography variant="body2">{product.description}</Typography>
                </>
              )}
              <CardActions>
                <button
                  className="btn btn-outline-danger"
                  style={{ borderRadius: 0, width: '100%' }}
                  onClick={likeProduct}
                >
                  LIKE
                </button>
              </CardActions>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="row luxury-section">
        <h2 className="m-2">Similar Products</h2>
        <div className="d-flex flex-wrap justify-content-start">
          {relateProducts?.map((p) => (
            <Link onClick={scrollToTop} to={`/product/${p.slug}`} key={p._id}>
              <div
                className="card m-2"
                style={{ width: '25rem', borderRadius: 0 }}
                key={p._id}
              >
                <img
                  src={`http://localhost:8080/api/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                  style={{ height: '30rem', objectFit: 'contain', borderRadius: 0 }}
                />
                <div className="card-body" style={{ padding: '0rem' }}>
                  <p className="card-title text-center">{p.name}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;
