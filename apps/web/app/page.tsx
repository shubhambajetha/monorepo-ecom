import Homebar from '@/app/components/home-carousel/Homebar';
import Feature from './components/homepage/featured/Feature';
import Swiperspo from './components/homepage/sport/Swiperspo';
import Sportlight from './components/homepage/spotlight/sportlight';

export default function Home() {
  return (
    <main className="">
      <Homebar />
      <Swiperspo />
      <Feature />
      <Sportlight />
    </main>
  );
}
