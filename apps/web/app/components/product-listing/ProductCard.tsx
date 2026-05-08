import React from 'react'
import SingleCart from '../cards/SingleCart';

const ProductCard = () => {
  return (
    <div className="grid sm:grid-cols-6 lg:grid-cols-3 px-4 py-4 mx-2">
        <SingleCart/>
        <SingleCart/>
        <SingleCart/>
        <SingleCart/>
        <SingleCart/>
        <SingleCart/>
        <SingleCart/>
        <SingleCart/>  
    </div>
  )
}

export default ProductCard