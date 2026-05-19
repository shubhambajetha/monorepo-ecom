import React from 'react';
import ProductDetails from './ProductDetails';
import OtherBought from './OtherBought';

const AllDetils = () => {
  return (
    <div>
      <ProductDetails />
      <div className="mt-3 overflow-hidden">
        <OtherBought />
      </div>
    </div>
  );
};

export default AllDetils;
