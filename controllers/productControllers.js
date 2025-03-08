import Product from "../models/product.js";

export function getProducts(req,res){
    Product.find().then(
        (productList)=>{
            res.json({
                list : productList
            })
        }
    ).catch(
        (err)=>{
            res.json({
                message : "error"
            })
        }
    )
}

export function createProduct(req,res){
    console.log(req.user)

    if(req.user = null){
        res.json({
            message : "You are not logged in"
        })
        return
    }

    if(req.type != "admin"){
        res.json({
            message : "You are not admin"
        })
        return
    }

    const product = new Product(req.body)

    product.save().then(()=>{
        res.json({
            message : "Product created"
        })
    }).catch(()=>{
        res.json({
            message : "Product not created"
        })
    })
}

export function deleteProduct(req,res){
    Product.deleteOne({name : req.params.name}).then(()=>{
        res.json({
            message : "Product Deleted"
        })
    }).catch(()=>{
        res.json({
            message : "Product not deleted"
        })
    })
}

export function getProductByName(req,res){
    
    const name = req.params.name;

    Product.find({name : name}).then( 
       (productList)=>{
        if(productList.length == 0){
            res.json({
                message : "Product not founds."
            })
        }else{
            res.json({
                list : productList
             })
        }
        
       } 
    )
}