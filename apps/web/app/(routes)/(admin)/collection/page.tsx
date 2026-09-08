import React, { Suspense } from 'react';
import AddCollection from '@/app/components/admin/collection/AddCollection';

const Page = () => {
  return (
    <Suspense
      fallback={
        <div className="max-w-4xl mx-auto px-4 py-12 text-center text-gray-500">
          Loading collection form...
        </div>
      }
    >
      <AddCollection />
    </Suspense>
  );
};

export default Page;