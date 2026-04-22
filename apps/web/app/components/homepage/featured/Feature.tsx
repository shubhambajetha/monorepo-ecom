import React from 'react';

const Feature = () => {
  return (
    <div className="">
      <h1 className="text-2xl sm:text-3xl md:text-2xl font-semibold text-gray-900 pb-12">
        Featured
      </h1>
      <div className="mt-px grid grid-cols-12 md:grid-cols-12 ">
        <div className="col-span-6 cursor-pointer aspect-ration">
          <img src="/homepage/homepage1.png" className="block h-auto w-full object-cover" />
        </div>

        <div className="col-span-6 cursor-pointer">
          <img src="/homepage/homepage2.png" className="block h-auto w-full object-cover" />
        </div>

        <div className="col-span-6 cursor-pointer">
          <img src="/homepage/homepage3.png" className="block h-auto w-full object-cover" />
        </div>

        <div className="col-span-6 cursor-pointer">
          <img src="/homepage/homepage4.png" className="block h-auto w-full object-cover" />
        </div>
      </div>
    </div>
  );
};

export default Feature;
