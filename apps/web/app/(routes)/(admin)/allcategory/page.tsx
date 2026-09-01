import Allcategory from '@/app/components/admin/category/Allcategory';
import { getAllCategories } from '@/app/services/categoryapi/category';

export const dynamic = 'force-dynamic';

export default async function Page() {
  let response;
  try {
    response = await getAllCategories();
  } catch (error) {
    console.error('Failed to fetch categories:', error);
  }

  return (
    <div>
      <Allcategory initialData={response} />
    </div>
  );
}