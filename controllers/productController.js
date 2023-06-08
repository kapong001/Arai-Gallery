import slugify from "slugify";
import productModel from "../models/productModel.js";
import categoryModel from "../models/categoryModel.js";
import fs from "fs";
import orderModels from "../models/orderModels.js";
import productRequestModel from "../models/productRequestModel.js";
import { response } from "express";
//create product
export const CreateProductController = async (req, res) => {
    try {
        const { name, slug, team, kit, description, category, owner_by } =
            req.fields;
        const { photo } = req.files;
        //alidation
        switch (true) {
            case !name:
                return res.status(500).send({ error: "Name is Required" });
            case !team:
                return res.status(500).send({ error: "Team is Required" });
            case !kit:
                return res.status(500).send({ error: "Kit is Required" });
            case !description:
                return res.status(500).send({ error: "Description is Required" });
            case !category:
                return res.status(500).send({ error: "Category is Required" });
            // case !owner_by:
            //     return res.status(500).send({error:'Owner_by is Required'})
            case photo && photo.size > 1000000:
                return res
                    .status(500)
                    .send({ error: "Photo is Required and should be less than 1mb" });
        }

        const products = new productModel({ ...req.fields, slug: slugify(name) });
        if (photo) {
            products.photo.data = fs.readFileSync(photo.path);
            products.photo.contentType = photo.type;
        }
        await products.save();
        res.status(201).send({
            success: true,
            message: "Product Created",
            products,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in creating product",
        });
    }
};

//get all products
export const getProductController = async (req, res) => {
    try {
        const products = await productModel
            .find({})
            .populate("category")
            .select("-photo")
            .limit(12)
            .sort({ createdAt: -1 });
        res.status(200).send({
            success: true,
            countTotal: products.length,
            message: "Allproducts",
            products,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in getting products",
            error: error.message,
        });
    }
};

//get single products by slug
export const getSingleProductController = async (req, res) => {
    try {
        const product = await productModel
            .findOne({ slug: req.params.slug })
            .select("-photo")
            .populate("category");
        res.status(200).send({
            success: true,
            message: "Single Product Fetched",
            product,
        });
    } catch (error) {
        console.log(500).send({
            success: false,
            message: "Error while getting single product",
            error,
        });
    }
};

//get single products by id
export const getSingleProductByIDController = async (req, res) => {
    try {
        const product = await productModel
            .findOne({ _id: req.params.pid }) // Use an object with _id field
            .select("-photo")
            .populate("category");
        res.status(200).send({
            success: true,
            message: "Single Product By Id Fetched",
            product,
        });
    } catch (error) {
        console.log(error); // Log the error to see its details
        res.status(500).send({
            success: false,
            message: "Error while getting single product",
            error,
        });
    }
};



//get photo
export const productPhotoController = async (req, res) => {

    try {
        const product = await productModel.findById(req.params.pid).select("photo");
        if (product.photo.data) {
            res.set("Content-type", product.photo.contentType);
            return res.status(200).send(product.photo.data);
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error while getting photo",
            error,
        });
    }
};

//delete
export const deleteProductController = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.params.pid).select("-photo");
        res.status(200).send({
            success: true,
            message: "Product Deleted",
        });
    } catch (error) {
        console.log(500).send({
            success: false,
            message: "Error while deleting product",
            error,
        });
    }
};

//update
export const updateProductController = async (req, res) => {
    try {
        const { name, slug, team, kit, description, category, owner_by } =
            req.fields;
        const { photo } = req.files;
        //alidation
        switch (true) {
            case !name:
                return res.status(500).send({ error: "Name is Required" });
            case !team:
                return res.status(500).send({ error: "Team is Required" });
            case !kit:
                return res.status(500).send({ error: "Kit is Required" });
            case !description:
                return res.status(500).send({ error: "Description is Required" });
            case !category:
                return res.status(500).send({ error: "Category is Required" });
            // case !owner_by:
            //     return res.status(500).send({error:'Owner_by is Required'})
            case photo && photo.size > 10000000:
                return res
                    .status(500)
                    .send({ error: "Photo is Required and should be less than 1mb" });
        }

        const products = await productModel.findByIdAndUpdate(
            req.params.pid,
            { ...req.fields, slug: slugify(name) },
            { new: true }
        );
        if (photo) {
            products.photo.data = fs.readFileSync(photo.path);
            products.photo.contentType = photo.type;
        }
        await products.save();
        res.status(201).send({
            success: true,
            message: "Product Updated",
            products,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in Updating product",
        });
    }
};

//filters
export const productFiltersController = async (req, res) => {
    try {
        const { checked } = req.body;
        let args = {};
        if (checked.length > 0) args.category = checked;
        const products = await productModel.find(args);
        res.status(200).send({
            success: true,
            products,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error Filtering",
            error,
        });
    }
};

//product count
export const productCountController = async (req, res) => {
    try {
        const total = await productModel.find({}).estimatedDocumentCount();
        res.status(200).send({
            success: true,
            total,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            message: "Error in product count",
            error,
            success: false,
        });
    }
};

// product list base on page
export const productListController = async (req, res) => {
    try {
        const perPage = 6;
        const page = req.params.page ? req.params.page : 1;
        const products = await productModel
            .find({})
            .select("-photo")
            .skip((page - 1) * perPage)
            .limit(perPage)
            .sort({ createdAt: -1 });
        res.status(200).send({
            success: true,
            products,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "error in per page ctrl",
            error,
        });
    }
};

