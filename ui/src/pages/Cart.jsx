import React, { useState, useEffect } from "react";
import Unavbar from "../compoents/Unavbar";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [orderHistory, setOrderHistory] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);

    const storedHistory = JSON.parse(localStorage.getItem("orderHistory")) || [];
    setOrderHistory(storedHistory);
  }, []);

  const updateQuantity = (id, quantity) => {
    const updatedCart = cart.map((item) =>
      item.p_Id === id ? { ...item, quantity: parseInt(quantity, 10) || 1 } : item
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeItem = (id) => {
    const updatedCart = cart.filter((item) => item.p_Id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const placeOrder = async () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    let failedOrders = [];
    let successfulOrders = [];

    for (const item of cart) {
      const payload = {
        ProductId: String(item.p_Id),
        Quantity: Number(item.quantity),
      };

      console.log("Payload being sent to server:", payload);

      try {
        const res = await fetch("/api/placeorder", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        const responseData = await res.json();
        console.log("Server response:", responseData);

        if (res.ok) {
          successfulOrders.push(item);
        } else {
          failedOrders.push(item);
          alert("Failed to place order for " + item.p_Name + ": " + (responseData.error || "Unknown error"));
        }
      } catch (error) {
        console.error("Error placing order:", error);
        failedOrders.push(item);
        alert("Something went wrong with " + item.p_Name + ". Please try again.");
      }
    }

    if (successfulOrders.length > 0) {
      alert("Order placed successfully for some items!");

      // Save order history
      const newOrderHistory = [...orderHistory, ...successfulOrders];
      setOrderHistory(newOrderHistory);
      localStorage.setItem("orderHistory", JSON.stringify(newOrderHistory));
    }

    // Keep failed items in the cart
    setCart(failedOrders);
    localStorage.setItem("cart", JSON.stringify(failedOrders));
  };

  const clearOrderHistory = () => {
    setOrderHistory([]);
    localStorage.removeItem("orderHistory");
    alert("Order history cleared!");
  };

  return (
    <div className="bg-zinc-300 w-full h-full">
      <Unavbar />

      <h1 className="font-extrabold mt-10 text-center text-2xl"> Your Cart</h1>

      {cart.length === 0 ? (
        <h1 className="text-center mt-10 text-xl font-bold">Your cart is empty.</h1>
      ) : (
        <div className="p-6">
          {cart.map((item) => (
            <div key={item.p_Id} className="bg-zinc-400 p-4 rounded-xl shadow-lg mb-4">
              <div className="flex justify-between">
                <div>
                  <h1 className="text-lg font-bold">{item.p_Name}</h1>
                  <p>Available: {item.p_quantity}</p>
                  <label>Qty:</label>
                  <input
                    type="number"
                    className="w-20 ml-2 p-1 border rounded"
                    min="1"
                    max={item.p_quantity}
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.p_Id, e.target.value)}
                  />
                </div>
                <button
                  className="bg-red-600 text-white font-bold px-4 py-2 rounded"
                  onClick={() => removeItem(item.p_Id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <button
            className="bg-indigo-950 text-white font-bold rounded-2xl w-full mt-4 py-2"
            onClick={placeOrder}
          >
            Place Order
          </button>
        </div>
      )}

      {/* Order History Section */}
      <h1 className="font-extrabold mt-10 text-center text-2xl"> Order History</h1>
      {orderHistory.length === 0 ? (
        <h1 className="text-center mt-4 text-lg">No orders placed yet.</h1>
      ) : (
        <div className="p-6">
          {orderHistory.map((item, index) => (
            <div key={index} className="bg-green-400 p-4 rounded-xl shadow-lg mb-4">
              <h1 className="text-lg font-bold">{item.p_Name}</h1>
              <p>Quantity: {item.quantity}</p>
            </div>
          ))}
          {/* Clear Order History Button */}
          <button
            className="bg-indigo-950 text-white font-bold rounded-2xl w-full mt-4 py-2"
            onClick={clearOrderHistory}
          >
            Clear Order History
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;

