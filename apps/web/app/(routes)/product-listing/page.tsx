import ProductCard from '@/app/components/product-listing/ProductCard';
import { getallproduct } from '@/app/services/productapi/productapi';

type ProductListingPageProps = {
  searchParams: Promise<{ search?: string }>;
};

export default async function ProductListingPage({ searchParams }: ProductListingPageProps) {
  const { search = '' } = await searchParams;
  const query = search.trim();
  let initialProducts;

  try {
    initialProducts = await getallproduct(query ? { search: query } : undefined);
  } catch (error) {
    console.error('Error loading initial products:', error);
  }

  return (
    <div>
      <ProductCard initialProducts={initialProducts} />
    </div>
  );
}
