import Product from "../models/product.js";
import { isAdmin } from "./userControllers.js";

export function createProduct(req,res){

    if(!isAdmin(req)){
        res.json({
            message: "Please login as admin to add product"
        })

        return
    }

    const newProductData = req.body

    const product = new Product (newProductData)

    product.save().then(()=>{
        res.json({
            message: "Product Created"
        })
    }).catch((error)=>{
        res.json({
            message: error
        })
    })
}

export function getProducts(req,res){
    Product.find({}).then((products)=>{
        res.json(products)
    })
}

