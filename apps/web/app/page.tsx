import Homebar from '@/app/components/home-carousel/Homebar';
import Feature from './components/homepage/featured/Feature';
import Swiperspo from './components/homepage/sport/Swiperspo';
import Sportlight from './components/homepage/spotlight/sportlight';
import NewArival from './components/homepage/newarrival/NewArival';

export default function Home() {
  return (
    <main className="">
      <Homebar />
      <Swiperspo />
      <Feature />
      <NewArival/>
      <Sportlight />
    </main>
  );
}
