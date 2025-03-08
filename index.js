import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import studentRouter from './routes/studentRouter.js';
import productRouter from './routes/productRouter.js';
import userRouter from './routes/userRouter.js';
import jwt from "jsonwebtoken";

const mongoURL = 'mongodb+srv://admin:123@cluster0.u5cdn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

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
            jwt.verify(token, "cbc-secret-key-123" , (error,decoded)=>{
                if(!error){
                    req.user = decoded
                }
            })
        }
    next()
    }
)

app.use("/api/students", studentRouter)
app.use("/api/products", productRouter)
app.use("/api/users", userRouter)

app.listen(
    3000,
    ()=>{
        console.log('Server is running on port 3000');
    }
)