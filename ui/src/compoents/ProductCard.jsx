import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product, onDelete }) => {
  if (!product) {
      return <h1>Product Not Found</h1>;
  }

  return (
      <div className="bg-zinc-400 md:w-[400px] w-[230px] h-[300px] md:ml-10 ml-2 rounded-2xl drop-shadow-2xl shadow-gray-950">
          <div className="flex justify-between">
              <div className="pt-10 pl-5">
                  <h1 className="text-xl font-bold">{product.p_Name}</h1>
                  <h1>{product.p_Id}</h1>
                  <label>Qty :</label><p>{product.p_quantity}</p>
                  <br />
                  <label>Category : </label><p>{product.p_category}</p>
              </div>
              <div className="mr-10 mt-10">
                  <img src={`data:image/jpg;base64,${product.image}`} className="md:size-28 size-10" alt="product" />
              </div>
          </div>
          
          <Link to={`/updateproduct/${product.p_Id}`}>

            <button className="bg-indigo-950 md:w-[250px] w-[180px] text-white font-bold rounded-2xl ml-12">
                Update
            </button>
        </Link>

          <br/><br/>
          <button 
              className="bg-indigo-950 md:w-[250px] w-[180px] text-white font-bold rounded-2xl ml-12"
              onClick={() => onDelete(product.p_Id)}
          >
              Delete
          </button>
          
      </div>
  );
};
export default ProductCard;