import React from 'react';

const Feature = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12">
      <div className="col-span-6 cursor-pointer aspect-ration">
        <img src="/homepage/homepage1.png" className="w-full h-auto object-cover" />
      </div>

      <div className="col-span-6 cursor-pointer">
        <img src="/homepage/homepage2.png" className="w-full h-auto object-cover" />
      </div>

      <div className="col-span-6 cursor-pointer">
        <img src="/homepage/homepage3.png" className="w-full h-auto object-cover" />
      </div>

      <div className="col-span-6 cursor-pointer">
        <img src="/homepage/homepage4.png" className="w-full h-auto object-cover" />
      </div>
    </div>
  );
};

export default Feature;
