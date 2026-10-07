import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Truck, RotateCcw, Headphones } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full bg-slate-950 text-slate-400 border-t border-slate-800">
      {/* Service Highlights Bar */}
      <div className="border-b border-slate-800/80">
        <div className="max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-orange-500 shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-bold text-white uppercase tracking-wide">Free Shipping</p>
              <p className="text-[11px] text-slate-400">On all orders over ₹1,999</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-orange-500 shrink-0">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-bold text-white uppercase tracking-wide">30-Day Returns</p>
              <p className="text-[11px] text-slate-400">Hassle-free return policy</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-orange-500 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-bold text-white uppercase tracking-wide">100% Authentic</p>
              <p className="text-[11px] text-slate-400">Original quality guaranteed</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-orange-500 shrink-0">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-bold text-white uppercase tracking-wide">24/7 Support</p>
              <p className="text-[11px] text-slate-400">Dedicated customer care</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h4 className="text-xs font-extrabold uppercase tracking-widest text-white mb-4">Featured</h4>
          <ul className="space-y-2.5 text-xs font-medium">
            <li><Link href="/men" className="hover:text-white transition-colors">Men's Footwear</Link></li>
            <li><Link href="/women" className="hover:text-white transition-colors">Women's Collection</Link></li>
            <li><Link href="/product-listing" className="hover:text-white transition-colors">Trending Drops</Link></li>
            <li><Link href="/product-listing" className="hover:text-white transition-colors">All Products</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-extrabold uppercase tracking-widest text-white mb-4">Get Help</h4>
          <ul className="space-y-2.5 text-xs font-medium">
            <li><Link href="/orders" className="hover:text-white transition-colors">Order Status</Link></li>
            <li><Link href="/cart" className="hover:text-white transition-colors">Shopping Cart</Link></li>
            <li><Link href="/wishlisht" className="hover:text-white transition-colors">Wishlist</Link></li>
            <li><a href="#" className="hover:text-white transition-colors">Delivery Options</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-extrabold uppercase tracking-widest text-white mb-4">About</h4>
          <ul className="space-y-2.5 text-xs font-medium">
            <li><a href="#" className="hover:text-white transition-colors">Our Innovation</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Sustainability</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Investors</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-extrabold uppercase tracking-widest text-white mb-4">Connect</h4>
          <p className="text-xs leading-relaxed mb-4">
            Sign up for the latest releases, exclusive offers, and member perks.
          </p>
          <div className="flex items-center gap-2">
            <input
              type="email"
              placeholder="Your email"
              className="px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 w-full"
            />
            <button className="px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-colors shrink-0">
              Join
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Legal */}
      <div className="border-t border-slate-900 bg-slate-950 py-6">
        <div className="max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p className="text-slate-500">© 2026 Nike, Inc. All Rights Reserved</p>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-slate-500">
            <a href="#" className="hover:text-slate-300 transition-colors">Guides</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Terms of Sale</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Terms of Use</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

