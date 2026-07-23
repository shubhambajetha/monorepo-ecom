import ProductDetails from '@/app/components/product-deatails/ProductDetails';

type props = {
  params: Promise<{
    category: string;
    collection: string;
    product: string;
  }>;
};
export default async function Page({ params }: props) {
  const { category, collection, product } = await params;

  return <ProductDetails slug={product} category={category} collection={collection} />;
}
