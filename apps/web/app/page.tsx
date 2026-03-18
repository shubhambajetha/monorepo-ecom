import Homebar from '@/app/components/home-carousel/Homebar';
import Feature from './components/homepage/featured/Feature';
import Swiperspo from './components/homepage/sport/Swiperspo';

export default function Home() {
  return (
    <main className="space-y-10 pt-[100px] lg:pt-[102px]">
      <Homebar />
      <Feature />
      <Swiperspo/>
    </main>
  );
}
