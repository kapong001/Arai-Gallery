import slugify from "slugify";
import productModel from "../models/productModel.js";
import fs from 'fs';

//create product
export const CreateProductController = async (req, res) => {
    try{
        const {name, slug, team, kit, description, category, owner_by } = req.fields 
        const {photo} = req.files
        //alidation
        switch(true){
            case !name:
                return res.status(500).send({error:'Name is Required'})
            case !team:
                return res.status(500).send({error:'Team is Required'})
            case !kit:
                return res.status(500).send({error:'Kit is Required'})
            case !description:
                return res.status(500).send({error:'Description is Required'})
            case !category:
                return res.status(500).send({error:'Category is Required'})
            // case !owner_by:
            //     return res.status(500).send({error:'Owner_by is Required'})
            case photo && photo.size > 1000000 :
                return res
                .status(500)
                .send({error:'Photo is Required and should be less than 1mb'})    
        }

        const products = new productModel({...req.fields, slug: slugify(name)})
        if(photo){
            products.photo.data = fs.readFileSync(photo.path);
            products.photo.contentType = photo.type;
        }
        await products.save()
        res.status(201).send({
            success: true,
            message: 'Product Created',
            products,
        });
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:'Error in creating product',
        });
    }
};


//get all products
export const getProductController = async (req, res) => {
    try{
        const products = await productModel
        .find({})
        .populate('category')
        .select("-photo")
        .limit(12)
        .sort({createdAt:-1})
        res.status(200).send({
            success:true,
            countTotal: products.length,
            message: "Allproducts",
            products
        });
    }catch(error){
         console.log(error)
         res.status(500).send({
            success:false,
            message:'Error in getting products',
            error: error.message
         })
    }
}; 

//get single products
export const getSingleProductController = async (req, res) =>{
    try{
        const product = await productModel
        .findOne({slug:req.params.slug})
        .select("-photo")
        .populate('category')
        res.status(200).send({
            success:true,
            message:'Single Product Fetched',
            product
        })
    }catch(error){
        console.log(500).send({
            success:false,
            message:'Error while getting single product',
            error
        }) 
    }
};

//get photo
export const productPhotoController = async (req, res) => {
    try{
        const product = await productModel.findById(req.params.pid).select("photo")
        if(product.photo.data){
            res.set("Content-type", product.photo.contentType);
            return res.status(200).send(product.photo.data);
        }
    }catch(error){
        console.log(500).send({
            success:false,
            message:'Error while getting photo',
            error
        }) 
    }
};

//delete
export const deleteProductController = async (req, res) =>{
    try{
        await productModel.findByIdAndDelete(req.params.pid).select('-photo')    
        res.status(200).send({
            success:true,
            message:'Product Deleted',
        });
    }catch(error){
        console.log(500).send({
            success:false,
            message:'Error while deleting product',
            error,
        });
    }
};

//update
export const updateProductController = async (req, res) =>{
    try{
        const {name, slug, team, kit, description, category, owner_by } = req.fields 
        const {photo} = req.files
        //alidation
        switch(true){
            case !name:
                return res.status(500).send({error:'Name is Required'})
            case !team:
                return res.status(500).send({error:'Team is Required'})
            case !kit:
                return res.status(500).send({error:'Kit is Required'})
            case !description:
                return res.status(500).send({error:'Description is Required'})
            case !category:
                return res.status(500).send({error:'Category is Required'})
            // case !owner_by:
            //     return res.status(500).send({error:'Owner_by is Required'})
            case photo && photo.size > 1000000 :
                return res
                .status(500)
                .send({error:'Photo is Required and should be less than 1mb'})    
        }

        const products = await productModel.findByIdAndUpdate(req.params.pid, 
            {...req.fields, slug:slugify(name)}, {new: true}
            )
        if(photo){
            products.photo.data = fs.readFileSync(photo.path);
            products.photo.contentType = photo.type;
        }
        await products.save()
        res.status(201).send({
            success: true,
            message: 'Product Updated',
            products,
        });
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:'Error in Updating product',
        });
    }
};