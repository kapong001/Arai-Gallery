import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

import { 
    CreateProductController, 
    deleteProductController, 
    getProductController, 
    getSingleProductController, 
    productPhotoController, 
    updateProductController
} from "../controllers/productController.js";

import formidable from 'express-formidable';


const router = express.Router()

//create routes
router.post(
    '/create-product', 
    requireSignIn, 
    isAdmin, 
    formidable(), 
    CreateProductController
);

//update routes
router.put(
    '/update-product/:pid', 
    requireSignIn, 
    isAdmin, 
    formidable(), 
    updateProductController
);

//get products
router.get('/get-products', getProductController);

//single get products
router.get('/single-product/:slug', getSingleProductController);

//get photo
router.get('/product-photo/:pid', productPhotoController);

//delete product
router.delete('/product-delete/:pid', deleteProductController);

export default router