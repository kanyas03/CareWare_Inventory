import express,{json}  from 'express';
import dotenv from 'dotenv';
import { userauth } from './Routes/userauth.js';
import { adminauth } from './Routes/adminauth.js';
import mongoose from 'mongoose';
import cors from 'cors';

dotenv.config();
const app =express();
app.use(json()); 
app.use(cors(({
    origin: 'http://127.0.0.1:8005',        //origin:'*' // * means aynody can give request
    credentials: true
 })))      
app.use('/',userauth);
app.use('/',adminauth);



mongoose.connect('mongodb://mongodb:27017/INVENTORY').then(()=>{
    console.log("Mongodb connected Successfully to Inventory Project");})
    .catch((error)=>{
        console.error("Mongodb connection failed",error);
});
app.listen(process.env.PORT,function(){
    console.log(`server is listening at ${process.env.PORT}`);
    
});