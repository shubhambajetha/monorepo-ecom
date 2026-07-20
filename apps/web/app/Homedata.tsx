import Homebar from './components/home-carousel/Homebar';
import Feature from './components/homepage/featured/Feature';
import NewArival from './components/homepage/newarrival/NewArival';
import Sportlight from './components/homepage/spotlight/Sportlight';
import { getHomePage } from './utils/home/api';

export default async function HomeData({ category }: { category: string }) {
  const data = await getHomePage({
    category,
  });
  return (
    <>
      <Homebar />
      <Feature category={category} data={data.collection} />
      <NewArival data={data.newarrival} />
      <Sportlight data={data.spotlight} />
    </>
  );
}
