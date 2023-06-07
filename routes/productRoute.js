import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

import {
  CreateProductController,
  deleteLikeController,
  deleteProductController,
  getLikeController,
  getProductController,
  getSingleProductByIDController,
  getSingleProductController,
  productCategoryController,
  productCountController,
  productFiltersController,
  productListController,
  productPhotoController,
  realtedProductController,
  searchProductController,
  updateProductController,
  userCollectionController,
} from "../controllers/productController.js";

import formidable from "express-formidable";

const router = express.Router();

//create routes
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  CreateProductController
);

//update routes
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

//get products
router.get("/get-products", getProductController);

//single get products
router.get("/single-product/:slug", getSingleProductController);

//get photo
router.get("/product-photo/:pid", productPhotoController);

//delete product
router.delete("/product-delete/:pid", deleteProductController);

//filter product
router.post("/product-filters", productFiltersController);

//product count
router.get("/product-count", productCountController);

//prodcut per page
router.get("/product-list/:page", productListController);

//search
router.get("/search/:Keyword", searchProductController);

//similar product
router.get("/related-product/:pid/:cid", realtedProductController);

//category wise product
router.get("/product-category/:slug", productCategoryController);

router.post("/like/:pid", requireSignIn, userCollectionController);

router.get("/get-likes", requireSignIn, getLikeController);

router.delete("/delete-like/:oid", requireSignIn, deleteLikeController);

//get product by ID 
router.get('/single-product-id/:pid', getSingleProductByIDController)

export default router;