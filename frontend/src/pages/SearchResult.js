import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { useSearch } from '../context/search';
import SearchInput from '../components/Form/SearchInput';
const scrollToTop = () => {
    window.scrollTo(0, 0);
  };
const SearchResult = () => {
    const [values] = useSearch();

    return (
        <Layout>
            <div className='container'>
                <div className='text-center'>
                    <div className="text-center my-3 search-input-container">
                        <SearchInput />
                    </div>
                    <h6>
                        {values?.results.length < 1
                            ? 'No Products Found'
                            : `Found ${values?.results.length}`}
                    </h6>
                    <div className='d-flex flex-wrap justify-content-center'>
                        {values?.results.map((p) => (
                            <Link onClick={scrollToTop} to={`/product/${p.slug}`} key={p._id} className="card m-2" style={{ width: '25rem', borderRadius: 0 }}>
                                <img
                                    src={`http://localhost:8080/api/product/product-photo/${p._id}`}
                                    className='card-img-top'
                                    alt={p.name}
                                    style={{ height: '40rem', objectFit: 'cover' }}
                                />
                                <div className='card-body' style={{ padding: '0rem' }}>
                                    <p className='card-title text-center'>{p.name}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default SearchResult;
