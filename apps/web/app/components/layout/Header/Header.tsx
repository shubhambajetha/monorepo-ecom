'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Dialog } from '@headlessui/react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bars3Icon,
  XMarkIcon,
  MagnifyingGlassIcon,
  HeartIcon,
  ShoppingBagIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';

const navItems = ['Men', 'Women'] as const;
type NavItem = (typeof navItems)[number];

const defaultRecentSearches = ["Nike Men's NAC Dri-FIT Woven Training Trousers"];

export default function Header() {
  const [hover, setHover] = useState<NavItem | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [recentSearches] = useState(defaultRecentSearches);

  const closeMenuTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearMenuCloseTimer = () => {
    if (closeMenuTimerRef.current) clearTimeout(closeMenuTimerRef.current);
  };

  useEffect(() => {
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSearchOpen(false);
        setHover(null);
      }
    };

    document.addEventListener('keydown', onEscape);

    return () => {
      document.removeEventListener('keydown', onEscape);
      clearMenuCloseTimer();
    };
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-white ">
      {/* TOP BAR */}
      {!searchOpen && (
        <div className="bg-[#f5f5f5]">
          <div className="mx-auto flex h-9 max-w-[1440px] items-center justify-end gap-3 px-8 text-sm font-medium">
            <a href="#" className="hover:underline">
              Help
            </a>
            <span className="text-gray-400">|</span>
            <a href="#" className="hover:underline">
              Join Us
            </a>
            <span className="text-gray-400">|</span>
            <Link href={'/auth/signin'}>Signin</Link>
          </div>
        </div>
      )}

      <nav className="border-b border-gray-200/80">
        <div className="mx-auto hidden h-[66px] w-full max-w-[1440px] items-center px-8 lg:grid lg:grid-cols-[auto_1fr_auto]">
          <Link href="/">
            <Image
              src="/nike-logo.svg"
              alt="Nike"
              width={80}
              height={30}
              className="h-10 w-22"
              priority
            />
          </Link>

          {searchOpen ? (
            <div className="col-span-2 relative flex items-center justify-center">
              <div className="flex h-[44px] w-full max-w-[900px] items-center rounded-full bg-gray-100 px-6">
                <MagnifyingGlassIcon className="mr-4 h-5 w-5 text-gray-500" />

                <input
                  autoFocus
                  placeholder="Search"
                  className="w-full bg-transparent outline-none text-[15px] placeholder-gray-500"
                />
              </div>

              {/* cancel button */}
              <button
                className="absolute right-0 text-sm font-medium text-gray-700 hover:text-black"
                onClick={() => setSearchOpen(false)}
              >
                Cancel
              </button>
            </div>
          ) : (
            <>
              {/* CENTER NAV */}
              <div className="flex justify-start px-6 bg-grey-200 gap-8 text-[15px] font-medium">
                {navItems.map((item) => (
                  <div
                    key={item}
                    onMouseEnter={() => setHover(item)}
                    onMouseLeave={() => setHover(null)}
                    className="relative"
                  >
                    <button className="relative pb-2">
                      {item}

                      <motion.div
                        layoutId="underline"
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-black"
                        initial={false}
                        animate={{ opacity: hover === item ? 1 : 0 }}
                      />
                    </button>
                  </div>
                ))}
              </div>

              {/* RIGHT ACTIONS */}
              <div className="flex items-center justify-end gap-5">
                <button
                  className="flex h-9 w-[210px] items-center rounded-full bg-[#f5f5f5] px-6"
                  onClick={() => {
                    setHover(null);
                    setSearchOpen(true);
                  }}
                >
                  <MagnifyingGlassIcon className="mr-2 h-4 w-4" />
                  <span className="text-sm text-gray-600">Search</span>
                </button>

                <HeartIcon className="h-6 w-6" />
                <ShoppingBagIcon className="h-6 w-6" />
              </div>
            </>
          )}
        </div>

        {/* MOBILE NAV */}
        <div className="mx-auto flex h-[64px] max-w-[1440px] items-center justify-between px-6 lg:hidden">
          <Image src="/nike-logo.svg" alt="Nike" width={76} height={28} className="h-8 w-auto" />

          <div className="flex items-center gap-4">
            <ShoppingBagIcon className="h-6 w-6" />

            <button onClick={() => setMobileOpen(true)}>
              <Bars3Icon className="h-7 w-7" />
            </button>
          </div>
        </div>
      </nav>

      {/* SEARCH DROPDOWN */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="fixed left-0 right-0 top-[66px] z-40 hidden h-[50vh] border-b bg-white shadow-2xl lg:block"
          >
            <div className="mx-auto w-full max-w-[980px] px-8 py-8">
              <div className="mb-4 flex w-full items-center justify-between">
                <p className="text-[16px] font-medium text-black">Recent Searches</p>

                <button className="text-[16px] font-medium text-gray-600 hover:text-black">
                  Clear All
                </button>
              </div>

              <div className="flex flex-wrap gap-3">
                {recentSearches.map((item) => (
                  <button
                    key={item}
                    className="rounded-full bg-[#f5f5f5] px-5 py-3 text-[14px] text-black hover:bg-gray-200"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MOBILE MENU */}
      <Dialog open={mobileOpen} onClose={setMobileOpen} className="lg:hidden">
        <div className="fixed inset-0 bg-black/40" />

        <Dialog.Panel className="fixed right-0 top-0 h-full w-[320px] bg-white p-6">
          <div className="flex justify-between mb-6">
            <Image src="/nike-logo.svg" alt="Nike" width={64} height={24} className="h-6 w-auto" />

            <button onClick={() => setMobileOpen(false)}>
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>

          <div className="space-y-6 text-lg font-medium">
            {navItems.map((item) => (
              <button
                key={item}
                className="flex w-full justify-between"
                onClick={() => setMobileOpen(false)}
              >
                {item}
                <ChevronRightIcon className="w-5 h-5" />
              </button>
            ))}
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
