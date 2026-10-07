'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeftIcon, ChevronRightIcon, PauseIcon, PlayIcon } from '@heroicons/react/24/solid';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { AnimatePresence, motion } from 'framer-motion';

const IMAGE_DELAY = 10000;
const VIDEO_DELAY = 20000;

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
      fallbackImage: string;
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
    fallbackImage: '/firstcaro.webp',
  },
];

export default function Homebar() {
  const swiperRef = useRef<SwiperType | null>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const [isPlaying, setIsPlaying] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);

  const goToNext = () => swiperRef.current?.slideNext();
  const goToPrevious = () => swiperRef.current?.slidePrev();

  const togglePlay = () => {
    const swiper = swiperRef.current;
    if (!swiper?.autoplay) return;

    if (swiper.autoplay.running) {
      swiper.autoplay.stop();
      setIsPlaying(false);
    } else {
      swiper.autoplay.start();
      setIsPlaying(true);
    }
  };

  const handleSlideChange = (swiper: SwiperType) => {
    setPrevIndex(activeIndex);
    const newIndex = swiper.realIndex;
    setActiveIndex(newIndex);

    // Pause all videos
    // videoRefs.current.forEach((video) => video?.pause());

    // Play active video if exists
    const activeVideo = videoRefs.current[newIndex];
    activeVideo?.play();
  };

  return (
    <section className="relative h-[calc(100vh-130px)] min-h-[700px] w-full overflow-hidden text-white bg-brand-surface">
      <Swiper
        modules={[Autoplay]}
        loop
        speed={700}
        autoplay={{
          delay: slides[activeIndex]?.type === 'video' ? VIDEO_DELAY : IMAGE_DELAY,
          disableOnInteraction: false,
        }}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={handleSlideChange}
        className="h-full w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.id} className="relative h-full w-full">
            {slide.type === 'image' ? (
              <>
                <Image
                  src={slide.imageSrc}
                  alt={slide.title}
                  fill
                  priority={index === 0}
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/15 to-transparent" />
              </>
            ) : (
              <>
                {/* Desktop Video */}
                <video
                  ref={(el) => {
                    videoRefs.current[index] = el;
                  }}
                  src={slide.videoSrc}
                  muted
                  loop
                  playsInline
                  preload="none"
                  className="hidden md:block h-full w-full object-cover"
                />

                {/* Mobile fallback image */}
                <Image
                  src={slide.fallbackImage}
                  alt={slide.title}
                  fill
                  className="object-cover md:hidden"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent" />
              </>
            )}
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Text Content */}
      <div className="absolute inset-x-0 bottom-20 z-10 flex justify-center px-4 sm:bottom-24 sm:px-6 pointer-events-none">
        <AnimatePresence mode="wait">
          <motion.div
            key={slides[activeIndex]?.id}
            initial={{
              opacity: 0,
              x: activeIndex > prevIndex ? 72 : -72,
            }}
            animate={{ opacity: 1, x: 0 }}
            exit={{
              opacity: 0,
              x: activeIndex > prevIndex ? -72 : 72,
            }}
            transition={{ duration: 0.6 }}
            className="flex max-w-[980px] flex-col items-center text-center pointer-events-auto"
          >
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
              {slides[activeIndex]?.type === 'image' ? 'New Arrival' : 'Featured Video'}
            </p>

            <h2 className="text-4xl font-black uppercase sm:text-6xl text-white tracking-tight drop-shadow-md">
              {slides[activeIndex]?.title}
            </h2>

            <p className="mt-3 max-w-[860px] text-sm text-white/90 sm:text-base drop-shadow-sm">
              {slides[activeIndex]?.subtitle}
            </p>

            <div className="mt-6 flex items-center gap-4">
              <Link
                href="/product-listing"
                className="px-7 py-3 rounded-full bg-white text-slate-900 hover:bg-slate-900 hover:text-white font-bold text-xs uppercase tracking-wider shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
              >
                Shop Now
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-8 z-20 flex items-center gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => swiperRef.current?.slideTo(idx)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              activeIndex === idx ? 'w-8 bg-white' : 'w-2 bg-white/40 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

      {/* Controls */}
      <div className="absolute bottom-6 right-6 z-20 flex gap-2">
        <button
          onClick={goToPrevious}
          aria-label="Previous slide"
          className="grid h-10 w-10 place-items-center rounded-full border border-white/30 bg-black/40 hover:bg-white/10 text-white transition-colors"
        >
          <ChevronLeftIcon className="h-5 w-5" />
        </button>

        <button
          onClick={togglePlay}
          aria-label={isPlaying ? 'Pause autoplay' : 'Start autoplay'}
          className="grid h-10 w-10 place-items-center rounded-full border border-white/30 bg-black/40 hover:bg-white/10 text-white transition-colors"
        >
          {isPlaying ? <PauseIcon className="h-5 w-5" /> : <PlayIcon className="h-5 w-5" />}
        </button>

        <button
          onClick={goToNext}
          aria-label="Next slide"
          className="grid h-10 w-10 place-items-center rounded-full border border-white/30 bg-black/40 hover:bg-white/10 text-white transition-colors"
        >
          <ChevronRightIcon className="h-5 w-5" />
        </button>
      </div>
    </section>
  );
}
