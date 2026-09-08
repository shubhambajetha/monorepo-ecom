import React, { Suspense } from 'react';
import AddSubcategory from '@/app/components/admin/subcategory/AddSubcategory';

const Page = () => {
  return (
    <Suspense
      fallback={
        <div className="max-w-[1450px] mx-auto px-4 py-8 text-center text-gray-500">
          Loading subcategory form...
        </div>
      }
    >
      <AddSubcategory />
    </Suspense>
  );
};

export default Page;
