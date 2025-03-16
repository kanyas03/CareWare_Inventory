import { Schema } from "mongoose";
import { model } from "mongoose";

const inventory =new Schema({
     p_Id:{type:String,required:true,unique:true},
     p_Name:{type:String,required:true},
     p_category:{type:String,required:true},
     p_quantity:{type:Number,required:true},
     image: {type:String}
    
})
const addProduct = model('product',inventory)
export {addProduct}