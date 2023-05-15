import express from "express"
import colors from "colors"
import dotenv from "dotenv"
import morgan from 'morgan'
import connectDB from './config/db.js'
import authRoutes from './routes/authRoute.js'
//configure env
dotenv.config()

//db config
connectDB()

//rest object
const app = express();

//middleware
app.use(express.json())
app.use(morgan('dev'))

//routes
app.use('/api/account', authRoutes)

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
