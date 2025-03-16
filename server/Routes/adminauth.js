import { Router } from "express";
import  authenticate  from "../middleware/auth.js";
import admincheck from "../middleware/admincheck.js";
import { addProduct } from "../model/addproduct.js";
import { placeorder } from "../model/order.js";
import upload from "../middleware/upload.js";
import { user } from "../model/User.js";

const adminauth=Router();

const convertToBase64 = (buffer) => {
    return buffer.toString("base64");
};

adminauth.get('/users', authenticate, admincheck, async (req, res) => {
    try {
        // Fetch all user details except passwords
        const users = await user.find({}, { password: 0 });

        if (!users.length) {
            return res.status(404).json({ message: "No users found" });
        }

        res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});






adminauth.post('/addproduct',authenticate,admincheck,upload.single("Product_img"),async(req,res)=>{   //authentication is amiddleware
    try{    console.log("hii")
            const {ProductName,ProductId,Category,Quantity}= req.body;
            
            const existingProduct = await addProduct.findOne({p_Id:ProductId})
            if(existingProduct){
                res.status(400).send("Product already exist");
            }
            else{ 
                let imageBase64 =null;
                if(req.file){
                    imageBase64 =convertToBase64(req.file.buffer)
                }
                
                const newProduct = new addProduct({
                    p_Id:ProductId,
                    p_Name:ProductName,
                    p_category:Category,
                    p_quantity:Quantity,
                    image: imageBase64
                   
                })
                await newProduct.save();
                res.status(201).send("Product added")
                console.log(newProduct);
            }
        }
        catch (error) {
            console.error("Error in /addproduct:", error.message);
            res.status(500).json({ error: error.message });
        }
        
        
});





adminauth.get('/getProduct',async(req,res)=>{
    try{
        const Pname = req.query.P_Name;
        const result=await addProduct.find()
         if(result){
            //console.log(result)
            res.status(200).json({data:result})
        }
        else{
        res.status(404).json({message:"Product not found"})
        }
    }
    catch{
        res.status(500).send("Internal Server Error")
    }
})




adminauth.get("/getProduct/:ProductId", async (req, res) => {
    try {
        const { ProductId } = req.params;
        console.log("Fetching product with ID:", ProductId);
        const product = await addProduct.findOne({ p_Id: ProductId });

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.json(product);
    } catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).json({ message: "Server error", error });
    }
});



adminauth.put("/updateProduct/:ProductId",authenticate,admincheck,upload.single("Product_img"), async (req, res) => {
    try {
        console.log("Received Data:", req.body);
        console.log("ProductId from params:", req.params.ProductId);

        const { ProductId } = req.params;
        const { p_Name, p_category, p_quantity } = req.body;

        if (!p_Name || !p_category || !p_quantity) {
            return res.status(400).json({ msg: "All fields are required" });
        }

        const updatedProduct = await addProduct.findOneAndUpdate(
            { p_Id: ProductId },
            { p_Name, p_category, p_quantity },
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ msg: "Product not found" });
        }

        res.json({ msg: "Product updated successfully", updatedProduct });
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ msg: "Server error", error });
    }
});









adminauth.delete('/deleteProduct/:ProductId', authenticate, admincheck, async (req, res) => {
    try {
        const { ProductId } = req.params; 
        const result = await addProduct.findOne({ p_Id: ProductId });

        if (result) {
            await addProduct.findOneAndDelete({ p_Id: ProductId }); 
            res.status(200).send("Product Successfully deleted");
        } else {
            res.status(404).send("Product not found");
        }
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).send("Server Error");
    }
});





adminauth.get('/orderdetails', authenticate, async (req, res) => {
    try {
        // Fetch orders with populated user details
        const orders = await placeorder.find()
            .populate({
                path: 'userId',
                select: '_id userName dept Ph firstName lastName'
            });

        // Debugging: Log the fetched data
        console.log("Fetched Orders:", JSON.stringify(orders, null, 2));

        if (!orders || orders.length === 0) {
            return res.status(404).json({ message: "No orders found" });
        }

        // Format response
        const formattedOrders = orders.map(order => ({
            orderId: order._id,
            productName: order.p_Name,
            quantity: order.p_quantity,
            orderDate: order.orderDate,
            userDetails: order.userId ? {
                userId: order.userId._id,
                userName: order.userId.userName,
                department: order.userId.dept,
                phone: order.userId.Ph
            } : null
        }));

        res.status(200).json(formattedOrders);
    } catch (error) {
        console.error("Error occurred:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});








  
export {adminauth}