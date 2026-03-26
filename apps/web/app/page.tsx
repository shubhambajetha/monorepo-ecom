import Homebar from '@/app/components/home-carousel/Homebar';
import Feature from './components/homepage/featured/Feature';
import Swiperspo from './components/homepage/sport/Swiperspo';
import Sportlight from './components/homepage/spotlight/sportlight';

export default function Home() {
  return (
    <main className="flex flex-col gap-8 bg-[#E3EEF5] pb-10 md:gap-12 md:pb-14 lg:gap-16 lg:pb-16">
      <Homebar />
      <Feature />
      <Swiperspo />
      <Sportlight />
    </main>
  );
}
