import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const StockAlert = () => {
  const [lowStock, setLowStock] = useState([]);
  const [outOfStock, setOutOfStock] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/getProduct");
        const data = await res.json();
        if (data.data) {
          const lowStockProducts = data.data.filter(
            (product) => product.p_quantity > 0 && product.p_quantity <= 5
          );
          const outOfStockProducts = data.data.filter(
            (product) => product.p_quantity === 0
          );
          setLowStock(lowStockProducts);
          setOutOfStock(outOfStockProducts);
        }
      } catch (error) {
        console.error("Error fetching Products:", error);
      }
    };
    fetchProducts();
  }, []);

  return (
   

    <div className="bg-zinc-400 shadow-lg p-6 rounded-xl mx-4 mt-6">
  <h1 className="text-xl font-bold text-center text-red-600">Stock Alerts</h1>

  {/* Low Stock Section */}
  {lowStock.length > 0 && (
    <div className="mt-6">
      <h2 className="text-lg font-semibold text-yellow-600">Low Stock Products (≤5)</h2>
      <div className="overflow-x-auto">
        <table className="w-full min-w-max border-collapse border border-gray-300 mt-2">
          <thead>
            <tr className="bg-gray-800 text-white text-sm md:text-base">
              <th className="border p-2">Product Name</th>
              <th className="border p-2">Quantity</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {lowStock.map((product) => (
              <tr key={product.p_Id} className="text-center text-sm md:text-base">
                <td className="border p-2 border-gray-600">{product.p_Name}</td>
                <td className="border p-2 border-gray-600">{product.p_quantity}</td>
                <td className="border p-2 border-gray-600">
                  <Link to={`/updateproduct/${product.p_Id}`}>
                    <button className="bg-indigo-950 text-white px-2 md:px-4 py-1 rounded">Update</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )}

  {/* Out of Stock Section */}
  {outOfStock.length > 0 && (
    <div className="mt-6">
      <h2 className="text-lg font-semibold text-red-600">Out of Stock Products</h2>
      <div className="overflow-x-auto">
        <table className="w-full min-w-max border-collapse border border-gray-300 mt-2">
          <thead>
            <tr className="bg-gray-800 text-white text-sm md:text-base">
              <th className="border p-2">Product Name</th>
              <th className="border p-2">Quantity</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {outOfStock.map((product) => (
              <tr key={product.p_Id} className="text-center text-sm md:text-base">
                <td className="border p-2">{product.p_Name}</td>
                <td className="border p-2">{product.p_quantity}</td>
                <td className="border p-2">
                  <Link to={`/updateproduct/${product.p_Id}`}>
                    <button className="bg-indigo-950 text-white px-2 md:px-4 py-1 rounded">Update</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )}

  {lowStock.length === 0 && outOfStock.length === 0 && (
    <p className="text-center text-gray-500 mt-4">All products are sufficiently stocked.</p>
  )}
</div>

  );
};

export default StockAlert;
