import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../compoents/Navbar";

const UpdateProduct = () => {
  const { ProductId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/getProduct/${ProductId}`);
        if (!res.ok) {
          throw new Error(`Product not found: ${res.status}`);
        }
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };
    
    if (ProductId) fetchProduct();
  }, [ProductId]);

  const handleImageChange = (event) => {
    setImageFile(event.target.files[0]);
  };

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!product?.p_Name?.trim()) {
      alert("Product Name is required!");
      return false;
    }
    if (!product?.p_category?.trim()) {
      alert("Category is required!");
      return false;
    }
    if (!product?.p_quantity || product.p_quantity <= 0) {
      alert("Quantity must be greater than zero!");
      return false;
    }
    return true;
  };

  const handleUpdateProduct = async () => {
    if (!validateForm()) return;

    const formData = new FormData();
    formData.append("p_Name", product.p_Name);
    formData.append("p_category", product.p_category);
    formData.append("p_quantity", product.p_quantity);
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      const res = await fetch(`/api/updateProduct/${ProductId}`, {
        method: "PUT",
        body: formData,
      });

      const contentType = res.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const data = await res.json();
        if (res.ok) {
          alert("Product updated successfully!");
          navigate("/products");
        } else {
          alert(data.msg || "Failed to update product");
        }
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  if (loading) {
    return <div>Loading product details...</div>;
  }

  if (!product) {
    return <div className="text-center text-red-500 mt-10">Product not found.</div>;
  }

  return (
    <div className="bg-zinc-300 min-h-screen flex flex-col">
      <Navbar />
      <div className="md:h-fit bg-zinc-400 border border-black rounded-lg m-4 p-2">
        <h1 className="text-2xl font-bold text-center">Update Product</h1>
        <form className="m-4 md:mt-[20px] md:px-[100px]">
          <div className="flex justify-between mb-[10px]">
            <label className="text-xl font-semibold">Product Name</label>
            <input
              type="text"
              name="p_Name"
              value={product.p_Name}
              onChange={handleChange}
              className="w-[60%] md:w-[50%] md:h-[40px] rounded-lg border-2 border-black"
              required
            />
          </div>

          <div className="flex justify-between mb-[10px]">
            <label className="text-xl font-semibold">Category</label>
            <select
              name="p_category"
              value={product.p_category}
              onChange={handleChange}
              className="w-[60%] md:w-[50%] md:h-[40px] rounded-lg border-2 black"
              required
            >
              <option value="">Select Category</option>
              <option value="Disposable">Disposable</option>
              <option value="Non-Disposable">Non-Disposable</option>
            </select>
          </div>

          <div className="flex justify-between mb-[10px]">
            <label className="text-xl font-semibold">Quantity</label>
            <input
              type="number"
              name="p_quantity"
              value={product.p_quantity}
              onChange={handleChange}
              className="w-[60%] md:w-[50%] md:h-[40px] rounded-lg border-2 black"
              required
            />
          </div>

          <div className="flex justify-between mb-4">
            <label className="text-xl font-semibold">Product Image</label>
            <input type="file" onChange={handleImageChange} />
            {product.image && (
              <img
                src={`data:image/jpg;base64,${product.image}`}
                alt="Product"
                className="w-[150px] h-[200px] rounded-md border border-gray-300"
              />
            )}
          </div>

          <div className="flex justify-between mt-5">
            <button
              type="button"
              className="bg-indigo-950 py-2 px-6 rounded text-white"
              onClick={() => navigate(-1)}
            >
              Back
            </button>
            <button
              type="button"
              className="bg-indigo-950 py-2 px-8 rounded   text-white"
              onClick={handleUpdateProduct}
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;
