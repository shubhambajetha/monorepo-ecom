import ProductCard from '@/app/components/product-listing/ProductCard';
import { getallproduct } from '@/app/services/productapi/productapi';

export default async function ProductListingPage() {
  let initialProducts;
  try {
    initialProducts = await getallproduct();
  } catch (error) {
    console.error('Error loading initial products:', error);
  }

  return (
    <div>
      <ProductCard initialProducts={initialProducts} />
    </div>
  );
}
