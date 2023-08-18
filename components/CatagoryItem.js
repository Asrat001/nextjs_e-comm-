import Link from 'next/link';
import React from 'react';

export default function CatagoryItem({ product, addToCartHandler }) {
  return (
    <div className="card">
      
        <img
          src={product.image}
          alt={product.name}
          className="rounded shadow object-cover h-64 w-full"
        />
     
      <div className="flex flex-col  p-5">
      
          <h2 className="text-lg  font-semibold">{product.category}</h2>
       
       
      </div>
    </div>
  );
}
