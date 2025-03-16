import React, { useState } from 'react';
import Navbar from '../compoents/Navbar';

const AddProduct = () => {
    const [ProductId, setP_Id] = useState('');
      const [ProductName, setP_Name] = useState('');
      const [Category, setP_category] = useState('');
      const [Quantity, setP_quantity] = useState('');
      const [productimg, setProductimg] = useState(null);
    
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const formData = new FormData();
          formData.append("ProductId", ProductId);
          formData.append("ProductName", ProductName);
          formData.append("Category", Category);
          formData.append("Quantity", Quantity);
    
    
          if (productimg) {
            formData.append("Product_img", productimg);
          }
    
          const res = await fetch("/api/addproduct", {
            method: "POST",
            credentials: "include",
            body: formData,
          });
    
          if (!res.ok) {
            throw new Error("Error adding product");
          }
    
          alert("Product Added Successfully!");
          setP_Id('');
          setP_Name('');
          setP_category('');
          setP_quantity('');
          setProductimg(null);
          document.getElementById("productImageInput").value ="";
          
        } catch (error) {
          console.log(error);
          alert("Something went wrong: " + error.message);
        }
      };
  return (
    <div className="bg-zinc-300">
      <Navbar />
      
      <div className="bg-zinc-400 md:w-[860px] w-[280px] h-[500px] mt-10 rounded-3xl md:mx-auto drop-shadow-xl shadow-gray-950">
        <form className="md:px-24 px-5" onSubmit={handleSubmit}>
          <h1 className="text-2xl font-bold md:text-center pt-5">Add Stock</h1><br />

          <label className='font-semibold'>Product Name:</label><br />
          <input
            type="text"
            className="md:w-[650px] w-[250px] bg-white rounded-l hover:border-2"
            required
            value={ProductName}
            onChange={(e) => setP_Name(e.target.value)}/><br /><br />

          <label className='font-semibold'>Product ID:</label><br />
          <input
            type="text"
            className="md:w-[650px] w-[250px] bg-white rounded-l hover:border-2"
            required
            value={ProductId}
            onChange={(e) => setP_Id(e.target.value)}/><br /><br />

          <label className='font-semibold'>Product Category:</label><br />
          <select
            className="md:w-[650px] w-[250px] bg-white rounded-l hover:border-2"
            required
            value={Category}
            onChange={(e) => setP_category(e.target.value)}>
            <option value="">Select Category</option>
            <option value="Disposable">Disposable</option>
            <option value="Non-Disposable">Non-Disposable</option>
          </select><br /><br />

          <label className='font-semibold'>Quantity:</label><br />
          <input
            type="number"
            className="md:w-[650px] bg-white rounded-l"
            required
            value={Quantity}
            onChange={(e) => setP_quantity(e.target.value)}/><br /><br />

          <label className="font-semibold block">Product Image</label>
          <input
            id="productImageInput"
            className="border-2 border-black w-full p-2 mb-3"
            type="file"
            accept="image/*"
            onChange={(e) => {
              if(e.target.files && e.target.files[0]){
                setProductimg(e.target.files[0]);
              }
            }}/>

          <button className="bg-indigo-950 ml-8 text-white md:w-[600px] w-[250px] h-10 rounded-3xl font-bold">
            Add Stock
          </button>
        </form>
      </div>
    </div>
  )
}

export default AddProduct