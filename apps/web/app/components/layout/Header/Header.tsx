'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';
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
import { usePathname, useRouter } from 'next/navigation';
import { useSearchProducts } from '@/app/hooks/products/useSearchProducts';
import { Product } from '@/app/types/product/productype';
import { useAuth } from '@/app/provider/AuthProvider';
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { User } from 'lucide-react';
const navItems = ['Men', 'Women'] as const;
type NavItem = (typeof navItems)[number];

const defaultRecentSearches = ["Nike Men's NAC Dri-FIT Woven Training Trousers"];

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [hover, setHover] = useState<NavItem | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [recentSearches, setRecentSearches] = useState(defaultRecentSearches);
  const closeMenuTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { data, isLoading } = useSearchProducts(search);
  const searchResults = data?.data ?? [];
  const { user, isAuthenticated, loading, logout } = useAuth();

  const submitSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = search.trim();

    if (!query) return;

    setRecentSearches((current) =>
      [query, ...current.filter((item) => item !== query)].slice(0, 5)
    );
    setSearchOpen(false);
    router.push(`/product-listing?search=${encodeURIComponent(query)}`);
  };
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
    <header className="fixed inset-x-0 top-0 z-50 border-b border-gray-200/80 bg-white/95 shadow-sm backdrop-blur">
      {/* TOP BAR */}
      {!searchOpen && (
        <div className="bg-[#f5f5f5]">
          <div className="mx-auto flex h-9 max-w-[1440px] items-center justify-end gap-3 px-5 text-xs font-medium sm:px-8">
            <a href="#" className="hover:underline">
              Help
            </a>

            <span className="text-gray-400">|</span>

            {loading ? null : isAuthenticated ? (
              <div className="flex items-center gap-2">
                <span>Welcome, {user?.firstName}</span>
                <span className="text-gray-400">|</span>
                <Menu>
                  <MenuButton className="border-none">
                    <User className="h-5 w-5" />
                  </MenuButton>

                  <MenuItems
                    anchor="bottom end"
                    className="z-50 mt-2 w-40 rounded-md bg-white shadow-lg border border-gray-200 p-1 focus:outline-none"
                  >
                    <MenuItem>
                      {({ focus }) => (
                        <Link
                          href="/orders"
                          className={`block px-3 py-2 ${focus ? 'bg-gray-100' : ''}`}
                        >
                          Orders
                        </Link>
                      )}
                    </MenuItem>

                    <MenuItem>
                      {({ focus }) => (
                        <Link
                          href="/settings"
                          className={`block px-3 py-2 ${focus ? 'bg-gray-100' : ''}`}
                        >
                          My Profile
                        </Link>
                      )}
                    </MenuItem>

                    <MenuItem>
                      {({ focus }) => (
                        <button
                          onClick={logout}
                          className={`block w-full text-left px-3 py-2 text-red-500 ${
                            focus ? 'bg-gray-100' : ''
                          }`}
                        >
                          Logout
                        </button>
                      )}
                    </MenuItem>
                  </MenuItems>
                </Menu>
              </div>
            ) : (
              <>
                <Link href="/auth/signin">Sign In</Link>
                <span className="text-gray-400">|</span>
                <Link href="/auth/signup">Sign up</Link>
              </>
            )}
          </div>
        </div>
      )}

      <nav>
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
            <form
              onSubmit={submitSearch}
              className="col-span-2 relative flex items-center justify-center"
            >
              <div className="flex h-[46px] w-full max-w-[900px] items-center rounded-full bg-gray-100 px-5 transition focus-within:ring-2 focus-within:ring-black/15">
                <MagnifyingGlassIcon className="mr-4 h-5 w-5 text-gray-500" />

                <input
                  autoFocus
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search products, brands and styles"
                  aria-label="Search products"
                  className="w-full bg-transparent outline-none text-[15px] placeholder-gray-500"
                />
              </div>

              {/* cancel button */}
              <button
                type="button"
                className="absolute right-0 text-sm font-medium text-gray-700 hover:text-black"
                onClick={() => setSearchOpen(false)}
              >
                Cancel
              </button>
            </form>
          ) : (
            <>
              {/* CENTER NAV */}
              <div className="flex justify-center gap-8 px-6 text-[15px] font-medium">
                {navItems.map((item) => {
                  const isActive = pathname === `/${item.toLowerCase()}`;
                  return (
                    <div
                      key={item}
                      onMouseEnter={() => setHover(item)}
                      onMouseLeave={() => setHover(null)}
                      className="relative"
                    >
                      <Link href={`/${item.toLowerCase()}`} className="relative pb-2">
                        {item}

                        <motion.div
                          layoutId="underline"
                          className="absolute bottom-0 left-0 right-0 h-[2px] bg-black"
                          initial={false}
                          animate={{ opacity: hover === item || isActive ? 1 : 0 }}
                        />
                      </Link>
                    </div>
                  );
                })}
              </div>

              {/* RIGHT ACTIONS */}
              <div className="flex items-center justify-end gap-5">
                <button
                  type="button"
                  aria-label="Open product search"
                  className="flex h-10 w-[220px] items-center rounded-full bg-[#f5f5f5] px-5 transition hover:bg-gray-200"
                  onClick={() => {
                    setHover(null);
                    setSearchOpen(true);
                  }}
                >
                  <MagnifyingGlassIcon className="mr-2 h-4 w-4" />
                  <span className="text-sm text-gray-600">Search</span>
                </button>

                <Link
                  href="/wishlisht"
                  aria-label="Wishlisht"
                  className="rounded-full p-1 transition hover:bg-gray-100"
                >
                  <HeartIcon className="h-6 w-6" />
                </Link>
                <Link
                  href="/cart"
                  aria-label="Shopping bag"
                  className="rounded-full p-1 transition hover:bg-gray-100"
                >
                  <ShoppingBagIcon className="h-6 w-6" />
                </Link>
              </div>
            </>
          )}
        </div>

        {/* MOBILE NAV */}
        <div className="mx-auto flex h-[64px] max-w-[1440px] items-center justify-between px-6 lg:hidden">
          <Link href="/" aria-label="Nike home">
            <Image src="/nike-logo.svg" alt="Nike" width={76} height={28} className="h-8 w-auto" />
          </Link>

          <div className="flex items-center gap-4">
            <Link href="/product-listing" aria-label="Search products">
              <MagnifyingGlassIcon className="h-6 w-6" />
            </Link>
            <Link href="/productcart" aria-label="Shopping bag">
              <ShoppingBagIcon className="h-6 w-6" />
            </Link>

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
            className="fixed left-0 right-0 top-[66px] z-40 hidden max-h-[calc(100vh-66px)] overflow-y-auto border-b bg-white shadow-2xl lg:block"
          >
            <div className="mx-auto w-full max-w-[980px] px-8 py-8">
              <div className="mb-4 flex w-full items-center justify-between">
                <p className="text-[16px] font-medium text-black">
                  {search.trim() ? 'Search results' : 'Recent searches'}
                </p>

                <button
                  type="button"
                  onClick={() => setRecentSearches([])}
                  className="text-[14px] font-medium text-gray-600 hover:text-black"
                >
                  Clear All
                </button>
              </div>

              <div className="flex flex-wrap gap-3">
                <div className="mt-6">
                  {search.trim().length >= 2 ? (
                    <>
                      {isLoading ? (
                        <p className="text-gray-500">Searching...</p>
                      ) : searchResults.length > 0 ? (
                        <div className="space-y-2">
                          {searchResults.map((product: Product) => (
                            <Link
                              key={product.id}
                              href={`/product-listing?search=${encodeURIComponent(product.title)}`}
                              onClick={() => {
                                setSearch(product.title);
                                setSearchOpen(false);
                              }}
                              className="flex items-center gap-4 rounded-lg p-2 hover:bg-gray-100"
                            >
                              <Image
                                src={product.thumbnail}
                                alt={product.title}
                                width={60}
                                height={60}
                                className="rounded-md object-cover"
                              />

                              <div>
                                <h3 className="font-medium">{product.title}</h3>

                                <p className="text-sm text-gray-500">
                                  ₹{product.discountPrice ?? product.price}
                                </p>
                              </div>
                            </Link>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-500">No products found.</p>
                      )}
                    </>
                  ) : search.trim() ? (
                    <p className="text-sm text-gray-500">Enter at least 2 characters to search.</p>
                  ) : (
                    <>
                      <div className="mb-4 flex items-center justify-between">
                        <p className="text-[16px] font-medium text-black">Recent Searches</p>

                        <button
                          type="button"
                          onClick={() => setRecentSearches([])}
                          className="text-[14px] font-medium text-gray-600 hover:text-black"
                        >
                          Clear All
                        </button>
                      </div>

                      <div className="flex flex-wrap gap-3">
                        {recentSearches.map((item) => (
                          <button
                            key={item}
                            type="button"
                            onClick={() => setSearch(item)}
                            className="rounded-full bg-[#f5f5f5] px-5 py-3 text-[14px] hover:bg-gray-200"
                          >
                            {item}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>
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
            {navItems.map((item) => {
              const isActive = pathname === `/${item.toLowerCase()}`;
              return (
                <Link
                  key={item}
                  href={`/${item.toLowerCase()}`}
                  className={`flex w-full justify-between transition-colors ${
                    isActive ? 'text-black font-semibold' : 'text-gray-500 hover:text-black'
                  }`}
                  onClick={() => setMobileOpen(false)}
                >
                  {item}
                  <ChevronRightIcon className="w-5 h-5" />
                </Link>
              );
            })}
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
