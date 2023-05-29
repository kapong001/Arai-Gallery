import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoute.js';
import categoryRoutes from './routes/categoryRoute.js';
import productRoutes from './routes/productRoute.js';
import cors from 'cors'
//configure env
dotenv.config();

//db config
connectDB();

//rest object
const app = express();


//middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

//routes
app.use('/api/account', authRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/product', productRoutes);

//rest api
app.get('/', (req, res) =>{
    res.send({
        message:"Welcome to APP 123456",
    });
});

//PORT
const PORT = process.env.PORT || 8080;

//run listen
app.listen(PORT, () => {
    console.log(`server Running  ${process.env.DEV_MODE} on ${PORT}`.bgCyan.white);
});
