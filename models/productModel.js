import mongoose, { Mongoose } from "mongoose";

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    slug:{
        type: String,
        required: true,
    },
    team:{
        type: String,
        required: true,
    },
    kit:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    category:{
        type: mongoose.ObjectId,
        ref: 'Category',
        required: true
    },
    // quantity:{
    //     type: Number,
    //     require: false,
    // },
    photo:{
        data:Buffer,
        contentType:String,   
    },
    owner_by: {
        type: String,
        required: false,
        default: "ARAI"
    }
    
}, {timestamps:true});

export default mongoose.model('Products', productSchema);