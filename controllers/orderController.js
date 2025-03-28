import Order from "../models/order.js";
import { isCustomer } from "./userControllers.js";
import Product from "../models/product.js";


export async function createOrder(req,res){
    //take the latest product id 

    if (!isCustomer){
        res.json({
            message : "Please login as customer to create orders"
        })
    }

    try{
        const latestOrder = await Order.find().sort({date : -1}).limit(1)
        //console.log(latestOrder);
        let orderId

        if(latestOrder.length == 0){
            orderId = "CBC0001"
        } else {
            const currentOrderId = latestOrder[0].orderId

            const numberString = currentOrderId.replace("CBC","")

            const number = parseInt(numberString)

            const newNumber = (number +1).toString().padStart(4, "0");

            orderId = "CBC" + newNumber
        }

        const newOrderData = req.body

        const newProductArray = []

        for (let i=0; i < newOrderData.orderItems.length; i++){
            const product = await Product.findOne({
                productId : newOrderData.orderItems[i].productId 
            }
            )

            //console.log(product)

            if(product == null){
                res.json({
                    message : "Product with id "+newOrderData.orderItems[i].productId+" not found"
                })
                return
            }

            newProductArray[i] ={
                name : product.productName,
                price : product.price,
                quantity : newOrderData.orderItems[i].quantity,
                image : product.images[0]
            }
        }

        //console.log(newProductArray)

        newOrderData.orderItems = newProductArray

        //console.log(newOrderData)

        newOrderData.orderId = orderId
        newOrderData.email = req.user.email

        const order = new Order(newOrderData)

        await order.save()

        res.json({
            message : "Order created"
        })


    }catch(error){
        res.status(500).json({
            message: error.message
        })
    }

}

export async function getOrder(req,res){
    try{
        const orders = await Order.find({email : req.user.email})

        res.json(orders)
    }catch(error){
        res.status(500).json({
            message : error.message
        })
    }
}