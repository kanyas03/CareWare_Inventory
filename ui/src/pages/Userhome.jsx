
import React, { useState, useEffect } from "react";
import Unavbar from "../compoents/Unavbar";
import image from '../assets/images/image.svg';

const UserHome = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All"); 
  const [searchTerm, setSearchTerm] = useState(""); // State for search input

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/getProduct");
        const data = await res.json();
        setProducts(data.data || []);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Listen for search term from Unavbar
  useEffect(() => {
    const handleSearchEvent = (event) => {
      setSearchTerm(event.detail);
    };
    window.addEventListener('searchEvent', handleSearchEvent);
    return () => {
      window.removeEventListener('searchEvent', handleSearchEvent);
    };
  }, []);

  // Add product to cart
  const addToCart = (product) => {
    const existingItem = cart.find((item) => item.p_Id === product.p_Id);
    if (existingItem) {
      alert("Product already in cart!");
      return;
    }

    const updatedCart = [...cart, { ...product, quantity: 1 }];
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    alert("Product added to cart!");
  };

  // Filter products based on category and search input
  const filteredProducts = products
    .filter(product => 
      selectedCategory === "All" || product.p_category === selectedCategory
    )
    .filter(product => 
      product.p_Name.toLowerCase().includes(searchTerm.toLowerCase()) // Search by name
    )
    .sort((a, b) => a.p_Name.localeCompare(b.p_Name)); // Sort alphabetically

  return (
   
    <div className="bg-zinc-300">
  <Unavbar />

  <div className="bg-zinc-400 flex flex-col md:flex-row md:w-[998px] w-full mx-auto rounded-2xl 
       drop-shadow-2xl shadow-gray-950 md:mt-10 mt-5 p-4">
    <img src={image} className="md:w-[300px] w-[190px] mx-auto md:mx-0" />
    <h1 className="font-bold md:text-2xl text-xs text-center md:text-left mt-4 md:mt-0">
      Never worry about your inventory
      <br /> Inventory management is about balance:
      <br /> Too much ties up capital, too little stops progress.
    </h1>
  </div> 

  <h1 className="font-extrabold mt-10 text-center text-2xl">MEDICAL PRODUCTS</h1>

  {/* Category Filter Buttons */}
  <div className="flex flex-wrap justify-center mt-6 gap-4">
    <button 
      className={`bg-indigo-950 md:w-[250px] w-[180px] text-white font-bold rounded-2xl ${selectedCategory === "All" ? "bg-indigo-700" : "bg-gray-300"}`}
      onClick={() => setSelectedCategory("All")}
    >
      All
    </button>
    <button 
      className={`bg-indigo-950 md:w-[250px] w-[180px] text-white font-bold rounded-2xl ${selectedCategory === "Disposable" ? "bg-indigo-700" : "bg-gray-300"}`}
      onClick={() => setSelectedCategory("Disposable")}
    >
      Disposable
    </button>
    <button 
      className={`bg-indigo-950 md:w-[250px] w-[180px] text-white font-bold rounded-2xl ${selectedCategory === "Non-Disposable" ? "bg-indigo-700" : "bg-gray-300"}`}
      onClick={() => setSelectedCategory("Non-Disposable")}
    >
      Non-disposable
    </button>
  </div>

  {/* Product Listing */}
  {loading ? (
    <h1 className="text-center mt-10 text-xl font-bold">Loading...</h1>
  ) : (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 p-6">       
      {filteredProducts.length > 0 ? (
        filteredProducts.map((product) => (
          <div key={product.p_Id} className="bg-zinc-400 p-4 md:p-6 rounded-2xl shadow-lg">
            <div className="flex flex-col md:flex-row md:justify-between items-center">
              <div className="text-center md:text-left">
                <h1 className="text-lg md:text-xl font-bold">{product.p_Name}</h1>
                <h1 className="text-sm">ID: {product.p_Id}</h1>
                <p className="text-sm">Available: {product.p_quantity}</p>
              </div>
              <img 
                src={`data:image/jpg;base64,${product.image}`} 
                alt={product.p_Name} 
                className="w-20 h-20 md:w-24 md:h-24 rounded mt-4 md:mt-0"
              />
            </div>
            <button
              className="bg-indigo-950 text-white font-bold rounded-2xl w-full mt-4 py-2"
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        ))
      ) : (
        <h1 className="text-center text-xl font-bold">No products available in this category.</h1>
      )}
    </div>
  )}
</div>

  );
};

export default UserHome;
