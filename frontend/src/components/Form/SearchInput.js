import React from 'react';
import { useSearch } from '../../context/search';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SearchInput = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/product/search/${values.Keyword}`
        );
      setValues({ ...values, results: data });
      navigate('/search');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form className='d-flex' role='search' onSubmit={handleSubmit} style={{ height: '2.5rem' }}>
        <input
          className='form-control me-2'
          type='search'
          placeholder='SEARCH KIT'
          aria-label='Search'
          value={values.Keyword}
          style={{ borderRadius: 0, height: '100%', border: '1px solid #ced4da' }}
          onChange={(e) => setValues({ ...values, Keyword: e.target.value })}
        />
        <button
          className='btn btn-outline-dark'
          type='submit'
          style={{ borderRadius: 0, height: '100%' }}
        >
          SEARCH
        </button>
      </form>
    </div>
  );
};

export default SearchInput;
