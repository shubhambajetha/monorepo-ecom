import ProductDetails from '@/app/components/product-deatails/ProductDetails';
import { getProductBySlug } from '@/app/services/productapi/productapi';

type Props = {
  params: Promise<{
    category: string;
    collection: string;
    product: string;
  }>;
};

export default async function Page({ params }: Props) {
  const { category, collection, product } = await params;
  const productinfo = await getProductBySlug({
    category,
    collection,
    slug: product,
  });

  return (
    <ProductDetails
      initialDetails={productinfo}
      slug={product}
      category={category}
      collection={collection}
    />
  );
}
