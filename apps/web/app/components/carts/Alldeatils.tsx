import React from 'react';
import Carts from './Carts';
import Summary from './Summary';

const Alldeatils = () => {
  return (
    <div className="max-w-[1450px] mx-auto px-4 py-6">
      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="rounded-3xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
          <Carts />
        </div>

        <div className="rounded-3xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
          <Summary />
        </div>
      </div>
    </div>
  );
};

export default Alldeatils;
