import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import Layout from '../../components/Layout';
import AdminMenu from '../../components/AdminMenu';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Get all products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(`http://localhost:8080/api/product/get-products`);
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  };

  // Filter products based on search term
  const filteredProducts = products.filter((p) =>
    p.team.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Lifecycle method
  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="search-bar">
              <input
                type="text"
                className="form-control form-control-sm"
                style={{ width: '75%' }}
                placeholder="Search Team"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="product-list grid-container">
              {filteredProducts.length === 0 ? (
                <p>No products found.</p>
              ) : (
                filteredProducts.map((p) => (
                  <Link key={p._id} to={`/dashboard/admin/products/${p.slug}`} className="product-link">
                    <div className="product-item">
                      <img
                        src={`http://localhost:8080/api/product/product-photo/${p._id}`}
                        alt={p.name}
                        className="product-image"
                      />
                      <div>
                        <p className="product-title">{p.name}</p>
                        <p className="product-description">{p.team}</p>
                      </div>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
