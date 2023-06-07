import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import AdminMenu from "../../components/AdminMenu";
import Swal from "sweetalert2";
import axios from "axios";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
const { Option } = Select;

const UpdateProducts = () => {
    const navigate = useNavigate()
    const params = useParams();
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [team, setTeam] = useState("");
    const [category, setCategory] = useState("");
    const [kit, setKit] = useState("");
    const [description, setDescription] = useState("");
    const [owner_by, setOwner] = useState("ARAI");
    const [photo, setPhoto] = useState("");
    const [id, setId] = useState("");

    //get single product
    const getSingleProduct = async () => {
        try {
        const { data } = await axios.get(
            `http://localhost:8080/api/product/single-product/${params.slug}`
        );
        setName(data.product.name);
        setId(data.product._id);
        setTeam(data.product.team);
        setDescription(data.product.description);
        setKit(data.product.kit);
        setOwner(data.product.owner_by);
        setCategory(data.product.category._id);
        } catch (error) {
        console.log(error);
        }
    };
    useEffect(() => {
        getSingleProduct();
        //eslint-disable-next-line
    }, []);


    // get all category
    const getAllCategory = async () => {
        try {
        const { data } = await axios.get(`http://localhost:8080/api/category/get-category`);
        if (data?.success) {
            setCategories(data?.category);
        }
        } catch (error) {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Something went wrong in getting category '
        })
        
        }
    };

    useEffect(() => {
        getAllCategory();
    }, []);


    //create product function
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
          const productData = new FormData();
          productData.append("name", name);
          productData.append("team", team);
          productData.append("kit", kit);
          productData.append("description", description);
          productData.append("owner_by", owner_by);
          photo && productData.append("photo", photo);
          productData.append("category", category);
      
          await axios.put(
            `http://localhost:8080/api/product/update-product/${id}`,
            productData
          );
          Swal.fire({
            icon: 'success',
            title: 'Product Updated '
          })
          navigate("/dashboard/admin/products");
        } catch (error) {
          console.log(error);
          Swal.fire({
            icon: 'success',
            title: 'Something Went Wrong '
          })
        }
    };
    //delete a product
    const handleDelete = async () => {
        try {
        let answer = window.prompt("Are You Sure want to delete this product ? ");
        if (!answer) return;
        const { data } = await axios.delete(
            `http://localhost:8080/api/product/product-delete/${id}`
        );
        Swal.fire({
          icon: 'success',
          title: 'Product Deleted'
        })
        navigate("/dashboard/admin/products");
        } catch (error) {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Something Went Wrong'
        })
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
            {/* <h3>Update Product</h3> */}
            <div className='m-1 w-75'>
              <Select
                bordered={false}
                placeholder="SELECT A CATEGORY"
                size='large'
                showSearch
                className='form-select mb-3'
                onChange={(value) => { 
                    setCategory(value); 
                }}
                value={category}
              >
                {categories?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>
              <div className='mb-3'>
                    <label className='btn btn-outline-secondary col-md-12'>
                        {photo ? photo.name : "UPDATE PHOTO"}
                        <input 
                            type='file' 
                            name="photo" 
                            accept='image/*'
                            onChange={(e) => setPhoto(e.target.files[0])}
                            hidden
                        />
                    </label>
              </div>
              <div className='mb-3'>
                {photo ? (
                    <div className="text-center">
                        <img
                        src={URL.createObjectURL(photo)}
                        alt="product_photo"
                        height={"200px"}
                        className="img img-responsive"
                        />
                    </div>
                    ) : (
                    <div className="text-center">
                        <img
                        src={`http://localhost:8080/api/product/product-photo/${id}`}
                        alt="product_photo"
                        height={"200px"}
                        className="img img-responsive"
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
                />
              </div>
              <div className='mb-3'>
                <input type='text'
                value={team}
                placeholder='WRITE A TEAM'
                className='form-control'
                onChange={(e) => setTeam(e.target.value)}
                />
              </div>
              <div className='mb-3'>
                <input type='text'
                value={kit}
                placeholder='WRITE A KIT'
                className='form-control'
                onChange={(e) => setKit(e.target.value)}
                />
              </div>
              <div className='mb-3'>
                <textarea type='text'
                value={description}
                placeholder='WRITE A DESCRIPTION'
                className='form-control'
                onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className='mb-3'>
                <input type='text'
                value={owner_by}
                placeholder='WRITE A UPLOADER'
                className='form-control'
                onChange={(e) => setOwner(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <button className="btn btn-dark w-100" onClick={handleUpdate}>
                  UPDATE PRODUCT
                </button>
              </div>
              <div className="mb-3">
                <button className="btn btn-light w-100" onClick={handleDelete}>
                  DELETE PRODUCT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
    )
}

export default UpdateProducts
