import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full border-t border-gray-200 py-6 h-[100px]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-center  gap-4 text-sm text-gray-600 pb-12">
        <p className="text-center sm:text-left">© 2026 Nike, Inc. All rights reserved</p>

        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          <a href="#" className="hover:text-black transition">
            Terms of Use
          </a>
          <a href="#" className="hover:text-black transition">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-black transition">
            Store Claim Policy
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
