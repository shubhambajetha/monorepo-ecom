import React, { Suspense } from 'react';
import AddProduct from '@/app/components/admin/products/AddProduct';

const Page = () => {
  return (
    <Suspense
      fallback={
        <div className="max-w-5xl mx-auto px-4 py-12 text-center text-gray-500">
          Loading product form...
        </div>
      }
    >
      <AddProduct />
    </Suspense>
  );
};

export default Page;