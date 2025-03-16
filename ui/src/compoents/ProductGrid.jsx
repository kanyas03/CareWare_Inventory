import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { Link } from 'react-router-dom';

const ProductGrid = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch("/api/getProduct");
                const data = await res.json();
                console.log("Fetched Products in Frontend:", data);
                setProducts(data.data);
            } catch (error) {
                console.error("Error fetching Products:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const handleDelete = async (productId) => {
        try {
            const res = await fetch(`/api/deleteProduct/${productId}`, {
                method: 'DELETE',
            });
            if (res.ok) {
                setProducts(products.filter(product => product.p_Id !== productId));
                console.log("Product deleted successfully");
            } else {
                console.error("Failed to delete product");
            }
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };
    
    return (
    <div>
    <h1 className="font-extrabold mt-10 text-xl text-center md:text-left md:ml-[500px] ml-2">MEDICAL PRODUCTS</h1>
    <br /><br />
    <div className="flex flex-wrap justify-center md:justify-start mx-5 md:mx-32 gap-4">
        <button className="bg-indigo-950 w-[180px] md:w-[250px] text-white font-bold rounded-2xl">
            <Link to={'/products'}>All</Link>
        </button>
        <button className="bg-indigo-950 w-[180px] md:w-[250px] text-white font-bold rounded-2xl">
            <Link to={"/dis_product"}>Disposable Product</Link>
        </button>
        <button className="bg-indigo-950 w-[180px] md:w-[250px] text-white font-bold rounded-2xl">
            <Link to={"/non_product"}>Non-disposable Product</Link>
        </button>
    </div>
    {loading ? (
        <h1 className="text-center mt-5">Loading...</h1>
    ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:mt-20 mt-5 mx-5">
            {products.map((product) => (
                <ProductCard key={product.p_Id} product={product} onDelete={handleDelete} />
            ))}
        </div>
    )}
</div>

    );
};

export default ProductGrid;
