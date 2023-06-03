import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import AdminMenu from '../../components/AdminMenu';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Select } from 'antd';
const { Option } = Select;

const CreateProduct = () => {
  const navigate = useNavigate()
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [team, setTeam] = useState("");
  const [category, setCategory] = useState("");
  const [kit, setKit] = useState("");
  const [description, setDescription] = useState("");
  const [owner_by, setOwner] = useState("ARAI");
  const [photo, setPhoto] = useState("");
  // get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`http://localhost:8080/api/category/get-category`);
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong in getting category');
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);
  //create product function 
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("team", team);
      productData.append("kit", kit);
      productData.append("category", category);
      productData.append("description", description);
      productData.append("owner_by", owner_by);
      productData.append("photo", photo);
  
      axios
        .post(`http://localhost:8080/api/product/create-product`, productData)
        .then((response) => {
          console.log(response);
          toast.success('Product Created Successfully');
          navigate('/dashboard/admin/products');
        })
        .catch((error) => {
          console.log(error);
          toast.error(error.response.data.error);
        });
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  
  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className='row'>
          <div className='col-md-3'>
            <AdminMenu/>
          </div>
          <div className='col-md-9'>
            <h1>Create Product</h1>
            <div className='m-1 w-75'>
              <Select
                bordered={false}
                placeholder="SELECT A CATEGORY"
                size='large'
                showSearch
                className='form-select mb-3'
                onChange={(value) => { setCategory(value) }}
                style={{ borderRadius: 0}}
              >
                {categories?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>
              <div className='mb-3'>
                    <label className='btn btn-outline-secondary col-md-12' style={{ borderRadius: 0}}>
                        {photo ? photo.name : "UPLOAD PHOTO"}
                        <input 
                            type='file' 
                            name="photo" 
                            accept='image/*'
                            onChange={(e) => setPhoto(e.target.files[0])}
                            hidden
                        >
                        </input> 
                    </label>
              </div>
              <div className='mb-3'>
                {photo && (
                    <div className='text-center'>
                        <img 
                        src={URL.createObjectURL(photo)} 
                        alt='product_photo' 
                        height={'200px'}
                        className='img img-responsive'
                        />
                    </div>
                )}
              </div>
              <div className='mb-3'>
                <input type='text'
                value={name}
                placeholder='WRITE A NAME'
                className='form-control'
                onChange={(e) => setName(e.target.value)}
                style={{ borderRadius: 0}}
                />
              </div>
              <div className='mb-3'>
                <input type='text'
                value={team}
                placeholder='WRITE A TEAM'
                className='form-control'
                onChange={(e) => setTeam(e.target.value)}
                style={{ borderRadius: 0}}
                />
              </div>
              <div className='mb-3'>
                <input type='text'
                value={kit}
                placeholder='WRITE A KIT'
                className='form-control'
                onChange={(e) => setKit(e.target.value)}
                style={{ borderRadius: 0}}
                />
              </div>
              <div className='mb-3'>
                <textarea type='text'
                value={description}
                placeholder='WRITE A DESCRIPTION'
                className='form-control'
                onChange={(e) => setDescription(e.target.value)}
                style={{ borderRadius: 0}}
                />
              </div>
              <div className='mb-3'>
                <input type='text'
                value={owner_by}
                placeholder='WRITE A UPLOADER'
                className='form-control'
                onChange={(e) => setOwner(e.target.value)}
                style={{ borderRadius: 0}}
                />
              </div>
              <div className='mb-3'>
                    <button className='btn btn-dark w-100' onClick={handleCreate} style={{ borderRadius: 0}}>CREATE PRODUCT</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default CreateProduct;