//search product
export const searchProductController = async (req, res) => {
    try {
        const { Keyword } = req.params;
        const results = await productModel
            .find({
                $or: [
                    { name: { $regex: Keyword, $options: "i" } },
                    { description: { $regex: Keyword, $options: "i" } },
                ],
            })
            .select("-photo");
        res.json(results);
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error search in API",
        });
    }
};

//similar product
export const realtedProductController = async (req, res) => {
    try {
        const { pid, cid } = req.params;
        const products = await productModel
            .find({
                category: cid,
                _id: { $ne: pid },
            })
            .select("-photo")
            .limit(3)
            .populate("category");
        res.status(200).send({
            success: true,
            products,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "error while geting related product",
            error,
        });
    }
};

// GET PRODUCT CATEGORY 'EPL'
export const productCategoryController = async (req, res) => {
    try {
        const category = await categoryModel.findOne({ slug: req.params.slug });
        const products = await productModel.find({ category }).populate("category");
        res.status(200).send({
            success: true,
            category,
            products,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            error,
            message: "Error While Getting products",
        });
    }
};

//add collection
export const userCollectionController = async (req, res) => {
    try {
        const { pid } = req.params;
        const product = await productModel.findById(pid);
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }
        const existingOrder = await orderModels.findOne({
            collector: req.user._id,
        });
        if (existingOrder) {
            existingOrder.products.push(product._id);
            await existingOrder.save();
            return res.json({ success: true, order: existingOrder });
        }
        const order = new orderModels({
            products: [product._id],
            collector: req.user._id,
        });
        await order.save();
        res.json({ success: true, order });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};

export const getLikeController = async (req, res) => {
    const { _id } = req.user;
    const orders = await orderModels.find({
        collector: _id,
    });

    if (!orders) {
        res.status(404).send("No orders found");
        return;
    }
    const allProducts = orders.map((order) => order.products).flat();

    console.log(allProducts);
    // If you want to send products back in
    res.send(allProducts);
};



export const deleteLikeController = async (req, res, next) => {
    try {
        const { oid } = req.params;
        const { _id } = req.user;

        if (!req.user) {
            const error = new Error("Unauthorized");
            error.status = 401;
            return next(error);
        }

        const order = await orderModels.findOneAndUpdate(
            {
                collector: _id,
                products: { $in: [oid] },
            },
            {
                $pull: { products: oid },
            }
        );

        if (!order) {
            res.status(404).send({
                success: false,
                message: "Order not found or product does not exist",
            });
            return;
        }
        res.status(200).send({
            success: true,
            message: "Like Deleted",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while deleting product",
            error,
        });
    }
};


export const ProductRequestController = async (req, res) => {
    try {
        const { name, slug, team, kit, description, category, owner_by } =
            req.fields;
        const { photo } = req.files;
        // console.log(55);

        const products = new productRequestModel({
            ...req.fields,
            slug: slugify(name),
            request_by: req.user._id,
        });
        if (photo) {
            products.photo.data = fs.readFileSync(photo.path);
            products.photo.contentType = photo.type;
        }
        // console.log(products);
        console.log(req.user);
        await products.save();
        res.status(201).send({
            success: true,
            message: "Product Created",
            products,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in creating product",
        });
    }
};

export const requestListController = async (req, res) => {
    try {
        let productRequests = await productRequestModel.find({});

        // Convert each photo buffer to base64
        productRequests = productRequests.map((request) => {
            if (request.photo && request.photo.data) {
                const photo = Buffer.from(request.photo.data).toString("base64");
                return { ...request._doc, photo };
            }
            return request;
        });

        res.status(200).send({
            success: true,
            productRequests,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "error in per page ctrl",
            error,
        });
    }
};

export const approveRequestController = async (req, res) => {
    try {
        let productRequests = await productRequestModel.findOne({
            _id: req.params.pid,
        });

        const { name, slug, team, kit, description, category, owner_by } = productRequests;
        const { photo } = productRequests;

        console.log(name, slug, team, kit, description, category, photo);
        const products = new productModel({
            name,
            slug,
            team,
            kit,
            description,
            category,
            photo,
            owner_by
        });
        products.save();

        await productRequestModel.deleteOne({
            _id: req.params.pid,
        });
        res.status(200).send({
            success: true,
            hi: "hi",
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "error in per page ctrl",
            error,
        });
    }
};

export const rejectRequestController = async (req, res) => {
    try {
        await productRequestModel.deleteOne({
            _id: req.params.pid,
        });
        res.status(200).send({
            success: true,
            hi: "hi",
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "error in per page ctrl",
            error,
        });
    }
};
export const getSingleProductController2 = async (req, res) => {
    try {
        const product = await productRequestModel.findOne({
            _id: req.params.productId,
        });

        // Convert photo data to base64 before sending it to the client
        if (product.photo && product.photo.data) {
            product.photo.data = Buffer.from(product.photo.data).toString("base64");
        }

        console.log(product);
        res.status(200).send({
            success: true,
            message: "Single Product Fetched",
            product,
        });
    } catch (error) {
        console.error(error); // log the error
        res.status(500).send({
            success: false,
            message: "Error while getting single product",
            error,
        });
    }
};
