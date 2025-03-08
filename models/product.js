import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    name : String,
    price : Number,
    description : String 
})

const Product = mongoose.model("Products",productSchema)

export default Product;