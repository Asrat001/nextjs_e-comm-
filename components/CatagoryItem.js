import Link from 'next/link';
import React from 'react';

export default function CatagoryItem({ product, addToCartHandler }) {
  console.log(product)
  return (
    <div className="card">
      
      <div className="flex flex-col  p-5">
         
            <h2 key={product} className="text-lg text-gray-900  font-semibold">{product}</h2>
        
          
       
       
      </div>
    </div>
  );
}
