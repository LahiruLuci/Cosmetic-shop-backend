import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import productRouter from './routes/productRouter.js';
import userRouter from './routes/userRouter.js';
import jwt from "jsonwebtoken";
import dotenv from "dotenv";


dotenv.config()

const mongoURL = process.env.MONGO_DB_URL;

mongoose.connect(mongoURL, {})

const connection = mongoose.connection;

connection.once("open",()=>{
    console.log("database connected");
})

const app = express();

app.use(bodyParser.json())
app.use(
    (req,res,next)=>{
        const token = req.header("Authorization")?.replace("Bearer ","")
        if(token != null){
            jwt.verify(token, process.env.SECRET , (error,decoded)=>{
                if(!error){
                    req.user = decoded
                }
            })
        }
    next()
    }
)

app.use("/api/products", productRouter)
app.use("/api/users", userRouter)

app.listen(
    3000,
    ()=>{
        console.log('Server is running on port 3000');
    }
)