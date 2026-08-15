import AddCategory from '@/app/components/admin/category/AddCategory';
import { createCategory } from '@/app/services/categoryapi/category';
import React from 'react';

const page = () => {
  return (
    <div>
      <AddCategory createcategory={createCategory}/>
    </div>
  );
};

export default page;
