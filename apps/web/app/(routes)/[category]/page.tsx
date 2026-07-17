import Homedata from '@/app/HomeData';

export default async function page({ params }: 
  { params: { category: string } 
}
) {
  return <Homedata category={params.category} />;
}
