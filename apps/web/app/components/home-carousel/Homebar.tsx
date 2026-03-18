'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { ChevronLeftIcon, ChevronRightIcon, PauseIcon, PlayIcon } from '@heroicons/react/24/solid';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { AnimatePresence, motion } from 'framer-motion';
import 'swiper/css';

const AUTOPLAY_DURATION_MS = 10_000;

type Slide =
  | {
      id: string;
      type: 'image';
      title: string;
      subtitle: string;
      imageSrc: string;
    }
  | {
      id: string;
      type: 'video';
      title: string;
      subtitle: string;
      videoSrc: string;
    };

const slides: Slide[] = [
  {
    id: 'hero-image',
    type: 'image',
    title: 'Nike Air Max',
    subtitle: 'Fresh energy, all-day comfort.',
    imageSrc: '/firstcaro.webp',
  },
  {
    id: 'hero-video',
    type: 'video',
    title: 'Nike Motion Story',
    subtitle: 'See the latest Air Max animation.',
    videoSrc: '/Nike_Air_Max_270_-_Animation_1080p (online-video-cutter.com).mp4',
  },
];

export default function Homebar() {
  const swiperRef = useRef<SwiperType | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const goToNext = () => {
    swiperRef.current?.slideNext();
  };

  const goToPrevious = () => {
    swiperRef.current?.slidePrev();
  };

  const togglePlay = () => {
    const swiper = swiperRef.current;

    if (!swiper?.autoplay) return;

    if (swiper.autoplay.running) {
      swiper.autoplay.stop();
      setIsPlaying(false);
      return;
    }

    swiper.autoplay.start();
    setIsPlaying(true);
  };

  return (
    <section className="relative h-[calc(100vh-130px)] min-h-[700px] w-full overflow-hidden bg-black text-white">
      <Swiper
        modules={[Autoplay]}
        loop
        speed={700}
        autoplay={{ delay: AUTOPLAY_DURATION_MS, disableOnInteraction: false }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={(swiper) => {
          setActiveIndex(swiper.realIndex);
        }}
        className="h-full w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.id} className="relative h-full w-full">
            {slide.type === 'image' ? (
              <>
                <Image
                  src={slide.imageSrc}
                  alt="Nike featured product"
                  fill
                  priority={index === 0}
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/15 to-transparent" />
              </>
            ) : (
              <>
                <video
                  src={slide.videoSrc}
                  muted
                  loop
                  autoPlay
                  playsInline
                  preload="metadata"
                  className="block h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent" />
              </>
            )}
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="pointer-events-none absolute inset-x-0 bottom-20 z-10 flex justify-center px-4 sm:bottom-24 sm:px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={slides[activeIndex]?.id ?? 'hero-image'}
            initial={{ opacity: 0, x: activeIndex === 0 ? -72 : 72 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: activeIndex === 0 ? 72 : -72 }}
            transition={{ duration: 0.65, ease: 'easeOut' }}
            className="flex w-fit max-w-[980px] flex-col items-center text-center"
          >
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
              {slides[activeIndex]?.type === 'image' ? 'New Arrival' : 'Featured Video'}
            </p>
            <h2 className="text-4xl font-black uppercase tracking-tight sm:text-6xl">
              {slides[activeIndex]?.title}
            </h2>
            <p className="mt-3 max-w-[860px] text-center text-sm text-white/90 sm:text-base">
              {slides[activeIndex]?.subtitle}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute bottom-6 right-6 z-20 flex items-center gap-2">
        <button
          type="button"
          onClick={goToPrevious}
          aria-label="Previous slide"
          className="grid h-10 w-10 place-items-center rounded-full border border-white/30 bg-black/40 transition hover:bg-white/10"
        >
          <ChevronLeftIcon className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={togglePlay}
          aria-label={isPlaying ? 'Pause autoplay' : 'Play autoplay'}
          className="grid h-10 w-10 place-items-center rounded-full border border-white/30 bg-black/40 transition hover:bg-white/10"
        >
          {isPlaying ? <PauseIcon className="h-5 w-5" /> : <PlayIcon className="h-5 w-5" />}
        </button>
        <button
          type="button"
          onClick={goToNext}
          aria-label="Next slide"
          className="grid h-10 w-10 place-items-center rounded-full border border-white/30 bg-black/40 transition hover:bg-white/10"
        >
          <ChevronRightIcon className="h-5 w-5" />
        </button>
      </div>

    </section>
  );
}
