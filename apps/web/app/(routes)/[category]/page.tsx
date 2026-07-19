import HomeData from '@/app/HomeData';

export default async function Page({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;

  return <HomeData category={category} />;
}
