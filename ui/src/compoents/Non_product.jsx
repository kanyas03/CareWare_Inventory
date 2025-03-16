import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import Navbar from '../compoents/Navbar';
const Non_product = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch("/api/getProduct");
                const data = await res.json();
                console.log("Fetched Products in Frontend:", data);
                const filteredProducts = data.data.filter(product => product.p_category === "Non-Disposable");
                setProducts(filteredProducts);
            } catch (error) {
                console.error("Error fetching Products:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    return (
        <div className="bg-zinc-300">
        <Navbar/>
            <h1 className="font-extrabold mt-10 md:ml-[500px] ml-2 text-xl">NON-DISPOSABLE PRODUCTS</h1>
            
            {loading ? (
                <h1>Loading...</h1>
            ) : (
                <div className="grid md:grid-cols-3 gap-4 md:mt-20 mt-5 mr-2">
                    {products.map((product) => (
                        <ProductCard key={product.p_Id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Non_product;
