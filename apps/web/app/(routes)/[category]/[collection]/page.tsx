import ProductCard from '@/app/components/product-listing/ProductCard';

type Prop = {
  params: Promise<{
    category: string;
    collection: string;
  }>;
};

export default async function Page({ params }: Prop) {
  const { category, collection } = await params;

  return <ProductCard category={category} collection={collection} />;
}