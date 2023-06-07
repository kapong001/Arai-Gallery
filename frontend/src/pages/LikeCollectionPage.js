import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import axios from 'axios';
import UserMenu from '../components/UserMenu';
import { toast } from 'react-hot-toast';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import CardActions from '@mui/material/CardActions';
import Swal from 'sweetalert2';
const LikeCollectionPage = () => {
  const [like, setLike] = useState([]);
  const [productNames, setProductNames] = useState([]);
  const [productDescriptions, setProductDescriptions] = useState([]);
  const [productKit, setProductKit] = useState([]);
  const [productTeam, setProductTeam] = useState([]);
  const [productCategory, setProductCategory] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/product/get-likes');
      setLike(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  
  const fetchProductData = async () => {
    const data = await Promise.all(
      like.map(async (productId) => {
        try {
          const response = await axios.get(`http://localhost:8080/api/product/single-product-id/${productId}`);
          return response.data.product;
        } catch (error) {
          console.log(error);
          return {};
        }
      })
    );
  
    const names = data.map((product) => product.name);
    const descriptions = data.map((product) => product.description);
    const kit = data.map((product) => product.kit);
    const team = data.map((product) => product.team);
    const category = data.map((product) => product.category?.name || '');
  
    setProductCategory(category);
    setProductKit(kit);
    setProductTeam(team);
    setProductNames(names);
    setProductDescriptions(descriptions);
  };
  

  // Unlike function
  const unLike = async (selectOid) => {
    try {
      await axios.delete(`http://localhost:8080/api/product/delete-like/${selectOid}`);
      Swal.fire({
        icon: 'success',
        title:'Unlike T_T'
      })
      // Update the like state to reflect the removed item
      setLike(like.filter(p => p !== selectOid));
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchProductData();
  }, [like]);

  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className='row'>
          <div className='col-md-3'>
            <UserMenu />
          </div>
          <div className="col-md-9 ">
            <div className="d-flex flex-wrap justify-content-start">
              {like.map((p, index) => (
                <Card sx={{ maxWidth: 400 }} key={p} className="mx-2 mb-3">
                  <CardActionArea>
                    <div
                      className="card"
                      style={{ width: '25rem', borderRadius: 0 }}
                    >
                      <CardMedia
                        image={`http://localhost:8080/api/product/product-photo/${p}`}
                        component="img"
                        className="card-img-top"
                        style={{ height: '40rem', objectFit: 'contain', borderRadius: 0 }}
                      />
                      <CardContent>
                        <div className="card-body" style={{ padding: '0rem' }}>
                          <Typography gutterBottom variant="h5" component="div">{productNames[index]}</Typography>
                          <Typography sx={{ mb: 1.5 }} color="text.secondary"> {productCategory[index]}   /  {productTeam[index]}   /   {productKit[index]} </Typography>
                          <Typography variant="body2" color="text.secondary">{productDescriptions[index]}</Typography>
                          
                          <CardActions>
                            <button
                              className='btn btn-outline-danger'
                              style={{ borderRadius: 0, width: '100%' }}
                              onClick={() => unLike(p)}
                            >
                              UNLIKE
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
  )};
export default LikeCollectionPage;