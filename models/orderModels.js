import mongoose from 'mongoose'
const orderSchema = new mongoose.Schema({
    products:[
        {
            type: mongoose.ObjectId,
            ref: "Products",
        },
    ],
    collector:{
        type: mongoose.ObjectId,
        ref: "users",
    },
},{timestamps: true });

export default mongoose.model("Order", orderSchema)