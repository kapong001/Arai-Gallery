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
  const [category, setCategory] = useState([]);
  const [checked, setChecked] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false); // New state variable

  // get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/category/get-category"
      );
      if (data?.success) {
        setCategory(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  // get all products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:8080/api/product/product-list/${page}`
      );
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  // get total count
  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/product/product-count"
      );
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  // load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:8080/api/product/product-list/${page}`
      );
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // filter by category
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
    else filterProducts();
  }, [checked]);

  // filter products
  const filterProducts = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:8080/api/product/product-filters",
        {
          checked,
        }
      );
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <Layout>
      <div className="container-fluid row mt-3">
        <div className="col-md-2">
          <div className="text-center">
            <SearchInput />
          </div>
          <div className="text-center mt-3">
            <h6 onClick={toggleFilters} style={{ cursor: "pointer" }}>
              {showFilters ? "- Filter League -" : "+ Filter League +"}
            </h6>
          </div>
          {showFilters && (
            <div className="d-flex flex-column text-center">
              {category?.map((c) => (
                <div key={c._id}>
                  <Checkbox
                    onChange={(e) => handleFilter(e.target.checked, c._id)}
                    checked={checked.includes(c._id)}
                  >
                    {c.name}
                  </Checkbox>
                </div>
              ))}
            </div>
          )}
          <div className="d-flex flex-column text-center mt-3">
            <button
              className="btn btn-dark"
              onClick={() => window.location.reload()}
              style={{ borderRadius: 0, width: "100%" }}
            >
              RESET FILTER
            </button>
          </div>
        </div>
        <div className="col-md-10">
          <div className="row">
            {products?.map((p) => (
              <div className="col-md-4 mb-3" key={p._id}>
                <Link to={`/product/${p.slug}`} onClick={scrollToTop}>
                  <div className="card" style={{ borderRadius: 0 }}>
                    <img
                      src={`http://localhost:8080/api/product/product-photo/${p._id}`}
                      className="card-img-top"
                      alt={p.name}
                      style={{ objectFit: "contain", height: "40rem" }}
                    />
                    <div className="card-body" style={{ padding: "0rem" }}>
                      <p className="card-title text-center">{p.name}</p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
          <div className="m-2 p-3 text-center">
            {products && products.length < total && (
              <button
                className="btn btn-light"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
                style={{ borderRadius: 0, width: "96%" }}
              >
                {loading ? " Loading ..." : "Load more"}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CollectionPage;
