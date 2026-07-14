import { Spotlight } from 'lucide-react';
import Feature from './components/homepage/featured/Feature';
import NewArival from './components/homepage/newarrival/NewArival';
import { getHomePage } from './utils/home/api';

export default async function HomeData({ category }: { category: string }) {
  const data = await getHomePage({
    category,
  });
  return (
    <>
      <Feature data={data.collection.data}/>
      <NewArival data={data.newarrival.data}/>
      <Spotlight data={data.newarrival.data}/>
    </>
  );
}
