import React from 'react';
import TopBar from './TopBar';
import SecondColumn from './SecondColumn';
import CardColumn from './CardColumn';

const HomeAdmin = () => {
  return (
    <div className="min-h-screen bg-[#f5f7fb]">
      <TopBar />

      <div className="p-4 space-y-4">
        <CardColumn />
        <SecondColumn />
      </div>
    </div>
  );
};

export default HomeAdmin;
