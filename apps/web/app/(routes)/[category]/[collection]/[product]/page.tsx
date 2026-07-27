import ProductDetails from '@/app/components/product-deatails/ProductDetails';
import { getProductBySlug } from '@/app/services/productapi/productapi';


type Props = {
  params: Promise<{
    category: string;
    collection: string;
    slug: string;
  }>;
};

export default async function Page({ params }: Props) {
  const { category, collection, slug } = await params;

  const productinfo = await getProductBySlug({
    category,
    collection,
    slug,
  });

  return (
    <ProductDetails
      intialdeatils={productinfo}
      slug={slug}
      category={category}
      collection={collection}
    />
  );
}